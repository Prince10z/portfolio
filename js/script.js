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
});
subBut.addEventListener("mouseup", () => {
    subBut.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.3)";
});

subBut.addEventListener("mousedown", () => {
    subBut.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.9)";
});



function submitForm() {
    console.log("testinfasdf");
    // Retrieve form data
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const msg = document.getElementById('msg').value;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // Construct the form data
    const formData = new FormData();
    const urlencoded = new URLSearchParams();
    urlencoded.append("fullname", fullname);
    urlencoded.append("email", email);
    urlencoded.append("msg", msg);

    // Make a POST request
    fetch('http://192.168.29.219:3000/resume/send', {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                alert("An error occurred. Please try again later.");
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Handle response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error
        });
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