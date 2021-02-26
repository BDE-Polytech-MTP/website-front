<template>
    <section>
        <form action="">
            <InputField
                id="firstname"
                type="text"
                label="Prénom"
                @update="onFirstnameUpdate"
                required
                :validator="firstnameValidator"
            />
            <InputField
                id="lastname"
                type="text"
                label="Nom de famille"
                @update="onLastnameUpdate"
                required
                :validator="lastnameValidator"
            />
            <InputField
                id="email"
                type="email"
                label="Email"
                @update="onEmailUpdate"
                required
                :validator="mailValidator"
            />
            <template v-if="showSpecialties">
                <h2 class="subtitle">Spécialité</h2>
                <div class="columns is-desktop">
                    <b-select placeholder="Sélectionnez votre spécialité" class="column is-half" expanded v-model="selectedSpecialty">
                        <option
                            v-for="specialty of specialties"
                            :value="specialty"
                            :key="specialty.shortName"
                        >
                            {{ specialty.fullName }}
                        </option>
                    </b-select>
                    <b-select placeholder="Sélectionnez votre année" class="column is-half" expanded :disabled="selectedSpecialty === null" v-model="selectedYear">
                        <option
                            v-for="year of (selectedSpecialty || {}).years"
                            :value="year"
                            :key="year"
                        >
                            {{ year }}<sup>{{ yearCard(year) }}</sup> année
                        </option>
                    </b-select>
                </div>
            </template>
        </form>
    </section>
</template>
<script>
import { mailValidation, firstnameValidation, lastnameValidation } from '~/plugins/validators';

export default {
    props: {
        bdeName: String,
        specialties: { type: Array, default: [] },
        showSpecialties: { type: Boolean, default: true },
    },
    data() {
        return {
            firstname: { valid: false, value: '' },
            lastname: { valid: false, value: '' },
            email: { valid: false, value: '' },
            selectedSpecialty: null,
            selectedYear: null,
        }
    },
    emits: ['onValid', 'onInvalid'],
    computed: {
        mailValidator() {
            return mailValidation;
        },
        firstnameValidator() {
            return firstnameValidation;
        },
        lastnameValidator() {
            return lastnameValidation;
        },
        formValue() {
            const details = {
                firstname: this.firstname.value,
                lastname: this.lastname.value,
                email: this.email.value,
            };
            if (this.showSpecialties) {
                return {
                    ...details,
                    specialty: {
                        name: this.selectedSpecialty,
                        year: this.selectedYear
                    }
                };
            }
            return details;
        }
    },
    watch: {
        firstname: function() {
            this.checkValidity();
        },
        lastname: function() {
            this.checkValidity();
        },
        email: function() {
            this.checkValidity();
        },
        selectedSpecialty: function() {
            this.resetSelectedYearIfRequired();
            this.checkValidity();
        },
        selectedYear: function() {
            this.checkValidity();
        },
        specialties: function() {
            if (this.selectedSpecialty && !this.specialties.map(spe => spe.shortName).includes(this.selectedSpecialty.shortName)) {
                this.selectedSpecialty = null;
            }
        }
    },
    methods: {
        onFirstnameUpdate(valid, value) {
            this.firstname = { valid, value };
        },
        onLastnameUpdate(valid, value) {
            this.lastname = { valid, value };
        },
        onEmailUpdate(valid, value) {
            this.email = { valid, value };
        },
        yearCard(year) {
            if (year === 1) {
                return "ère";
            }
            return "ème";
        },
        resetSelectedYearIfRequired() {
            if (!this.selectedSpecialty || !this.selectedSpecialty.years.includes(this.selectedYear)) {
                this.selectedYear = null;
            }
        },
        checkValidity() {
            let valid;
            const detailsValid = this.firstname.valid && this.lastname.valid && this.email.valid;
            if (this.showSpecialties) {
                valid = detailsValid && this.selectedSpecialty !== null && this.selectedYear !== null;
            } else {
                valid = detailsValid;
            }

            if (valid) {
                this.$emit('onValid', this.formValue);
            } else {
                this.$emit('onInvalid');
            }
        }
    }
}
</script>