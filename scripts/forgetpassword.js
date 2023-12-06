import {
    auth,
    sendPasswordResetEmail
} from '../firebase/firebaseConfig.js'


var email = document.getElementById('email')
var forgetPasswordForm = document.getElementById('forgetPasswordForm')

window.onload = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
        window.location.pathname = '/'
    }
}

forgetPasswordForm.addEventListener(
    'submit',
    handleResetPassword
)

function handleResetPassword(e) {
    e.preventDefault();
    var emailaddress = email.value;
    if (emailaddress.length === 0){
        alert('enter the email address')
        return
    }

    
    sendPasswordResetEmail(auth , emailaddress)
        .then(() => {
            alert(`Password reset link on your email ${emailaddress}  send successfully`)
        })
        .catch((error) => {
            console.error("error", error);
        })

}