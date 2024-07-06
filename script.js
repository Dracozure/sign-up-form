const inputs = document.querySelectorAll('input');

inputs.forEach(element => {
    element.addEventListener('focus', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');

        tipElement.classList.toggle('active');
    });
    element.addEventListener('focusout', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');

        tipElement.classList.toggle('active');
    });
});