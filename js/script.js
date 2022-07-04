// Descrizione:
// Visualizzare in pagina 5 numeri casuali  diversi tra loro. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite i prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


// OK 1 -Visualizzare 5 numeri casuali in pagina diversi tra di loro
// OK 2 - Parte un timer di 30 secondi
// OK 3 - Dopo i 30 secondi i numeri spariscono
// OK 4 - Dopo la sparizione all'utente appariranno 5 prompt dove dovrà inserire i numeri precedentemente visti
// 5 - Dopo l'inserimento dei numeri confrontare Numeri Casuali con Numeri Utente
// 5.1 - Ogni corrispondenza genera 1 punto, fino ad un massimo di 5 punti
// 6 - Stampare il risultato ottenuto dall'utente 


// Dichiaro variabili DOM
const startGame = document.getElementById("start-game");
const displaySimonNumbers = document.getElementById("simon-number");
const displayCountdown = document.getElementById("countdown");

// Eseguo il gioco al Click del bottone "Start"
startGame.addEventListener("click", () => {

// ------------------------------------- FUNCTION ------------------------------------- //

// Creo una funzione che generi 5 numeri casuali
const createUniqueRandomNumbers = (max) => {
  // Creo un array che conterrà i 5 numeri casuali
  const numbers = [];
  // Creo un Ciclo FOR per inserire i numeri all'interno dell'array
  for (let i = 0; i < 5; i++) {
    // Genero un numero casuale
    let randomNumber = Math.floor(Math.random() * max) + 1;
    // Verifico che il numero non sia già presente nell'array, altrimenti ripeto il giro
    if (numbers.includes(randomNumber)) {i--}
    else {numbers.push(randomNumber)}
  }
  // Restituisco l'array di numeri
  return numbers;
};

// Creo una funzione che controlli il punteggio totalizzato dall'utente
const checkUserScore = (userNumbers, gameNumbers) => {
  // Definisco una variabile che tenga conto del punteggio utente
  let score = 0;
  // Prendo ogni numero dell'array gameNumbers e lo confronto con ogni numero dell'array userNumbers
  for (let i = 0; i < gameNumbers.length; i++) {
    for (let j = 0; j < userNumbers.length; j++) {
      // Per ogni numero corretto viene incrementato di 1 il punteggio utente
      if (gameNumbers[i] === userNumbers[j]) {score++};
    }
  }
  
  // Restituisco il punteggio totalizzato dall'utente
  return score;
}

// ------------------------------------- SIMON'S GAME ------------------------------------- //

// Resetto eventuali precedenti contenuti e rendo visibile i nuovi
displaySimonNumbers.innerHTML = "";
displaySimonNumbers.classList.remove("d-none");

// Disabilito il bottone "Play" e ne modifico il testo
startGame.disabled = true;
startGame.innerText = "Restart";


// Creo i random Simon's Numbers e li stampo in pagina tramite un ciclo FOR
const simonNumbers = createUniqueRandomNumbers(99);
console.log("Simon's Numbers: " + simonNumbers);

for (let i = 0; i < simonNumbers.length; i++) {
  const numberElement = document.createElement("li");
  numberElement.append(simonNumbers[i])
  displaySimonNumbers.appendChild(numberElement);
}


// Preparo il valore di partenza del Countdown e lo stampo in pagina
let seconds = 30;
displayCountdown.innerText = seconds;

// Creo un countdown che stampa in pagina ogni secondo
const countdown = setInterval(() => {

  displayCountdown.innerText = --seconds;
  // Se il Countdown arriva a 0, si ferma e nasconde i numeri a schermo
  if(seconds === 0) {
    // Ferma il countdown
    clearInterval(countdown);
    // I numeri vengono nascosti
    displaySimonNumbers.classList.add("d-none");
  }
}, 1000);


// Definisco un array che conterrà i numeri scelti dell'utente
const userNumbers = [];
// Imposto un prompt che chieda all'utente i numeri visti precedentemente 0.5s dopo la fine del Countdown
const userPromptDelayed = setTimeout(() => {
  // Creo un ciclo for per chiedere all'utente N numeri tante volte quanti i precedenti numeri visti a schermo
  for (let i = 1; i <= simonNumbers.length; i++) {
    let userNumber;
    do {
      userNumber = parseInt(prompt(`Inserisci uno dei numeri visti precedentemente. [Giro: ${i}/5]`))
    } while (isNaN(userNumber)) // Verifico che venga inserito un valore "number"

    // Inserisco il numero nell'array UserNumbers
    userNumbers.push(userNumber);
  }
  console.log("I numeri che ho scelto: " + userNumbers);
  
  // Se entrambi gli array contengono entrambi N numeri, allora verifico il punteggio utente
  if (userNumbers.length == simonNumbers.length) {
    // Calcolo il punteggio utente tramite la funzione checkUserScore
    const checkScore = checkUserScore(userNumbers, simonNumbers);
    alert("Il tuo punteggio è: " + checkScore);
    console.log("Il tuo punteggio è: " + checkScore);

    // Riabilito il bottone "Play/Restart" alla fine del gioco
    startGame.disabled = false;
  }

}, seconds * 1000 + 500);

});
