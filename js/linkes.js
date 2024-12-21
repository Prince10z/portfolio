document.querySelector('a[href="#about"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default action of the link

    const targetElement = document.getElementById('about'); // Get the target element
    const offset = targetElement.offsetTop - 100; // Get the offset of the target element from the top of the page

    // Scroll to the target element with smooth behavior
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
})
document.querySelector('a[href="#"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default action of the link

    const targetElement = document.getElementsByClassName('headers'); // Get the target element
    const offset = targetElement[0].offsetTop; // Get the offset of the target element from the top of the page

    // Scroll to the target element with smooth behavior
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
})

document.querySelector('a[href="#contact"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default action of the link
    const targetElement = document.getElementById('contact');
    const offset = targetElement.offsetTop;// Get the offset of the target element from the top of the page

    // Scroll to the target element with smooth behavior
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
})