const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const sendingUrl = "https://backendportfolio-1dz3.onrender.com/resume/send";
const startserverUrl =
  "https://backendportfolio-1dz3.onrender.com/resume/liveServer";
const myStartServerHeaders = new Headers();
myStartServerHeaders.append(
  "Content-Type",
  "application/x-www-form-urlencoded"
);
const reqStart = {
  method: "GET",
  headers: myStartServerHeaders,
};
fetch(startserverUrl, reqStart)
  .then((response) => {
    console.log(response.status);
  })
  .catch((e) => {
    console.error("Error in sending message:", e.message);
  });

window.addEventListener("mousemove", function (e) {
  cursorDot.style.display = "block";
  cursorOutline.style.display = "block";

  const posX = e.clientX;
  const posY = e.clientY;
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;
  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

//SideBar Animation
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuItem = document.getElementById("otherItem");
  menuItem.style.color = "transparent";
  sidebar.style.display = "flex";
  sidebar.style.transform = "translateX(0)";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const menuItem = document.getElementById("otherItem");
  menuItem.style.color = "white";
  sidebar.style.display = "none";
  sidebar.style.transform = "translateX(100%)";
}
////

const headerbackground = document.getElementById("fixedheader");
const arrows = document.getElementsByClassName("arrow");
window.addEventListener("scroll", function () {
  const scrolledPosition = window.scrollY;
  // console.log("Scrolled:", scrolledPosition);
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
    behavior: "smooth",
  });
}

// Get the elements
const githubIcon = document.getElementById("githubIcon");
const linkedinIcon = document.getElementById("linkedinIcon");

githubIcon.addEventListener("mouseenter", function () {
  this.querySelector("i").style.color = "#ffffff";
});

githubIcon.addEventListener("mouseleave", function () {
  this.querySelector("i").style.color = "#b2a4e0";
});

linkedinIcon.addEventListener("mouseenter", function () {
  this.querySelector("i").style.color = "#ffffff";
});

linkedinIcon.addEventListener("mouseleave", function () {
  this.querySelector("i").style.color = "#b2a4e0";
});
const allsubBut = document.getElementsByClassName("buttonSubmit");
const subBut = document.getElementById("submitForm");

subBut.addEventListener("click", (e) => {
  e.preventDefault();
  // submitForm();
  submitForms();
});

// Loop through the collection and add event listeners
for (let button of allsubBut) {
  button.addEventListener("mouseup", () => {
    button.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.3)";
  });

  button.addEventListener("mousedown", () => {
    button.style.boxShadow = "1px 1px 9px rgba(136, 111, 165, 0.9)";
  });
}

function ValidateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  const LoaderScreen = document.getElementById("loaderScreen");
  LoaderScreen.style.display = "flex";
  if (
    namevalue.trim() == "" ||
    emailvalue.trim() == "" ||
    msgvalue.trim() == ""
  ) {
    LoaderScreen.style.display = "none";
    // showAlert("First fill the required info");
    showToast("Error", "First fill the required info");
    console.log(
      namevalue.trim() == "" || emailvalue.trim() == "" || msgvalue.trim()
    );
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
    if (!ValidateEmail(emailvalue)) {
      LoaderScreen.style.display = "none";
      // showAlert("Invalid email address.");
      showToast("Error", "Invalid email address.");
      document.getElementById("email").focus();
      return; // Exit function if email is invalid
    }
    const bodyval = new URLSearchParams({
      fullname: namevalue,
      email: emailvalue,
      msg: msgvalue,
    });

    const reqOpt = {
      method: "POST",
      headers: myHeaders,
      body: bodyval.toString(),
    };

    fetch(sendingUrl, reqOpt)
      .then((response) => {
        if (!response.ok) {
          LoaderScreen.style.display = "none";
          if (response.status == 500) {
            // showAlert("Please check your internet connection");
            showToast("Error", "Please check your internet connection");
            throw new Error("Please check your internet connection");
          } else if (response.status == 400) {
            // showAlert("First fill the required info");
            showToast("Error", "First fill the required info");
            throw new Error("First fill the required info");
          } else {
            throw new Error("An unexpected error occurred");
          }
        }
        return response.json();
      })
      .then((response) => {
        LoaderScreen.style.display = "none";
        showToast("Success", "You have successfully send the msg");
        // showAlert("Successfully send");
        console.log(response.status); // Assuming response contains a status property
      })
      .catch((e) => {
        LoaderScreen.style.display = "none";
        // showAlert(`Please try again`);
        showToast("Error", "Please try again");
        console.error("Error in sending message:", e.message);
      });
  }
}
const toast = document.getElementById("toast"); // Changed to getElementById
const toastTopic = document.getElementById("toast-topic");
const toastMsg = document.getElementById("toast-msg");
const toastIcon = document.querySelector(".toast-content .icon");
const progressIndicator = document.getElementById("processIndicator");

// Variables to store timeout IDs
let toastTimeout, progressTimeout;

function showToast(topic, msg) {
  // Update the topic and message content
  toastTopic.textContent = topic;
  toastMsg.textContent = msg;

  // Reset progress animation
  progressIndicator.classList.remove("active");

  // Determine the type of toast and apply relevant styles
  if (topic.toLowerCase() === "success") {
    toast.classList.remove("toastWrong");
    progressIndicator.classList.remove("wrongprogress");
    progressIndicator.classList.add("progress");
    toastIcon.className = "icon fas fa-check check"; // Success icon
  } else {
    toast.classList.add("toastWrong");
    progressIndicator.classList.remove("progress");
    progressIndicator.classList.add("wrongprogress");
    toastIcon.className = "icon fas fa-xmark wrong"; // Error icon
  }

  // Show the toast
  toast.classList.add("active");

  // Trigger progress animation after a small delay
  setTimeout(() => {
    progressIndicator.classList.add("active");
  }, 50);

  // Automatically hide the toast after 5 seconds
  toastTimeout = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000);

  // Remove progress animation after it completes
  progressTimeout = setTimeout(() => {
    progressIndicator.classList.remove("active");
  }, 5300);
}

function hideToast() {
  // Immediately hide the toast and progress indicator
  toast.classList.remove("active");
  progressIndicator.classList.remove("active");

  // Clear timeouts to cancel automatic actions
  clearTimeout(toastTimeout);
  clearTimeout(progressTimeout);
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
