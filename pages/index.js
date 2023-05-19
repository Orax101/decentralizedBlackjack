import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function App() {
  const [playerName, setPlayerName] = useState('');
  const [playerChips, setPlayerChips] = useState(143);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerSum, setPlayerSum] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerSum, setDealerSum] = useState(0);
  const [isDealerTurn, setIsDealerTurn] = useState(false);
  const [hasBlackjack, setHasBlackjack] = useState(false);
  const [isPlayerAlive, setIsPlayerAlive] = useState(false);
  const [message, setMessage] = useState('Do you want to play around?');
  const [seconds, setSeconds] = useState(300);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

 

  function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
      return 10;
    } else if (randomNumber === 1) {
      return 11;
    } else {
      return randomNumber;
    }
  }

  function startGame() {
    setIsPlayerAlive(true);
    setIsDealerTurn(false);
    setPlayerSum(0);
    setDealerSum(0);
    setHasBlackjack(false);
    setPlayerCards([]);
    setDealerCards([]);
    let firstPlayerCard = getRandomCard();
    let secondPlayerCard = getRandomCard();
    setPlayerCards([firstPlayerCard, secondPlayerCard]);
    setPlayerSum(firstPlayerCard + secondPlayerCard);
   let firstDealerCard = getRandomCard();
let secondDealerCard = getRandomCard();
setDealerCards([firstDealerCard, secondDealerCard]);
setDealerSum(firstDealerCard + secondDealerCard);

    setMessage('Do you want to draw a new card?');
  }

  function newCard() {
    if (isPlayerAlive === true && hasBlackjack === false) {
      let card = getRandomCard();
      setPlayerSum(playerSum + card);
      setPlayerCards([...playerCards, card]);
      if (playerSum + card > 21) {
        setIsPlayerAlive(false);
        setMessage("You're out of the game!");
        setPlayerChips(playerChips - 10);
      } else if (playerSum + card === 21) {
        setHasBlackjack(true);
        setMessage("Wohoo! You've got Blackjack!");
        setPlayerChips(playerChips + 20);
      } else {
        setMessage('Do you want to draw a new card?');
      }
    }
  }

  function stay() {
    setIsDealerTurn(true);
    for (let i = dealerSum; i < 17 && playerSum <= 21; i += getRandomCard()) {
      let card = getRandomCard();
      setDealerCards([...dealerCards, card]);
      setDealerSum(dealerSum + card);
    }
    if (dealerSum > 21) {
      setMessage('Dealer is bust! You win!');
      setPlayerChips(playerChips + 10);
    } else if (dealerSum === playerSum) {
      setMessage('It is a tie!');
    } 
    else if (dealerSum === 21) {
      setMessage('dealer has blackjack');}
      
      else if (dealerSum > playerSum) {
      setMessage('Dealer wins!');
      setPlayerChips(playerChips - 10);
    } 
    
    else {
      setMessage('You win!');
      setPlayerChips(playerChips + 10);
    }
    setIsGameOver(true);
  }
  
  
 
  
  function handleNameChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <div className={styles.body}>
      <img className={styles.logo} src={`./logo3.png`} alt={'logo'} />
    <h2>{message}</h2>
      

<div className={styles.game}>
     <div className={styles.dealer}>
          <div className={styles.dcardholder}>
            <h3>Dealer</h3>
          </div>
               <div className={styles.gameInfo}>
                    <div className={styles.cardContainer}>
                      {dealerCards.map((card, index) => (
                         <div className={styles.card} key={index}>
                           {isDealerTurn || index !== 1 ? (
                           <img className={styles.cardimg} src={`./${card}.png`} alt={`card ${card}`} />
                           ) : (
                           <img
                           src="/card-back.png"
                           alt="card back"
                           className={styles.cardimg}
                           />
                           )}
                         </div>
                      ))}
                    </div>
               </div>
               

          <div className={styles.dtotals}>
            <h3>Total: {isDealerTurn ? dealerSum : '?'}</h3>
          </div>
      </div>
      <div className={styles.time}><h1>{seconds}</h1></div>
      

      <div className={styles.player}>
           <div className={styles.pcardholder}>
             <h3>{playerName}</h3>
           </div>
           <div>
                <div className={styles.gameInfo}>
                     <div className={styles.cardContainer}>
                       {playerCards.map((card, index) => (
                          <div className={styles.card} key={index}>
                            <img className={styles.cardimg} src={`./${card}.png`} alt={`card ${card}`} />
                          </div>
                        ))}
                     </div>
                </div>
                <div className={styles.ptotals}>
                  <h3> Total: {playerSum}</h3>
                </div>
           </div>
      </div>
</div>


<div className={styles.buttonContainer}>
  {isPlayerAlive && !hasBlackjack && (
  <button className={styles.button} onClick={newCard}>New card</button>
  )}
  <button className={styles.button} onClick={startGame}>New game</button>
  <button className={styles.button} onClick={stay}>stay turn</button>
  
  
  
</div>
<div><img className={styles.chip} src={`./chip.png`} alt={'chip'} /><img className={styles.chip} src={`./chip.png`} alt={'chip'} /></div>



<div className={styles.nameInput}>
  <label>
  Enter your name:
  <input
        type="text"
        value={playerName}
        onChange={handleNameChange}
          />
  </label>
  </div>

    
    </div>
    
    
  );}
