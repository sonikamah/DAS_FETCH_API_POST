const validate = (values) => {
    const errors = {};
    if (!values.firstName || !/^[a-zA-Z'-]{3,25}$/g.test(values.firstName)) {
        errors.firstName = "First Name can have maximum of 25 characters with apostrophie and hyphen as only allowable characters";
    }
    if (!values.lastName || !/^[a-zA-Z'-]{3,30}$/g.test(values.lastName)) {
        errors.lastName = "Last Name can have maximum of 30 characters with apostrophie and hyphen as only allowable characters";
    }
    if (values.middleName !== "" && !/^[a-zA-Z'-]{1,10}$/g.test(values.middleName)) {
        errors.middleName = "Middle can only have upto 10 chacters with no special characters";
    }
    if (!values.ssnFirst || values.ssnFirst.length < 3) {
        errors.ssnFirst = "Please enter a valid ssn number";
    }
    if (!values.ssnSecond || values.ssnSecond.length < 3) {
        errors.ssnSecond = "Please enter a valid ssn number";
    }
    if (!values.ssnThird || values.ssnThird.length < 4) {
        errors.ssnThird = "Please enter a valid ssn number";
    }
    return errors;
}

export default validate;