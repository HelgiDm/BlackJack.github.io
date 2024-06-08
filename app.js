const cardRandom = {
  deck: [],
  suits: ['hearts', 'diamonds', 'spades', 'clubs'],
  values: '6,7,8,9,10,J,Q,K,A',
  image: {"6Hearts": "images/6_of_hearts.png", "7Hearts": "images/7_of_hearts.png",
  "8Hearts":"images/8_of_hearts.png", "9hearts":"images/9_of_hearts.png", "10Hearts":"images/10_of_hearts.png",
  "jackHearts":"images/jack_of_hearts2.png", "queenHearts":"images/queen_of_hearts2.png", "kingHearts":"images/king_of_hearts2.png", "aceHearts":"images/ace_of_hearts.png", "6Diamonds":"images/6_of_diamonds.png", '7Diamonds': "images/7_of_diamonds.png", '8Diamonds':"images/8_of_diamonds.png", '9Diamonds':"images/9_of_diamonds.png", '10Diamonds':"images/10_of_diamonds.png", 'jackDiamonds':"images/jack_of_diamonds2.png", 'queenDiamonds':"images/queen_of_diamonds2.png", 'kingDiamonds':"images/king_of_diamonds2.png", 'aceDiamonds':"images/ace_of_diamonds.png",
  '6Clubs':"images/6_of_clubs.png", '7Clubs':"images/7_of_clubs.png", '8Clubs':"images/8_of_clubs.png", '9Clubs':"images/9_of_clubs.png", '10Clubs':"images/10_of_clubs.png", 'jackClubs':"images/jack_of_clubs2.png", 'queenClubs':"images/queen_of_clubs2.png", 'kingClubs':"images/king_of_clubs2.png", 'aceClubs':"images/ace_of_clubs.png", '6Spades':"images/6_of_spades.png", '7Spades':"images/7_of_spades.png", '8Spades':"images/8_of_spades.png", '9Spades':"images/9_of_spades.png", '10Spades':"images/10_of_spades.png", 'jackSpades':"images/jack_of_spades2.png", 'queenSpades':"images/queen_of_spades2.png", 'kingSpades':"images/king_of_spades2.png", 'aceSpades':"images/ace_of_spades.png"},

        makeDeck() {
          let {deck, suits, values} = this;
          let n = 0;
          for (let suit of suits) {
              for (let value of values.split(',')) {
                  deck.push({
                      value,
                      suit,
                      img: Object.values(this.image)[n]
              });
              n += 1;
              }
      }
      return deck;
      },

      drawCard() {
          let yourCard = this.deck[Math.floor(Math.random() * this.deck.length)];
          this.deck.splice(this.deck.indexOf(yourCard), 1);
          yourPick.push(yourCard);
          return yourCard
      },
      vizual() {
          const cardImg = document.createElement('img');
          cardImg.src = this.drawCard().img;
          document.querySelector('.field').append(cardImg);
      },
      vizualCardBack() {
          let n = 0;
          while (n <= 36) {
              const cardBack = document.createElement('img');
              cardBack.src = 'https://github.com/HelgiDm/JS_Project_BlackJack/blob/master/images/cardBack.png?raw=true';
              cardBack.style.top = `${0 - n * 0.05}vh`;
              cardBack.style.left = `${6 - n * 0.05}vw`;
              document.querySelector('.card-back').append(cardBack);
              n += 1;
          }
      },
      vizualDlr() {
          dlrBack = document.createElement('img');
          dlrBack.src = 'https://github.com/HelgiDm/JS_Project_BlackJack/blob/master/images/cardBack.png?raw=true';
          document.querySelector('.dlr-field').append(dlrBack);
      },
      score: [],
      sumPick(card) {
              if (isNaN(Number(card.value))) {
                  if (Object.values(card).includes('J')) {
                  this.score.push(2);
                  return 2
                  }
                  else if (Object.values(card).includes('Q')) {
                  this.score.push(3);
                  return 3
                  }
                  else if (Object.values(card).includes('K')) {
                  this.score.push(4);
                  return 4
                  }
                  else if (Object.values(card).includes('A')) {
                      if (this.score.includes(11)) {
                          this.score.push(10);
                          return 10
                      }
                      else {
                          this.score.push(11);
                          return 11
                      }
                  }
              }
              else {
              this.score.push(Number(card.value));
              return Number(card.value)
              }
      },

      pickCard() {
          let newCard = this.deck[Math.floor(Math.random() * this.deck.length)];
          this.deck.splice(this.deck.indexOf(newCard), 1);
          yourPick.push(newCard);
          return newCard
      },

      dealerScore() {
          let dlrScore = this.score.reduce((a, b) => {return a + b});
          return dlrScore;
      },

      dealerTurn() {
          let active = true;
          if (this.dealerScore() >= 20) {
              active = false
          }
          else if (this.dealerScore() === 19) {
              let chance = Math.floor(Math.random() * 9 + 1);
              console.log(chance);
              if (chance === 9) {
                  this.sumPick(this.drawCard())
                  active = false
              }
              else {active = false}
          }
          else if (this.dealerScore() === 18) {
              let chance = Math.floor(Math.random() * 5 + 1);
              console.log(chance);
              if (chance === 5) {
                  this.sumPick(this.drawCard())
                  active = false
              }
              else {active = false}
          }
          else if (this.dealerScore() === 17 || this.dealerScore() === 16) {
              let chance = Math.floor(Math.random() * 3 + 1);
              console.log(chance);
              if (chance === 3) {
                  this.sumPick(this.drawCard());
                  active = false
              }
              else {active = false}
          }
          else {
              this.sumPick(this.drawCard());
          }
          return active
          },

      result() {
          if (curScore === 21) {return 'You won!'}
          else if ((curScore < 21 || curScore > 21) && this.dealerScore() === 21) {return 'You lose!'}
          else if (curScore < 21 && curScore > this.dealerScore()) {return 'You won!'}
          else if (this.dealerScore() < 21 && curScore < this.dealerScore()) {return 'You lose!'}
          else if (curScore > 21 && this.dealerScore() < 21) {return 'You lose!'}
          else if (curScore < 21 && this.dealerScore() > 21) {return 'You won!'}
          else {return 'You won!'}
      }

}

// Making cards deck with card back picture
cardRandom.vizualCardBack()

//Start-Game Button
let hints = document.querySelector('.hints');
let hint = hints.querySelector('div');
hints.addEventListener('click', () => {hints.style.display = 'none'});
let curScore = 0;
let yourPick = [];
const scoreNumb = document.getElementById('numb');
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    if (!yourPick.length) {
        cardRandom.makeDeck();
        cardRandom.vizual();
        cardRandom.vizual();
        for (i of yourPick) {
            cardRandom.sumPick(i)
        }
        curScore = cardRandom.score.reduce((a, b) => {return a + b});
        scoreNumb.innerText = curScore;
        document.querySelector('.card-back').lastElementChild.remove();
        document.querySelector('.card-back').lastElementChild.remove();

//        console.log(yourPick,`current score: ${curScore}`);
    }
    else {
      hint.innerText = 'Game is already started!';
      hints.style.display = 'block';
    }
});

//Pick-Card Button
const pickCard = document.getElementById('pick-card');
pickCard.addEventListener('click', () => {
    if (document.querySelector('#dlr-numb').innerText !== '0') {
      hint.innerText = "You've already made your turn";
      hints.style.display = 'block';
    }
    else if (yourPick.length) {
        const cardImg = document.createElement('img');
        cardImg.src = cardRandom.pickCard().img;
        document.querySelector('.field').append(cardImg);
        curScore = curScore + cardRandom.sumPick(yourPick[yourPick.length - 1]);
        scoreNumb.innerText = curScore;
        document.querySelector('.card-back').lastElementChild.remove();
//        console.log(yourPick,`current score: ${parseInt(yourPick)}`)
    }
    else {
      hint.innerText = 'You need to click on the "Click to start!" button or on the Deck first';
      hints.style.display = 'block';    }
})

// The same with clicking on the card deck
document.querySelector('.card-back').addEventListener('click', () => {
    if (yourPick.length) {
        const cardImg = document.createElement('img');
        cardImg.src = cardRandom.pickCard().img;
        document.querySelector('.field').append(cardImg);
        curScore = curScore + cardRandom.sumPick(yourPick[yourPick.length - 1]);
        scoreNumb.innerText = curScore;
        document.querySelector('.card-back').lastElementChild.remove();
    }
    else {
        cardRandom.makeDeck();
        cardRandom.vizual();
        cardRandom.vizual();
        for (i of yourPick) {
            cardRandom.sumPick(i)
        }
        curScore = cardRandom.score.reduce((a, b) => {return a + b});
        scoreNumb.innerText = curScore;
        document.querySelector('.card-back').lastElementChild.remove();
        document.querySelector('.card-back').lastElementChild.remove();
    }
})

//Reset Button
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    cardRandom['deck'] = [];
    document.querySelector('.card-back').innerHTML = '';
    cardRandom.vizualCardBack();
    cardRandom['score'] = [];
    scoreNumb.innerText = 0;
    document.querySelector('#dlr-numb').innerText = '0';
    document.querySelector('.field').innerHTML = '';
    document.querySelector('.dlr-field').innerHTML = '';
    yourPick = [];
})

// Rules Button
const rulButton = document.querySelector('#rules');
let rules = document.querySelector('.rules');
rulButton.addEventListener('click', () => {
  rules.style.display = 'block'
});
rules.addEventListener('click', () => {
  rules.style.display = 'none'
});

//Finish Button
const finButton = document.querySelector('#fin');
let yourResult = document.querySelector('.result div');
let resultWindow = document.querySelector('.result');
finButton.addEventListener('click', () => {
    if (!yourPick.length) {
      hint.innerText = 'You need to click on the "Click to start!" button or on the Deck first';
      hints.style.display = 'block';    }

    else if (document.querySelector('#dlr-numb').innerText === '0') {
        cardRandom.score = [];
        yourPick = [];
        cardRandom.sumPick(cardRandom.drawCard());
        document.querySelector('.card-back').lastElementChild.remove();
        cardRandom.vizualDlr();
        cardRandom.sumPick(cardRandom.drawCard());
        document.querySelector('.card-back').lastElementChild.remove();
        cardRandom.vizualDlr();
        console.log(cardRandom.score);
        console.log(cardRandom.dealerScore());
        while (cardRandom.dealerTurn() === true) {
            cardRandom.dealerTurn();
            document.querySelector('.card-back').lastElementChild.remove();
            cardRandom.vizualDlr();
        }
        console.log(cardRandom.score);
        console.log(cardRandom.dealerScore());
        setTimeout(() => {
            document.querySelector('.dlr-field').innerHTML = '';
                for (card of yourPick) {
                    let dlrImg = document.createElement('img');
                    dlrImg.src = card.img;
                    document.querySelector('.dlr-field').append(dlrImg);
                };
              document.querySelector('#dlr-numb').innerText = cardRandom.dealerScore();
            setTimeout(() => {
              yourResult.innerText = cardRandom.result();
              resultWindow.style.display = 'block';
              resultWindow.style.backgroundColor = '#00000080'
            }, '2000');
        }, '2000');
          resultWindow.addEventListener('click', () => {
            yourResult.innerText = '';
            resultWindow.style.display = 'none';
            resultWindow.style.backgroundColor = 'transparent';
            // Like to press 'Reset Button'
            cardRandom['deck'] = [];
            document.querySelector('.card-back').innerHTML = '';
            cardRandom.vizualCardBack();
            cardRandom['score'] = [];
            scoreNumb.innerText = 0;
            document.querySelector('#dlr-numb').innerText = '0';
            document.querySelector('.field').innerHTML = '';
            document.querySelector('.dlr-field').innerHTML = '';
            yourPick = [];
          })
    }
    else {
      hint.innerText = 'Dealer has already made a turn';
      hints.style.display = 'block';
    }
})
