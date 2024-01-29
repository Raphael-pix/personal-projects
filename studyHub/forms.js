const form = document.getElementById("register")
const email =document.getElementById("email")
const password = document.getElementById("password")
const conPassword = document.getElementById("conpassword")

function showError(input,message){
    input.className = "err"
    const inputBar = input.parentElement
    const formElement =inputBar.parentElement
    const error = formElement.querySelector(".error")
    error.innerHTML = message
    formElement.className="form-element err"
}
function showSuccess(input){
    input.className = "success"
    const inputBar = input.parentElement
    const formElement =inputBar.parentElement
    formElement.className="form-element"
}

function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(input=>{
        if(input.value.trim ==""){
            showError(input,`${getFieldName(input)} is required`)
            isRequired = true
        }else{
            showSuccess(input)
        }
    })
    return isRequired
}

function checkPassword(input1,input2){
    if(input1.value !== input2.value){
        showError(input1,"")
        showError(input2,"password doesn't match")
    }else{
        showSuccess(input1)
        showSuccess(input2)
    }
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input,"Email invalid")
    }
    console.log("email function working")
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
    console.log("length function working")
  }

function getFieldName(input){
    return  input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener("submit",function(e){
    e.preventDefault()
    checkLength(password,6,15);
    checkEmail(email);
    checkPassword(password,conPassword);
})
