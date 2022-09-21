/*
const suits = ["♠", "♣", "♥", "♦"]; //creating global variable for the suits
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
]; // creating global variable for the values

class Deck {
  // creating a class for our deck of cards
  constructor(cards = freshDeck()) {
    //passing cards in the constructor
    this.cards = cards;
       }

       get numberOfCards() {
        return this.cards.length
    }


    shuffle()  { 
       for (let i = this.numberOfCards - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = this.cards[newIndex]
        this.cards[newIndex] = this.cards[i]
        this.cards[i] = oldValue 
      }
    }
 }


class card {
  //creating class for the cards
  constructor(suit, value) {
    //each card has a suit and value. We pass a suit and value into the constructor
    this.suit = suit;
    this.value = value;
  }
}

function freshDeck() {                 //Creating fresh deck of cards with 52 cards with all the suits and value combination
   return suits.flatMap(suite => {     //Loop through all the suites and all the values and combine them into one array flatMap the same like map function but combines multiple arrays in one single array
    return values.map(value => {       //loop through all the values and map them into array
        return new card(suite, value)
     
    
    })
})                            
}
*/
const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }

  get numberOfCards() {
    return this.cards.length
  }

  pop() {
    return this.cards.shift()
  }

  push(card) {
    this.cards.push(card)
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
  }

  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }
  
  const computerCardSlot = document.querySelector(".computer-card-slot")
  const playerCardSlot = document.querySelector(".player-card-slot")
  const computerDeckElement = document.querySelector(".computer-deck")
  const playerDeckElement = document.querySelector(".player-deck")
  const text = document.querySelector(".text")
  
  let playerDeck, computerDeck, inRound, stop
  
  document.addEventListener("click", () => {
    if (stop) {
      startGame()
      return
    }
  
    if (inRound) {
      cleanBeforeRound()
    } else {
      flipCards()
    }
  })
  
  startGame()
  function startGame() {
    const deck = new Deck()
    deck.shuffle()
  
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false
    stop = false
  
    cleanBeforeRound()
  }
  
  function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""
  
    updateDeckCount()
  }
  
  function flipCards() {
    inRound = true
  
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
  
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
  
    updateDeckCount()
  
    if (isRoundWinner(playerCard, computerCard)) {
      text.innerText = "Win"
      playerDeck.push(playerCard)
      playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
      text.innerText = "Lose"
      computerDeck.push(playerCard)
      computerDeck.push(computerCard)
    } else {
      text.innerText = "Draw"
      playerDeck.push(playerCard)
      computerDeck.push(computerCard)
    }
  
    if (isGameOver(playerDeck)) {
      text.innerText = "You Lose!!"
      stop = true
    } else if (isGameOver(computerDeck)) {
      text.innerText = "You Win!!"
      stop = true
    }
  }
  
  function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
  }
  
  function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
  }
  
  function isGameOver(deck) {
    return deck.numberOfCards === 0
  }


