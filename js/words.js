
// const getWord = () =>
// {

let w = "-1";
let x = -1;
let hiddenWord = "";
let underscore = [];
let wAsArray = [];
let wrongGuesses = 0;

let score = window.localStorage;
let scoreUpdated = 0;

function checkWin()
{
	if(underscore.indexOf("_") === -1)
	{
		if(!score.getItem("Score"))
		{
			score.setItem("Score",0);
		}


		if(!scoreUpdated)
		{
			let scoreValue = score.getItem("Score");
			scoreValue++;
			score.setItem("Score", scoreValue);
			updateScore();
		}
		
		scoreUpdated++;
	}

	if(wrongGuesses === 6)
	{
		alert("You killed him");
	}
}

function updateScore()
{
	document.getElementById("scoreDisplay").innerHTML = `Your score: ${+score.getItem("Score")}`;
}

function resetScore()
{
	score.setItem("Score",0);
	updateScore();
}
let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function getWord()
{
		var data = null;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function() 
		{
			if (this.readyState === this.DONE) 
			{
				// console.log(this.responseText);

				let response = JSON.parse(this.responseText);


				w = response["word"];


			}
		});

		xhr.open("GET", "https://wordsapiv1.p.rapidapi.com/words/?random=true&frequencymin=8", false);
		xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
		xhr.setRequestHeader("x-rapidapi-key", "d47465c901msh33245ead01486fap1ff449jsn107f8654a8d5");

		xhr.send(data);

}

window.onload = function () 
{

	while (x === -1)
	{
		this.getWord();	
		// this.alert(w);
		if(w.indexOf("-") !== -1)
		{
			// this.alert(w+" setting w to -1");
			w = "-1";
			
		}
		if(w.indexOf(" ") !== -1) 
		{
			// this.alert(w+" setting w to -1");
			w = "-1";
		}

		if(w !== "-1")
		{
			x++;
		}

	}

	wAsArray = w.split("");
	
	for(let i=0;i<w.length;i++)
	{
		underscore.push("_");
	}

	document.getElementById("responseOutput").innerHTML = underscore.join(" ");
	this.document.getElementById("letters").innerHTML = letters.join(" ");
	
	updateScore();

	
}


function checkLetterPool(char)
{
	let cc = String.fromCharCode(char.charCode).toUpperCase();
	// alert(cc);
	// alert(typeof letters);

	
	// console.log(cc);
	
	let index = '';
    if(letters.includes(cc))
    {
	  	index = letters.indexOf(cc);
		letters.splice(index, 1);
		// alert("Found char"); 
	}
	
	this.document.getElementById("letters").innerHTML = letters.join(" ");
	// this.document.getElementById.("responseOutput").inn
	fillUnderscores(cc.toLowerCase());

}

function fillUnderscores(char)
{
	// while(wAsArray.indexOf(char) !== -1)

	for(let i=0;i<wAsArray.length;i++)
	{
		if(wAsArray[i] === char)
		{
			underscore[i] = char;
		}	

	}	

	if(underscore.indexOf(char) === -1)
	{
		if(!letters.includes(char))
		{
			wrongGuesses++;
			checkWin();

		}
		else {
			wrongGuesses++;
			checkWin();
		}
	}

		if(wrongGuesses < 6)
		{
			document.getElementById("gamestateDisplay").innerHTML = gamestates[wrongGuesses];
		}
		else {
			document.getElementById("gamestateDisplay").innerHTML = gamestates[6];
		}

		underscore[wAsArray.indexOf(char)] = char;
		document.getElementById("responseOutput").innerHTML = underscore.join(" ").toUpperCase();	

}

//https://stackoverflow.com/questions/19429890/javascript-timer-just-for-minutes-and-seconds
// var handler = function() {
// 	var date = new Date();
// 	var sec = date.getSeconds();
// 	var min = date.getMinutes();
// 	document.getElementById("time").textContent = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
//   };
//   setInterval(handler, 1000);
//   handler();

//https://codepen.io/yaphi1/pen/KpbRZL
var time_in_minutes = 10;
var current_time = Date.parse(new Date());
var deadline = new Date(current_time + time_in_minutes*60*1000);


function time_remaining(endtime){
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor( (t/1000) % 60 );
	var minutes = Math.floor( (t/1000/60) % 60 );
	var hours = Math.floor( (t/(1000*60*60)) % 24 );
	var days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	var clock = document.getElementById(id);
	function update_clock(){
		var t = time_remaining(endtime);
		if(t.seconds < 10) t.seconds = "0"+t.seconds;

		clock.innerHTML = ''+t.minutes+':'+t.seconds;
		if(t.total<=0){ clearInterval(timeinterval); }
	}
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
}
run_clock('clockdiv',deadline);