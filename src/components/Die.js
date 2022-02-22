import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceOne, faDiceTwo, faDiceThree, 
    faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons'

export default function Die(props) {

    const diceDict = {
        1: faDiceOne,
        2: faDiceTwo,
        3: faDiceThree,
        4: faDiceFour,
        5: faDiceFive,
        6: faDiceSix
    }

    const styles = {
        backgroundColor: props.isHeld ? "white" : "#59E391",
        color: props.isHeld ? "#59E391" : "black"
    }

    return (
        <div 
            className="die-face"
            style={styles}
            onClick={props.holdDie}
        >
            <FontAwesomeIcon className='die-face-new' style={styles} icon={diceDict[props.value]} />
            {/* <h2 className="die-num">{props.value}</h2> */}
        </div>
    )
}
