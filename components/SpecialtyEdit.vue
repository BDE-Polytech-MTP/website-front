<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Édition d'une spécialité</p>
                <button
                    type="button"
                    class="delete"
                    @click="$parent.close()"
                />
            </header>
            <section class="modal-card-body">
                <InputField 
                    id="specialtyLongName"
                    label="Nom complet de la spécialité"
                    placeholder="Ex: Informatique et Gestion"
                    required
                    expanded
                    :validator="longNameValidator"
                    @update="longNameUpdate"
                    :value="longName.value"
                />
                <InputField
                    id="specialtyShortName"
                    label="Initiales de la spécialité"
                    placeholder="Ex: IG"
                    required
                    expanded
                    :validator="shortNameValidator"
                    @update="shortNameUpdate"
                    :value="shortName.value"
                />
                <b-field label="Années concernées">
                    <div class="block">
                        <b-checkbox v-model="years" :native-value="1">1<sup>ère</sup> année</b-checkbox>
                        <b-checkbox v-model="years" :native-value="2">2<sup>ème</sup> année</b-checkbox>
                        <b-checkbox v-model="years" :native-value="3">3<sup>ème</sup> année</b-checkbox>
                        <b-checkbox v-model="years" :native-value="4">4<sup>ème</sup> année</b-checkbox>
                        <b-checkbox v-model="years" :native-value="5">5<sup>ème</sup> année</b-checkbox>
                    </div>
                </b-field>
                <b-button
                    label="Annuler"
                    @click="$parent.close()"
                />
                <b-button
                    label="Valider"
                    type="is-primary"
                    :disabled="isDisabled"
                    @click="submitForm()"
                />
            </section>
        </div>
    </form>
</template>
<script>
const validateLongName = (value) => value && value.length >= 1 && value.length <= 100;
const validateShortName = (value) => value && value.length >= 1 && value.length <= 10;

export default {
    props: {
        specialty: { required: false },
    },
    data() {
        const inData = this.specialty || {
            fullName: '',
            shortName: '',
            years: [3, 4, 5]
        };
        return {
            years: [ ...inData.years],
            longName: {
                valid: validateLongName(inData.fullName),
                value: inData.fullName
            },
            shortName: {
                valid: validateShortName(inData.shortName),
                value: inData.shortName
            },       
        }
    },
    computed: {
        isDisabled() {
            return !this.longName.valid || !this.shortName.valid || this.years.length === 0;
        },
        shortNameValidator() {
            return validateShortName;
        },
        longNameValidator() {
            return validateLongName;
        }
    },
    methods: {
        submitForm() {
            this.$emit('submitted', { ... this.specialty, fullName: this.longName.value, shortName: this.shortName.value, years: this.years.sort() });
            this.$parent.close();
        },
        shortNameUpdate(valid, value) {
            this.shortName = { valid, value };
        },
        longNameUpdate(valid, value) {
            this.longName = { valid, value };
        },
    },
}
</script>