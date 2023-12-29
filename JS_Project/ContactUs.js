document.addEventListener("DOMContentLoaded", function () {
    window.onscroll = function () { scrollFunction() };
    window.scrollTo(0, 0);
});

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function userName() {
    var myName = document.getElementById("username").value;
    var nameError = document.getElementById("nameError");
    var nameRegex = /^[a-zA-Z\- ]{2,}$/;

    nameError.innerHTML = "";
    if (myName === "") {
        nameError.innerHTML = "Name is required";
        return false;
    } else if (!myName.match(nameRegex)) {
        nameError.innerHTML = "Invalid Name";
        return false;
    }
    return true;
}

function email() {
    var userEmail = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    var emailRegex = /^[a-zA-Z][a-zA-Z0-9]+@+[a-z]+\.com$/;
    emailError.innerHTML = "";
    if (userEmail.trim() === "") {
        emailError.innerHTML = "Email is required";
        return false;
    } else if (!userEmail.match(emailRegex)) {
        emailError.innerHTML = "Invalid email address";
        return false;
    }
    return true;
}

function pass() {
    var password = document.getElementById("password").value;
    var passError = document.getElementById("passError");
    passError.innerHTML = "";
    if (password.trim() === "") {
        passError.innerHTML = "Password is required";
        return false;
    } else if (password.length < 8) {
        passError.innerHTML = "Password must be at least 8 characters";
        return false;
    }
    return true;
}

function phone() {
    var phone = document.getElementById("phone").value;
    var phError = document.getElementById("phoneError");
    var phoneRegex = /^(011|012|010|015)\d{8}$/;
    phError.innerHTML = "";
    if (phone.trim() === "") {
        phError.innerHTML = "Phone is required";
        return false;
    } else if (!phone.match(phoneRegex)) {
        phError.innerHTML = "Invalid Phone";
        return false;
    }
    return true;
}

function message() {
    var message = document.getElementById("myMessage").value;
    var msgError = document.getElementById("messageError");
    msgError.innerHTML = "";
    if (message === "") {
        msgError.innerHTML = "Message is required";
        return false;
    }
    return true;
}

function validateForm(event) {
    event.preventDefault();
    var errors = false;
    if (!userName()) {
        errors = true;
    }
    if (!email()) {
        errors = true;
    }
    if (!pass()) {
        errors = true;
    }
    if (!phone()) {
        errors = true;
    }
    if (!message()) {
        errors = true;
    }
    if (!errors) {
        alert("We got you and we will review your response so soon!");
        window.location.reload();
    }
}