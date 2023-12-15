import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, set, ref, get, child, onChildAdded, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage, ref as Sref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyA7uxqDUHLiJBKDf96xnErmrZiKxZSGOHE",
    authDomain: "chatapp-632ea.firebaseapp.com",
    databaseURL: "https://chatapp-632ea-default-rtdb.firebaseio.com",
    projectId: "chatapp-632ea",
    storageBucket: "chatapp-632ea.appspot.com",
    messagingSenderId: "480343205415",
    appId: "1:480343205415:web:9d65028f1ea3f568115002"
  };

const app = initializeApp(firebaseConfig);

var auth = getAuth(app)
var db = getDatabase(app)
// var storage = getStorage();
var googleProvider = new GoogleAuthProvider()
var githubProvider = new GithubAuthProvider()


export {
    auth,
    db,
    getStorage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    googleProvider,
    githubProvider,
    signInWithPopup,
    set,
    ref,
    get,
    child,
    Sref,
    uploadBytesResumable,
    getDownloadURL,
    push
}