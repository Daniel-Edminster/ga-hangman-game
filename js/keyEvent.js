function keyEvent(e){


    
  // document.getElementById("showKey").innerHTML = String.fromCharCode(e.charCode);

  checkLetterPool(e);
  document.getElementById("letters").innerHTML = letters.join(" ");
  console.log(...letters);
  checkWin();
}

