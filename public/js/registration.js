(function(){
// SELECT REGISTRATION OR LOGIN FORM
document.querySelector('.tab-group').addEventListener('click', function(e){
    e.preventDefault();
    Array.prototype.forEach.call(this.children, function(element) {
        element.classList.remove('active')
    });
    e.target.closest('li').classList.add('active');
    var containerForm = document.querySelectorAll('.form');
    Array.prototype.forEach.call(containerForm, function(element) {
        element.style.display = 'none';
        element.classList.remove('active');
        if(e.target.closest('li').dataset.tab == element.id){
        element.style.display = 'block'
            setTimeout(function(){
                element.classList.add('active');
            },10)
        }
    });
});

//    CHANGE CLASS ON FOCUS EVENT
document.querySelector('#registration').addEventListener('focus', changeClassLabelOnFocus, true);
document.querySelector('#registration').addEventListener('blur', changeClassLabelOnBlur, true);

document.querySelector('#login').addEventListener('focus', changeClassLabelOnFocus, true);
document.querySelector('#login').addEventListener('blur', changeClassLabelOnBlur, true);

function changeClassLabelOnFocus(e){
    var label = e.target.previousElementSibling;
    label.className = 'active';
}
function changeClassLabelOnBlur(e){
    var label = e.target.previousElementSibling
    if(e.target.value === ''){
        label.className = '';
    }
}
// REGISTER USER
var users = new AJAX('http://localhost:4500', '/user');
document.querySelector('#registration input[name="Sign_Up"]').onclick = function(){
    var user = {};
    var registrationForm = document.forms.registration;
    user.login = registrationForm.querySelector('input[name="login"]').value;
    user.email = registrationForm.querySelector('input[name="email"]').value;
    user.password = registrationForm.querySelector('input[name="password"]').value;
    // Send Ajax Post to Save DataBase
    users.post(user, function(res){
       var data = JSON.parse(res);
       if(!data.success){
        document.querySelector('.registration .invalidRegistration').innerHTML = data.message; 
       }else{
       document.querySelector('.statusRegistration').innerHTML = data.message;
       setTimeout(function(){
        document.querySelector('.statusRegistration').classList.add('active');
       },0);
       var containerForm = document.querySelectorAll('.form');
       Array.prototype.forEach.call(containerForm, function(element) {
           element.style.display = 'none';
           element.classList.remove('active');
        });
        var tab = document.querySelectorAll('.tab');
        Array.prototype.forEach.call(tab, function(element) {
            element.classList.toggle('active');
         });
        containerForm[1].style.display = 'block'
        setTimeout(function(){
        containerForm[1].classList.add('active');
        },10)
       setTimeout(function(){
        document.querySelector('.statusRegistration').classList.remove('active');
       },2000)
    }
    });
};

var authentication = new AJAX(window.location.origin, '/authentication');
document.querySelector('#login input[name="Log_In"]').onclick = function(){
    var authenticationUser = {};
    var authenticationForm = document.forms.authentication;
    authenticationUser.login = authenticationForm.querySelector('input[name="login"]').value;
    authenticationUser.password = authenticationForm.querySelector('input[name="password"]').value;
    authentication.post(authenticationUser, function(res, loc){
        if(!loc){
            document.querySelector('.invalid').innerHTML = res;
        }else{
            window.location = loc;
        }
    })
}
})();
