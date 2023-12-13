import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
    googleProvider,
    githubProvider
} from '../firebase/firebaseConfig.js'


var email = document.getElementById('email')
var password = document.getElementById('pass')
var loginForm = document.getElementById('loginForm')
var googleLoginBtn = document.getElementById('google-login')
var githubLoginBtn = document.getElementById('github-login')

window.onload = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
        window.location.pathname = '/'
    }
}

googleLoginBtn.addEventListener(
    'click',
    handleGoogleAuth
)

githubLoginBtn.addEventListener(
    'click',
    handleGithubLogin
)

loginForm.addEventListener(
    'submit',
    handleLogin
)

function handleGoogleAuth() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            localStorage.setItem('user', JSON.stringify(result.user))
            window.location.pathname = "/"
        })
        .catch((error) => {
            console.error("error", error);
        })
    }
    
    function handleGithubLogin(){
        console.log(":")
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                localStorage.setItem('user', JSON.stringify(result.user))
                window.location.pathname = "/"
            })
            .catch((error) => {
                console.error("error", error);
            })
    }


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


