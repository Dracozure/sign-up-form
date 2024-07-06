const inputs = document.querySelectorAll('input');

inputs.forEach(element => {
    element.addEventListener('focus', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');

        setTimeout(() => {
            tipElement.classList.toggle('active');
            setTimeout(() => {
                toggleInputTips(tipElement);
            }, 4000);
        }, 1000);
    });
    element.addEventListener('focusout', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');

        tipElement.classList.toggle('active');
    });
});

let toggle = "delete";
let strCounter = 0;
let myList = ["Marley", "Bob", "Kevin"];
let counter = 0;

function toggleInputTips(element) {
    if (toggle === "delete") {
        setTimeout(() => {
            element.textContent = element.textContent.slice(0,-1);

            if (element.textContent.length === 4) {
                toggle = "add";
    
                strCounter = (strCounter === myList.length - 1) ? 0 : strCounter + 1;

                setTimeout(() => {
                    toggleInputTips(element);
                }, 700);
            } else {
                toggleInputTips(element);
            }
        }, 70);
    }

    if (toggle === "add") {
        setTimeout(() => {
            const str = myList[strCounter];
            const completeStr = myList.includes(element.textContent.split(" ")[1]);
    
            if (!completeStr) {
                element.textContent = element.textContent + str[counter];
                counter++;

                toggleInputTips(element);
            } else {
                toggle = "delete";
                counter = 0;
                
                setTimeout(() => {
                    toggleInputTips(element);
                }, 2500);
            }
        }, 70);
    }
}