import validator from 'validator';

export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events(){
        if(!this.form) return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        let resEmailCadastro = document.getElementById('erro-email-cadastro');
        let resSenhaCadastro = document.getElementById('erro-senha-cadastro');

        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            resEmailCadastro.style.color = "red";
            resEmailCadastro.innerText = "E-mail inválido";
	        emailInput.focus();
            error = true;
        }

        if(passwordInput.value.length <= 3 || passwordInput.value.length > 50) {
            resSenhaCadastro.style.color = "red";
            resSenhaCadastro.innerText = "Senha inválido";
	        passwordInput.focus();
            error = true;
        }

        if(!error) {
            el.submit();
        }
    }
}
//