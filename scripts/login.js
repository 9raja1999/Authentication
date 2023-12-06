import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from '../firebase/firebaseConfig.js'


var email = document.getElementById('email')
var password = document.getElementById('pass')
var loginForm = document.getElementById('loginForm')

window.onload = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
        window.location.pathname = '/'
    }
}

loginForm.addEventListener(
    'submit',
    handleLogin
)


function handleLogin(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((response) => {
            console.log("login Success", response)
            if(response.user.emailVerified === false){
                alert('Please verify your email address')
                return
            }
            localStorage.setItem('user', JSON.stringify(response.user))


            // redirecting to wards dashboard page
            window.location.pathname = '/'
        })
        .catch((error) => {
            console.error("ERROR", error)
        })
}


