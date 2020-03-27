function keyEvent(e){


    
  // document.getElementById("showKey").innerHTML = String.fromCharCode(e.charCode);
  // console.log(e)
  // console.log(e.key);
  h.checkLetterPool(e);
  document.getElementById("letters").innerHTML = h.letters.join(" ");
  // console.log("keyEvent: ", h.letters);
  h.checkWin();
}

// class Utils extends Hangman {

//     constructor()
//     {
//       super(mode)
//     }
// }