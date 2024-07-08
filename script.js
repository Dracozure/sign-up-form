const inputs = document.querySelectorAll('input');
let wordLists = [
    ["Ex: Marley", "Ex: Bob", "Ex: Audrey", "Ex: Jacob", "Ex: Allen"],
    ["Ex: Anderson", "Ex: Walker", "Ex: Nguyen", "Ex: Garcia", "Ex: Johnson"],
    ["example1@gmail.com", "ex2.mpl@yahoo.com", "exmpl3@college.edu"],
    ["123-456-7890", "1234567890"]
];
let animationIteration = 0;

const inputTipFirst = document.querySelector('.input-tip.first');
const inputTipLast = document.querySelector('.input-tip.last');
const inputTipEmail = document.querySelector('.input-tip.email');
const inputTipPhone = document.querySelector('.input-tip.phone');

inputTipFirst.setAttribute('data-after', wordLists[0][0]);
inputTipLast.setAttribute('data-after', wordLists[1][0]);
inputTipEmail.setAttribute('data-after', wordLists[2][0]);
inputTipPhone.setAttribute('data-after', wordLists[3][0]);

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        const inputTipElement = input.parentElement.querySelector('.input-tip');

        inputTipElement.classList.add('active');
    });

    input.addEventListener('focusout', () => {
        const inputTipElement = input.parentElement.querySelector('.input-tip');

        inputTipElement.classList.remove('active');
        animationIteration = 0;
    });

    input.parentElement.querySelector('.input-tip').addEventListener('animationiteration', (event) => {
        const inputTipElement = input.parentElement.querySelector('.input-tip');
        const inputTipContent = inputTipElement.getAttribute('data-after');
        const inputTipArr = wordLists.filter(arr => arr.includes(inputTipContent))[0];
        const index = (inputTipArr.indexOf(inputTipContent) + 1 === inputTipArr.length) ? 0 
        : inputTipArr.indexOf(inputTipContent) + 1;

        if (event.animationName !== 'typing') {
            return;
        }

        if (animationIteration % 2 === 0) {
            inputTipElement.setAttribute('data-after', `${inputTipArr[index]}`);
        }

        animationIteration++;
    });
});