import {
    auth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from '../firebase/firebaseConfig.js'

var email = document.getElementById('email')
var password = document.getElementById('pass')
var cPassword = document.getElementById('cPass')


document.getElementById('register').addEventListener(
    'submit',
    handleRegister
)

function handleRegister(e) {
    e.preventDefault()

    if (password.value !== cPassword.value) {
        alert('Password does not matches')
        return
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((response) => {
            alert('successfully registered check email for verification')
            handleVerifyEmail(response.user)
        })
        .catch((error) => {
            console.error("error", error);
        })
}

function handleVerifyEmail(user) {
    console.log("USER" , user)
    sendEmailVerification(user)
        .then(() => {
            //email send successfully
            console.log("EMAIL SEND SUCCESS")
            window.location.pathname = '/pages/login'
        })
        .catch((error) => {
            console.error('error', error);
        })
}





