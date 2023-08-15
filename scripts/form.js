// Get btn element by id
var btn = document.getElementById("submitbtn");

let isFormValid = true;

function sendForm() {
    isFormValid = true;

    var name = document.getElementById("fname").value;
    var nameInput = document.getElementById("fname");
    var phone = document.getElementById("number").value;
    var email = document.getElementById("mail").value;
    var emailInput = document.getElementById("mail");
    var message = document.getElementById("message").value;
    var messageInput = document.getElementById("message");

    const clearError = document.querySelectorAll('.error');
    clearError.forEach(element => {
        element.remove();
    });

    nameInput.classList.remove('border-red-500')
    emailInput.classList.remove('border-red-500')
    messageInput.classList.remove('border-red-500')

    emptyInput(name, nameInput);
    emptyInput(email, emailInput);
    emptyInput(message, messageInput);

    var data = {
        name: name,
        email: email,
        message: message
    };

    if (isFormValid) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/scripts/form.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    document.getElementById("form").innerHTML = "<h2>Thank you for your message!</h2>";
                } else {
                    document.getElementById("form").innerHTML = "<h2>Sorry, there was a problem sending your message.</h2>";
                }
            }
        };

        const para = document.createElement("p");
        para.classList.add('error', 'text-xl', 'mt-2', 'font-bold')
        const node = document.createTextNode("Vielen Dank für Ihre Nachricht!");
        para.appendChild(node);
        document.getElementById("submitbtn").insertAdjacentElement('beforebegin',para);

        nameInput.value = ''
        emailInput.value = ''
        messageInput.value = ''
    }
}

function emptyInput(element, parent) {
    if (element == null || element == "") {
        parent.classList.add('border-red-500')
        const para = document.createElement("p");
        para.classList.add('error', 'text-xs', 'text-red-500', 'mt-1', 'italic')
        const node = document.createTextNode("Bitte zwingend ausfüllen!");
        para.appendChild(node);

        parent.insertAdjacentElement('beforebegin', para);
        isFormValid = false
    }
}

window.addEventListener("load", () => {
    var messageInput = document.getElementById("message");
    messageInput.value = 'Guten Tag! Gerne hätte ich eine unverbindliche Offerte für meine Website.'
})

// Add event listener to btn
btn.addEventListener("click", sendForm, false);