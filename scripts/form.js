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

    if (isFormValid) {
        fetch("https://sgwql1eb6l.execute-api.us-east-1.amazonaws.com/test/form", {
            // Adding method type
            method: "POST",
            mode: 'no-cors',
            // Adding body or contents to send
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                message: message
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

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