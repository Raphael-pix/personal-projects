const form = document.querySelector("#register")
const password = document.querySelector("#password")
const conPassword = document.querySelector("#conpassword")
const error = document.querySelectorAll(".error")
const passwordInput = document.querySelectorAll(".password")
const email =document.querySelector("#email")
const userName =document.querySelector("#name")
console.log(userName)

function checkName(){
    if(userName.value.length < 6 || userName.value.length > 25){
        error[0].innerHTML = "Invalid username"
    }else{
        error[0].innerHTML = ""
        userName.setAttribute('style', 'border-bottom: 1.5px solid #66FF00;')
    }
}

function checkPassword(){
    if(password.value  !== conPassword.value){
        error[3].innerHTML = "Passwords don't match"
    }else{
        error[3].innerHTML = ""
        passwordInput[0].setAttribute('style', 'border-bottom: 1.5px solid #66FF00;')
        passwordInput[1].setAttribute('style', 'border-bottom: 1.5px solid #66FF00;')
    }
}

function checkEmail(){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        error[1].innerHTML=""
        email.setAttribute('style', 'border-bottom: 1.5px solid #66FF00;')
    }else{
        error[1].innerHTML="Invalid email"
    }
    console.log(re.test(email.value))
    console.log(email.value)
}

form.addEventListener("submit",function(e){
    e.preventDefault()

    checkName()
    checkEmail()
    checkPassword()
})