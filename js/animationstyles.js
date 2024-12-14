var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".typewrite > .wrap { background: none; border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
// Select the link element (replace with your selector if needed)
const link = document.querySelector(".typewrite");

// Add a click event listener
link.addEventListener("click", (event) => {
  // Prevent default link behavior (following the href)
  event.preventDefault();

  // You can optionally add your own functionality here (e.g., console.log("Link clicked!"))
});
function animateIntroText() {
  const introText = document.getElementById("intro");
  const introbody =
    "I am an experienced software designer and developer, specializing in Flutter and the MERN stack. With a strong track record of solving complex problems, I have successfully delivered a wide range of projects by translating intricate requirements into effective solutions. I am passionate about tackling new challenges and leveraging emerging technologies to create impactful solutions that evolve with changing demands.";

  // Split the intro text into individual words
  const words = introbody.split(" ");

  // Clear existing content in the intro section
  introText.innerHTML = "";

  // Wrap each word in a span element with custom class and append it to the intro section
  words.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.classList.add("intro-word"); // Add custom class for animation
    introText.appendChild(span);
  });

  // Add fade-in class to each intro-word span element to trigger animation
  introText.querySelectorAll(".intro-word").forEach((word, index) => {
    // Calculate delay for each word based on index
    const delay = (index + 1) * 100; // Adjust the delay as needed

    // Add fade-in class with delay to each word
    setTimeout(() => {
      word.classList.add("fade-in");
    }, delay);
  });
}

// Check if intro section is visible on the screen
function isElementVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// Function to handle scroll event
function handleScroll() {
  const introSection = document.getElementById("intro");
  if (isElementVisible(introSection)) {
    animateIntroText();
    // Remove scroll event listener after animation is triggered to avoid multiple animations
    window.removeEventListener("scroll", handleScroll);
  }
}

// Add scroll event listener to trigger animation when intro section becomes visible
window.addEventListener("scroll", handleScroll);
