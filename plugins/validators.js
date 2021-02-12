function mailValidation(input) {
  if (input) {
    return input.length > 3 && input.match(/.*@.*\..+/);
  } else {
    return false;
  }
}

function passwordValidation(input) {
  if (input) {
    return (
      input.length > 7 &&
      input.match(/.*[0-9]+.*/) &&
      input.match(/.*[!,.:;%<>&#$\/\*?\\]+.*/)
    );
  } else {
    return false;
  }
}

function textValidation(input) {
  if (input) {
    return input.length > 0 && !input.match(/.*[0-9]+.*/);
  } else {
    return false;
  }
}

function integerValidation(input) {
  if (input) {
    return Number.isInteger(input);
  } else {
    return false;
  }
}

export {
  mailValidation,
  passwordValidation,
  textValidation,
  integerValidation
};
