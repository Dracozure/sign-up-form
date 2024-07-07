const inputs = document.querySelectorAll('input');
let wordLists = [
    ["Marley", "Bob", "Kevin", "Jacob", "Allen"],
    ["Anderson", "Walker", "Nguyen", "Garcia", "Taylor"],
    ["example1@gmail.com", "exmpl2@yahoo.com", "exmpl3@college.edu"],
    ["123-456-7890", "1234567890"]
];

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        inputTipElement = input.parentElement.querySelector('.input-tip');

        inputTipElement.classList.add('active');
    });

    input.addEventListener('focusout', () => {
        inputTipElement = input.parentElement.querySelector('.input-tip');

        inputTipElement.classList.remove('active');
    });
});