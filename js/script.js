const sendingUrl = "https://backendportfolio-1dz3.onrender.com/resume/send";
const headerbackground = document.getElementById("fixedheader")
const arrows = document.getElementsByClassName("arrow");
window.addEventListener('scroll', function () {
    const scrolledPosition = window.scrollY;
    console.log("Scrolled:", scrolledPosition);
    if (scrolledPosition >= 500) {
        arrows[0].style.display = "none";
    } else {
        arrows[0].style.display = "block";
    }
    if (scrolledPosition >= 50) {
        headerbackground.style.backgroundColor = "rgb(2, 14, 28, 0.9";
    } else {
        headerbackground.style.background = "none";
    }
});


function scrollDown() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

// Get the elements
const githubIcon = document.getElementById('githubIcon');
const linkedinIcon = document.getElementById('linkedinIcon');

githubIcon.addEventListener('mouseenter', function () {
    this.querySelector('i').style.color = '#ffffff';
});

githubIcon.addEventListener('mouseleave', function () {
    this.querySelector('i').style.color = '#b2a4e0';
});

linkedinIcon.addEventListener('mouseenter', function () {
    this.querySelector('i').style.color = '#ffffff';
});

linkedinIcon.addEventListener('mouseleave', function () {
    this.querySelector('i').style.color = '#b2a4e0';
});
const subBut = document.getElementById("submitForm");
subBut.addEventListener("click", (e) => {
    e.preventDefault();
    // submitForm();
    submitForms();
});
subBut.addEventListener("mouseup", () => {
    subBut.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.3)";
});

subBut.addEventListener("mousedown", () => {
    subBut.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.9)";
});

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {


        document.getElementById("email").focus();

        return true;

    } else {


        document.getElementById("email").focus();

        return false;

    }

}

function submitForms() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const namevalue = document.getElementById("fullname").value;
    const emailvalue = document.getElementById("email").value;
    const msgvalue = document.getElementById("msg").value;
    if (namevalue.trim() == "" || emailvalue.trim() == "" || msgvalue.trim() == "") {
        showAlert("First fill the required info");
        console.log(namevalue.trim() == "" || emailvalue.trim() == "" || msgvalue.trim());
        if (namevalue.trim() == "") {
            document.getElementById("fullname").focus();
        }
        if (emailvalue.trim() == "") {
            document.getElementById("email").focus();
        }
        if (msgvalue.trim() == "") {
            document.getElementById("msg").focus();
        }
    } else {
        console.log("test2");
        if (!ValidateEmail(emailvalue)) {
            showAlert("Invalid email address.");
            document.getElementById("email").focus();
            return; // Exit function if email is invalid
        }
        const bodyval = new URLSearchParams({
            fullname: namevalue,
            email: emailvalue,
            msg: msgvalue
        });

        const reqOpt = {
            method: "POST",
            headers: myHeaders,
            body: bodyval.toString(),
        };

        fetch(sendingUrl, reqOpt)
            .then((response) => {
                if (!response.ok) {
                    if (response.status == 500) {
                        showAlert("Please check your internet connection");
                        throw new Error("Please check your internet connection");
                    } else if (response.status == 400) {
                        showAlert("First fill the required info");
                        throw new Error("First fill the required info");
                    } else {
                        throw new Error("An unexpected error occurred");
                    }
                }
                return response.json();
            })
            .then((response) => {
                showAlert("Successfully send");
                console.log(response.status); // Assuming response contains a status property
            })
            .catch((e) => {
                showAlert(`Please try again`);
                console.error("Error in sending message:", e.message);
            });


    }

}


//Alert..........
const overlay = document.getElementById("overlay");
const customAlert = document.getElementById("customAlert");

function showAlert(message) {
    document.getElementById("alertMessage").textContent = message;
    customAlert.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function hideAlert() {
    customAlert.classList.add("hidden");
    overlay.classList.add("hidden");
}

document.getElementById("closeAlert").addEventListener("click", hideAlert);