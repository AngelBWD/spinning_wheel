function luckyWheel() {
    let wheelArray = newGame()

    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.btnStart');
    const newgameButton = document.querySelector('.btnNewGame');
    const number = document.querySelector('.number');
    const digits = document.querySelector('.digits');
    newgameButton.style.display = "none";
    digits.innerHTML = [...wheelArray];



    let deg = 0
    startButton.addEventListener('click', () => {
        deg = 0
        startButton.style.pointerEvents = 'none';
        newgameButton.style.pointerEvents = 'block';
        console.log(wheelArray);
        shifted = wheelArray.shift(1);
        let sector = (shifted - 1) * 20;
        number.innerHTML = shifted;

        deg = ((Math.floor(Math.random() * 5) + 3) * 360) - (1 * sector - 8 + Math.floor((Math.random() * 18)));
        wheel.style.transition = 'all 5s ease-out';
        wheel.style.transform = `rotate(${deg}deg)`;
        wheel.classList.add('blur');
    });



    wheel.addEventListener('transitionend', () => {
        wheel.classList.remove('blur');
        if (wheelArray.length === 0) {
            newgameButton.style.display = 'block';
            newgameButton.style.pointerEvents = 'auto';
            startButton.style.display = 'none';
            wheel.style.transition = 'none';
        } else {
            startButton.style.display = 'auto';
            startButton.style.pointerEvents = 'auto';
            wheel.style.transition = 'none';
        }

        const actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;
    });

    newgameButton.addEventListener('click', () => {
        newgameButton.style.display = 'none';
        startButton.style.pointerEvents = 'auto';
        startButton.style.display = 'block';
        wheelArray = newGame()
        digits.innerHTML = [...wheelArray];
    });
}

luckyWheel()

function newGame() {
    let arr = [];

    while (arr.length < 7) {
        let r = Math.floor(Math.random() * 18) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }


    arr = arr.concat([...Array(2)].fill(arr[arr.length - 1]));
    arr.unshift(arr[0]);

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    let mixArr = [...arr];
    shuffle(mixArr);
    let newMixedArr = mixArr;

    let firstArr = [];
    let helper = [];
    let secondArr = [];
    let thirthArr = [];

    for (let i = 0; i < newMixedArr.length; i++) {
        if (i === 0) {
            firstArr.push(newMixedArr[i]);
        } else {
            if (newMixedArr[i] === newMixedArr[i - 1]) {
                helper.push(newMixedArr[i]);
            } else {
                firstArr.push(newMixedArr[i]);
            }
        }
    }

    for (let i = 0; i < helper.length; i++) {
        if (i === 0) {
            secondArr.push(helper[i]);
        } else {
            if (helper[i] === helper[i - 1]) {
                thirthArr.push(helper[i]);
            } else {
                secondArr.push(helper[i]);
            }
        }
    }

    let wheelArray = [];

    if (thirthArr.length === 1 && secondArr.length === 1 && firstArr[firstArr.length - 1] === secondArr[secondArr.length - 1]) {
        let index = Math.floor(Math.random() * 5) + 2;
        wheelArray = [...secondArr, ...firstArr];
        let thirthArrElement = thirthArr[0];
        wheelArray.splice(index, 0, thirthArrElement);
            
    } else if (secondArr[secondArr.length - 1] === thirthArr[thirthArr.length - 1]) {
        if ((secondArr[0] !== firstArr[firstArr.length - 1]) && (secondArr[0] !== firstArr[0])) {
            wheelArray = [...thirthArr, ...firstArr, ...secondArr];          
        } else if (thirthArr.length === 1 && secondArr.length === 1 && firstArr[0]  === secondArr[secondArr.length - 1]) {
            let index = Math.floor(Math.random() * 5) + 2;
            wheelArray = [...firstArr,...secondArr];
            let thirthArrElement = thirthArr[0];
            wheelArray.splice(index, 0, thirthArrElement);
        } else {
            wheelArray = [...thirthArr, ...secondArr, ...firstArr];
        }
    } else {
        if (secondArr[0] !== firstArr[firstArr.length - 1]) {
            wheelArray = [...firstArr, ...secondArr, ...thirthArr];
        } else {
            if (thirthArr.length < 1) {
                wheelArray = [...secondArr, ...firstArr, ...thirthArr];
            } else {
                wheelArray = [...firstArr, ...secondArr, ...thirthArr];
            }
        }
    }

    return wheelArray
}