import React, {useEffect, useState} from 'react'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import Confetti from 'react-confetti'
import diceRollGif from './assets/dice-roll.gif'

function App() {

  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const firstValue = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const sameValue = dice.every(die => die.value === firstValue)

    if(allHeld && sameValue){
      setTenzies(true)
    }

  }, [dice])

  function generateNewDice(){
    return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const newDice = []
    for(let i = 0; i< 10; i++){
      newDice.push(generateNewDice())
    }
    return newDice
  }

  function rollDice() {
    if(tenzies){

      setTenzies(false)
      setDice(allNewDice())

    } else{
      
      setDice(dice.map(die => (
        die.isHeld ? die : generateNewDice()
      )))
    }
    
  }

  function holdDie(id){
    setDice(dice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElement = dice.map(die => {
    return(
      <Die 
        key = {die.id}
        value = {die.value}
        isHeld = {die.isHeld}
        holdDie = {() => holdDie(die.id)}
      />
    )
  })
  const styles = {
    color: true ? "#59E391" : "white"
}

  return (
    <div className="home-page-wrapper">
      <div>
        <img className="dice-gif" alt="A gif of rolling dice" src={diceRollGif}></img>
      </div>
      <main>
        { tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p> 
        <div className="dice-container">
          {diceElement}
        </div>   
        <button 
          className="roll-dice"
          onClick={rollDice}
        >
          {tenzies ? 'New Game' : 'Roll'} 
        </button>
      </main>
    </div>

  );
}

export default App;
