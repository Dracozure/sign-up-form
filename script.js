const inputs = document.querySelectorAll('input');
let wordLists = [
    ["Marley", "Bob", "Kevin", "Jacob", "Allen"],
    ["Anderson", "Walker", "Nguyen", "Garcia", "Taylor"],
    ["ample1@gmail.com", "mpl2@yahoo.com", "mpl3@college.edu"],
    ["123-456-7890", "1234567890"]
];

inputs.forEach(element => {
    element.addEventListener('focus', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');
        const elementId = element.id;
        let index;

        switch (elementId) {
            case "first":
                index = 0;
                break;
            case "last":
                index = 1;
                break;
            case "email":
                index = 2;
                break; 
            case "phone":
                index = 3;
                break;
            default: return;
        }

        tipElement.classList.add('active');

        setTimeout(() => {
            setTimeout(() => {
                toggleInputTips(tipElement, "delete", 0, 0, wordLists[index]);
            }, 4000);
        }, 5000);
    });

    element.addEventListener('focusout', () => {
        const tipElement = element.parentElement.querySelector('.input-tip');
        const elementId = element.id;
        let index;

        switch (elementId) {
            case "first":
                index = 0;
                break;
            case "last":
                index = 1;
                break;
            case "email":
                index = 2;
                break; 
            case "phone":
                index = 3;
                break;
            default: return;
        }
        
        tipElement.classList.remove('active');

        setTimeout(() => {
            tipElement.textContent = (wordLists[index][0].includes('@'))
            ? `ex${wordLists[index][0]}`
            : `Ex: ${wordLists[index][0]}`;
        }, 800);
    });
});

function toggleInputTips(element, toggle, strCounter, counter, strList) {

    if (!element.classList.contains('active')) {
        return;
    }

    if (toggle === "delete") {
        setTimeout(() => {
            const endStrDelete = 
            (element.textContent.includes("Ex") && element.textContent.length === 4)
            || element.textContent.length === 2;

            if (endStrDelete) {
                toggle = "add";
    
                strCounter = (strCounter === strList.length - 1) ? 0 : strCounter + 1;

                setTimeout(() => {
                    toggleInputTips(element, toggle, strCounter, counter, strList);
                }, 700);
            } else {
                element.textContent = element.textContent.slice(0,-1);

                toggleInputTips(element, toggle, strCounter, counter, strList);
            }
        }, 70);
    }

    if (toggle === "add") {
        setTimeout(() => {
            const str = strList[strCounter];
            const completeStr = (element.textContent.includes("Ex")) 
            ? strList.includes(element.textContent.split(" ")[1])
            : strList.includes(element.textContent.slice(2));
    
            if (completeStr) {

                toggle = "delete";
                counter = 0;
                
                setTimeout(() => {
                    toggleInputTips(element, toggle, strCounter, counter, strList);
                }, 7000);
            } else {

                element.textContent = element.textContent + str[counter];
                counter++;

                toggleInputTips(element, toggle, strCounter, counter, strList);
            }
        }, 70);
    }
}