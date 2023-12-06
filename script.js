window.onload = function(){
    var user = JSON.parse(localStorage.getItem('user'))
    if (user === null) {
        window.location.pathname = '/pages/login'
    }
}