import { storage, Sref, uploadBytesResumable, getDownloadURL, ref, db, push, set } from './firebase/firebaseConfig.js'

window.onload = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user === null) {
        window.location.pathname = '/pages/login'
    }
}

var profileImage = null;


var fName = document.getElementById('fName')
var lName = document.getElementById('lName')
var fatherName = document.getElementById('fatherName')
var cnicInput = document.getElementById('cnicInput')
var cityInput = document.getElementById('cityInput')
var provinceInput = document.getElementById('provinceInput')
var addressInput = document.getElementById('addressInput')

var registrationForm = document.getElementById('registrationForm')


var displayImage = document.getElementById('image-display')
var browseBtn = document.getElementById('browse-btn')



browseBtn.addEventListener('click', browseImage)


registrationForm.addEventListener(
    'submit',
    handleSubmit
)

function browseImage() {
    console.log("clicked");

    var input = document.createElement('input')
    input.type = "file"
    input.click()



    input.onchange = function (e) {
        var files = e.target.files
        var imageReader = new FileReader()

        profileImage = files[0]

        imageReader.readAsDataURL(files[0])
        imageReader.onload = function () {

            displayImage.innerHTML = `
                <img src=${imageReader.result} alt="profile" />
            `

        }

    }
}


function handleSubmit(e) {
    e.preventDefault()
    var data = {
        name: {
            first_name: fName.value,
            last_name: lName.value,
        },
        father_name: fatherName.value,
        cnic: cnicInput.value,
        city: cityInput.value,
        province: provinceInput.value,
        address: addressInput.value
    }

    var profileRef = Sref(storage, `profileImages/${profileImage.name}`);
    var uploadTask = uploadBytesResumable(profileRef, profileImage);
    uploadTask.on('state_changed',
        (snapshot) => {
            console.log("first observer");
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error("error");
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                var registrationRef = ref(db, 'registrations')
                var registetUniqueRef = push(registrationRef)

                set(ref(db, `registrations/${registetUniqueRef.key}`), { ...data, profileImage: downloadURL })
                    .then(res => {
                        alert('Form Submitted')
                    })
                    .catch(err => {
                        console.error("error", err)
                    })
            });
        }
    );
}
















// var Files = null
// var browseBtn = document.getElementById('browse-btn')
// // input references
// var fName = document.getElementById('fName')
// var lName = document.getElementById('lName')
// var fatherName = document.getElementById('fatherName')
// var cnicInput = document.getElementById('cnicInput')
// var cityInput = document.getElementById('cityInput')
// var provinceInput = document.getElementById('provinceInput')
// var registrationForm = document.getElementById('registrationForm')

// browseBtn.addEventListener('click', browseImage)
// registrationForm.addEventListener('submit', handleSumbit)

// function browseImage() {
//     var input = document.createElement('input')
//     input.type = 'file'
//     input.accept = "image/png,image/gif,image/jpeg"
//     input.onchange = (e) => {
//         const files = e.target.files
//         Files = files[0]
//         displayImage()
//     }
//     input.click()
// }

// function displayImage() {
//     var imageReader = new FileReader()

//     imageReader.onload = function () {
//         var displayImage = document.getElementById('image-display')
//         displayImage.innerHTML = `<img src=${imageReader.result} alt='profileImage' />`
//     }

//     imageReader.readAsDataURL(Files)
// }

// function handleSumbit(e) {
//     e.preventDefault()
//     const registrationRef = ref(db, `registrations`);

//     const newRegistrationRef = push(registrationRef);

//     var data = {
//         name : ''
//     }

//     set(ref(db, `registrations/${newRegistrationRef.key}`), product)
//         .then(res => {
//             alert('data added successfully')
//         })
//         .catch(err => {
//             console.error("error", err)
//         })
// }