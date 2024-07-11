const inputs = document.querySelectorAll('input');
let wordLists = [
    ["Ex: Marley", "Ex: Bob", "Ex: Audrey", "Ex: Jacob", "Ex: Allen"],
    ["Ex: Anderson", "Ex: Walker", "Ex: Nguyen", "Ex: Garcia", "Ex: Johnson"],
    ["example1@gmail.com", "ex2.mpl@yahoo.com", "exmpl3@college.edu"],
    ["123-456-7890", "1234567890"]
];
let animationIteration = 0;

const themeSwitchButton = document.querySelector('.theme-mode');
const dayModeElement = document.querySelector('.day-mode');
const nightModeElement = document.querySelector('.night-mode');

themeSwitchButton.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('dark')) {
        dayModeElement.style.setProperty('opacity', 0);
        nightModeElement.style.setProperty('opacity', 1);

        toggleTitleTheme('night')
    } else {
        dayModeElement.style.setProperty('opacity', 1);
        nightModeElement.style.setProperty('opacity', 0);

        toggleTitleTheme('day')
    }

    themeSwitchButton.classList.toggle('dark');
    document.documentElement.classList.toggle('dark');
});

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

    input.addEventListener('input', (event) => {
        const input = event.target;
        const inputTipElement = input.parentElement.querySelector('.input-tip');
        const requiredELement = input.hasAttribute('required');
        const inputType = input.id;

        if (inputType === 'pwd') {
            updatePassWarning();
            updatePasswordMatchCheck();
        }

        if (inputType === 'confirm-pwd') {
            updatePasswordMatchCheck();
        }

        if (input.validity.valid) {
            if (requiredELement || !(input.value === '')) {
                inputTipElement.classList.remove('active');
                animationIteration = 0;
            }
        } else if (!inputTipElement.classList.contains('active')) {
            inputTipElement.classList.add('active');
        }
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

function updatePassWarning() {
    const inputWarningPass = document.querySelector('.input-warning.pass');
    const inputStrArr = document.getElementById('pwd').value.split('');
    const regexPatternLower = new RegExp("[a-z]");
    const regexPatternUpper = new RegExp("[A-Z]");
    const regexPatternNumber = new RegExp("[0-9]");
    const regexPatternSpecialChar = new RegExp("[A-Za-z0-9]");
    const checkMarkUrl = 'url(./assets/img/checkmark.png)';
    const crossmarkUrl = 'url(./assets/img/crossmark.png)';

    const hasLower = inputStrArr.filter(letter => regexPatternLower.test(letter)).length !== 0;
    const hasUpper = inputStrArr.filter(letter => regexPatternUpper.test(letter)).length !== 0;
    const hasNumber = inputStrArr.filter(letter => regexPatternNumber.test(letter)).length !== 0;
    const hasSpecialChar = inputStrArr.filter(letter => !regexPatternSpecialChar.test(letter)).length !== 0;
    const atLeast8Chars = inputStrArr.length >= 8;

    if (hasLower) {
        inputWarningPass.style.setProperty('--warning-pass-lower', checkMarkUrl)
    } else {
        inputWarningPass.style.setProperty('--warning-pass-lower', crossmarkUrl)
    } 

    if (hasUpper) {
        inputWarningPass.style.setProperty('--warning-pass-upper', checkMarkUrl)
    } else {
        inputWarningPass.style.setProperty('--warning-pass-upper', crossmarkUrl)
    } 

    if (hasNumber) {
        inputWarningPass.style.setProperty('--warning-pass-num', checkMarkUrl)
    } else {
        inputWarningPass.style.setProperty('--warning-pass-num', crossmarkUrl)
    } 

    if (hasSpecialChar) {
        inputWarningPass.style.setProperty('--warning-pass-special-char', checkMarkUrl)
    } else {
        inputWarningPass.style.setProperty('--warning-pass-special-char', crossmarkUrl)
    } 

    if (atLeast8Chars) {
        inputWarningPass.style.setProperty('--warning-pass-min-chars', checkMarkUrl);
    } else {
        inputWarningPass.style.setProperty('--warning-pass-min-chars', crossmarkUrl);
    } 
}

function updatePasswordMatchCheck() {
    const inputPass = document.getElementById('pwd');
    const inputPassConfirm = document.getElementById('confirm-pwd');

    if (inputPassConfirm.value === '' || (inputPass.value === inputPassConfirm.value)) {
        inputPassConfirm.setCustomValidity('');
    } else {
        inputPassConfirm.setCustomValidity('Passwords do not match');
    }
}

function toggleTitleTheme(mode) {
    const titleSpan1 = document.querySelector('.title-span-1');
    const titleSpan2 = document.querySelector('.title-span-2');
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const titleSpan1VOrgValue = (mode === 'day') ? 'All day' : 'All night';
    const titleSpan2VOrgValue = (mode === 'day') ? 'Everyday' : 'Every night';
    const titleSpan1Length = (mode === 'day') ? 7 : 9;
    const titleSpan2Length = (mode === 'day') ? 8 : 11;


    let titleSpan1Iterations = 0;
    let titleSpan2Iterations = 0;

    const titleSpan1Int = setInterval(() => {
        if (titleSpan1Iterations === titleSpan1Length) {
            clearInterval(titleSpan1Int);
        }

        titleSpan1.innerText = titleSpan1VOrgValue.split('')
        .map((letter, index) => {
            if (titleSpan1Iterations > index) {
                return titleSpan1VOrgValue[index];
            }
            
            return alphabet[Math.floor(Math.random() * 26)]
        }).join('') + '.';

        titleSpan1Iterations += 1;
    }, 25);


    const titleSpan2Int = setInterval(() => {
        if (titleSpan2Iterations === titleSpan2Length) {
            clearInterval(titleSpan2Int);
        }

        titleSpan2.innerText = titleSpan2VOrgValue.split('')
        .map((letter, index) => {
            if (titleSpan2Iterations > index) {
                return titleSpan2VOrgValue[index];
            }
            
            return alphabet[Math.floor(Math.random() * 26)]
        }).join('') + '.';

        titleSpan2Iterations += 1;
    }, 25);
}