let incorrectCount = 0;
let password = null;
let correctLetters = [];
let incorrectLetters = [];
let totalLives = 6;
let alphabet = document.querySelector('#alphabet');
let passwordDiv = document.querySelector('#board');  
let word = document.getElementById('word');
let backdrop = document.getElementById('backdrop');
let finalMsg = document.getElementById('final-msg');
let msgInfo = document.getElementById('msg-info');
let playBtn = document.getElementById('play');
let indication = document.querySelector('.indication');
let bodyParts = document.querySelectorAll('.body-part');
let lives = document.querySelector('#lives');

let btn = document.querySelector('.btn-primary');
btn.addEventListener('click', (e) =>{ 
    let btnsHTML = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => 
        `<button id = '` + letter + `' class = "letter">`
        + letter + `</button>`
    ).join('');
    document.querySelector('.keyboard').innerHTML = btnsHTML; 
    btn.style.display = 'none';
    lives.innerText = 'Lives you have: ' + totalLives;

    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(items =>{
            password = items[Math.floor(Math.random() * items.length)].toUpperCase();
            console.log(password);
        for (let i = 0; i < password.length; i++) {
            let listItem = document.createElement('li');
            listItem.classList.add('letter');
            word.append(listItem);
        }
        alphabet.addEventListener('click', (e)=>{
            let letterElements = document.querySelectorAll('.word .letter');
            let character = e.target.innerText;
            
            if(password.includes(character)){
                if (correctLetters.includes(character)) {
                displayIndication();
                }   
                else {
                    correctLetters.push(character);
                    let indexes = [];
                    [...password].forEach((value, index) => {
                        if (value === character) {
                        indexes.push(index);
                        }
                    });
                    indexes.forEach((value) => {
                    letterElements[value].textContent = character;
                    });
                }
            }
            else {
                if (incorrectLetters.includes(character)) {
                    displayIndication();
                } else {
                    incorrectLetters.push(character);
                    updateFigure();
                    totalLives--;
                    lives.innerText = 'Lives you have: ' + totalLives;
                }  
            }    
        let formedWord = '';
        letterElements.forEach((value) => {
            formedWord += value.textContent;
        }); 
        if (formedWord === password) {
            successState();
        }
        if (incorrectCount >= 6) {
            failureState();
        }
        });
        });   
    });
function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 3000);
}   
function updateFigure() {
   try {
    bodyParts[incorrectCount].style.display = 'block';
    incorrectCount++;
  } catch (error) {}
}     
function successState() {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = 'Congratulations! You won! ';
}
function failureState() { 
    setTimeout(() => {
    backdrop.classList.add('visible');
    finalMsg.classList.add('visible');
    msgInfo.textContent = 'You lost! Try again. The right word is ' + password;
  }, 500);    
}


playBtn.addEventListener('click', (e) =>{
    let reload = location.reload();
});


