const checkValidateData = (name, email, password) => {

    let isNameValid = true;
    if (name !== null) {
        isNameValid = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(name)
    }
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])\S{8,20}$/.test(password)

    if (!isNameValid) return "Name is invalid"
    if (!isEmailValid) return "Email is invalid"
    if (!isPasswordValid) return "Password is invalid"

    return null
}

export default checkValidateData;