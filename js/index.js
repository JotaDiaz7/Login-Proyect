window.addEventListener('load', (event) =>{
    form_move();
    show_password();
    login();
    register();
});

function form_move(){
    var register = document.getElementById('register');
    var register_span = document.getElementById('reg');

    register_span.onclick = (event) =>{
            register_span.classList.add('form_right');
            register.classList.add('form_right');
            login_span.classList.add('form_left');
            login.classList.add('form_left');
            login_span.classList.remove('form_right');
            login.classList.remove('form_right');
            register_span.classList.remove('form_left');
            register.classList.remove('form_left');
    }

    var login = document.getElementById('login');
    var login_span = document.getElementById('log');

    login_span.onclick = (event) =>{
        if(login_span.classList == 'form_left'){
            login_span.classList.remove('form_left');
            login.classList.remove('form_left');
            register_span.classList.remove('form_right');
            register.classList.remove('form_right');
            login_span.classList.add('form_right');
            login.classList.add('form_right');
            register_span.classList.add('form_left');
            register.classList.add('form_left');
        }
    }
}

function show_password(){
    document.querySelectorAll('.eye').forEach(function(eye){
        eye.onclick = (event)=>{
            eye.classList.toggle('fa-eye');
            eye.classList.toggle('fa-eye-slash');
    
            document.querySelectorAll('.password').forEach(function(pass){
                if(pass.type == 'password'){
                    pass.setAttribute('type', 'text');
                }else{
                    pass.setAttribute('type', 'password');
                }
            });
        }
    });
}

function login(dates_recieved){

    if(typeof(Storage) !== 'undefined'){
        dates = dates_recieved;
        let logged = sessionStorage.getItem('logged');

        if(logged == 'true'){
            usser_logged();
        }else{
            usser_no_logged();
        }
    }
}

function usser_logged(){
    document.getElementById('error').classList.remove('alert_show');
    document.getElementById('login_form').classList.add('d-none');
    document.getElementById('disconnect_form').classList.remove('d-none');

    if(sessionStorage.key('name')){
        document.querySelector('h3').classList.add('h3_show');
        document.getElementById('name').textContent = sessionStorage.getItem('name');
    }else{
        document.querySelector('h3').classList.remove('h3_show');
    }

    document.getElementById('submit_disconnect').addEventListener('click', logout_button);
}

var logout_button = (event) => {
    event.preventDefault();

    fetch('../php/disconnect.php')
    .then(() => {
        sessionStorage.removeItem('logged');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        document.getElementById('login_form').classList.remove('d-none');
        document.getElementById('disconnect_form').classList.add('d-none');
        document.querySelector('h3').classList.remove('h3_show');
    });
}

function usser_no_logged(){
    const button_enter = document.getElementById('submit');

    document.getElementById('email').value = localStorage.getItem('email');

    button_enter.onclick = (event) => {
        event.preventDefault();

        let dates = new FormData(document.getElementById('login'));

        fetch('../php/login.php', {
            method: 'POST',
            body: dates
        }).then(answer => answer.json())
        .then(dates_recieved => {
            if(typeof dates_recieved.error !== 'undefined'){

                if(dates_recieved.error == false){
                    usser_logged();
                    sessionStorage.setItem('logged', true);
                    sessionStorage.setItem('email', dates_recieved.email);
                    sessionStorage.setItem('name', dates_recieved.name);
                    console.log(dates_recieved);

                    document.querySelector('h3').classList.add('h3_show');
                    document.getElementById('name').textContent = dates_recieved.name;

                    if(check.classList ==  'checked'){
                        localStorage.setItem('email', dates_recieved.email);
                    }else{
                        localStorage.removeItem('email', dates_recieved.email);
                    }
                }
            }else{
                document.getElementById('error').classList.add('alert_show');
            }
        })
    }
    remember();
}

function remember(){
    var check = document.getElementById('check');       
    check.onclick = (event) => {
        check.classList.toggle('checked')
    }

    if(localStorage.key('email')){
        check.setAttribute('checked','checked');
        check.classList.add('checked')
    }else{
        check.removeAttribute('checked','checked');
        check.classList.remove('checked')
    }
}

function register(){
    const button_register = document.getElementById('submit_register');

    button_register.onclick = (event) => {
        event.preventDefault();

        let dates = new FormData(document.getElementById('register'));

        fetch('../php/register.php', {
            method: 'POST',
            body: dates
        }).then(answer => answer.json())
        .then(dates_register => {
            var error_register = document.getElementById('error_register');
            var error_password = document.getElementById('error_password');
            var error_repeat = document.getElementById('error_repeat');
            var success_register = document.getElementById('success_register');

            if(dates_register == "OK"){
                error_password.classList.remove('alert_show');
                error_register.classList.remove('alert_show');
                error_repeat.classList.remove('alert_show');
                success_register.classList.add('alert_show');
                document.getElementById('register').reset();
            }else if(dates_register == "Error_pass"){
                error_password.classList.add('alert_show');
            }else if(dates_register == "Error_repeat"){
                error_repeat.classList.add('alert_show');
            }else{
                error_register.classList.add('alert_show');
            }
        });
    }
}