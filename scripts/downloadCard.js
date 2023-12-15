import {
    query, db, ref, equalTo, get, orderByChild
} from '../firebase/firebaseConfig.js'

window.onload = function () {
    var user = JSON.parse(localStorage.getItem('user'))
    if (user === null) {
        window.location.pathname = '/pages/login'
    }
}

var cnicInput = document.getElementById('cnicInput');
var downloadIdCardForm = document.getElementById('download-form');


downloadIdCardForm.addEventListener(
    'submit',
    handleDownload
)

function handleDownload(e) {
    e.preventDefault()


    var cnic = cnicInput.value;


    var registrationRef = ref(db, 'registrations')
    var registration = query(registrationRef, orderByChild('cnic'), equalTo(cnic))

    get(registration)
        .then((snapshot) => {
            var info = Object.values(snapshot.val())[0]
            renderCard(info)
        })
        .catch((error) => {
            console.error("Error", error)
        })
}

function renderCard(data) {
    var html = `
        <div>
            ${JSON.stringify(data)}
            <button id="downloadBtn"  class='btn btn-success'>download</button>
        </div>
    `

    document.getElementById('card-display').innerHTML = html;
    document.getElementById('downloadBtn').addEventListener('click' , downloadCard)
}


function downloadCard() {
    var doc = new jsPDF();
    var content = document.querySelector('#card-display')
    console.log("cc", content)
    // return 
    doc.fromHTML(content.outerHTML, 15, 15, {
        'width': 70,
    });
    doc.save('sample-file.pdf');
}






