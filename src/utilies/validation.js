export const loginValidation = ({ email, password }) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email === '') {
        return {
            valid: false,
            errors: email === '' ? "Please Enter Email" : null
        }
    }
    else if (reg.test(email) === false) {
        return {
            valid: false,
            errors: reg.test(email) === false ? "Email format is invalid" : null
        }
    }
    else if (password === '') {
        return {
            valid: false,
            errors: password === '' ? "Please Enter Your Password" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}


export const Signup_CreatePass = ({ password, confirmPassword }) => {


    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (password === "") {
        return {
            valid: false,
            errors: password === "" ? "Please enter your Password" : null
        }
    }
    else if (confirmPassword === "") {
        return {
            valid: false,
            errors: confirmPassword === "" ? "Please enter your Confirm Password" : null
        }
    }
    else if (confirmPassword !== password) {
        return {
            valid: false,
            errors: confirmPassword !== password ? "Password & Confirm Password Does not Match" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}

export const Edit_Profile_Valid = ({fullName, gender, oldPassword,confirmPassword, newPassword, previousPassword}) => {

    if (fullName === "") {
        return {
            valid: false,
            errors: fullName === "" ? "Please enter your name" : null
        }
    }
    else if (gender === "") {
        return {
            valid: false,
            errors: password === "" ? "Please Select Gender" : null
        }
    } else if(oldPassword === "" && newPassword !== ""){
        return {
            valid: false,
            errors: oldPassword === "" ? "Old Password Required" : null
        }
    } else if(oldPassword !== previousPassword && newPassword !== ""){
        return {
            valid: false,
            errors: oldPassword !== previousPassword ? "Old password is incorrect" : null
        }
    } else if(newPassword !== '' && newPassword === ""){
        return {
            valid: false,
            errors: newPassword === "" ? "New Password is required" : null
        }
    } else if(newPassword !== '' && confirmPassword === ""){
        return {
            valid: false,
            errors: confirmPassword === "" ? "Confirm Password is required" : null
        }
    } else if(newPassword !== confirmPassword){
        return {
            valid: false,
            errors: newPassword !== confirmPassword ? "New Password & Confirm Password Does Not Match" : null
        }
    } 
    else {
        return { valid: true, errors: null }
    }
    
}


export const Signup_validation = ({ fullName, userEmail, password, againPassword, userType }) => {


    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (fullName === "") {
        return {
            valid: false,
            errors: fullName === "" ? "Please enter your name" : null
        }
    }
    else if (userEmail === '') {
        return {
            valid: false,
            errors: userEmail === '' ? "Please Enter Your Email" : null
        }
    }
    else if (reg.test(userEmail) === false) {
        return {
            valid: false,
            errors: reg.test(userEmail) === false ? "Email format is invalid" : null
        }
    }
    else if (password === "") {
        return {
            valid: false,
            errors: password === "" ? "Please enter your password" : null
        }
    }
    else if(password.length < 6){
        return {
            valid: false,
            errors: password.length < 6 ? "Password Should have atleast 6 digits" : null
        }
    }
    else if (againPassword === "") {
        return {
            valid: false,
            errors: againPassword === "" ? "Please enter repeat password" : null
        }
    }
    else if (password !== againPassword) {
        return {
            valid: false,
            errors: password !== againPassword ? "Both password should be same" : null
        }
    }
    else if (userType == '') {
        return {
            valid: false,
            errors: userType == '' ? "Please Select User Type" : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}