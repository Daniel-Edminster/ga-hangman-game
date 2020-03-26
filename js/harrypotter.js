let score = window.localStorage;
let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let underscore = [];
let usedKeys = [];
let wrongGuesses = 0;
let gameended = 0;
let scoreUpdated = 0;

function randomIndex(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
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

function checkWin(timeup = 0)
{
    if(timeup === 1)
	{

        hpc.setAttribute("src", gamestates[7]);
		alert("You ran out of time. Your word was: " + w + "\n Resetting game..");
		setTimeout(function() {
			location.reload();
		},1500)

    }
    
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

	if(wrongGuesses === 7)
	{
		if(!gameended)
		{
			gameended = 1;
			alert("You killed him. Your word was: " + w + "\n Resetting game..");
			setTimeout(function() {
				location.reload();
			},1500)

		}
	}
}

function checkLetterPool(char)
{

	
		let cc = String.fromCharCode(char.charCode).toUpperCase();
		
		let index = '';

		if(!usedKeys.includes(cc))
		{
			usedKeys.push(cc);
		

		console.log(usedKeys);
			if(letters.includes(cc))
			{
				index = letters.indexOf(cc);
				letters.splice(index, 1);
				// alert("Found char"); 
			}

			
			this.document.getElementById("letters").innerHTML = letters.join(" ");
			fillUnderscores(cc.toLowerCase());
		}

		else {

		}
		

}


//collected by scraping, no API unfortunately
let hpGlossary = `Accio Aconite Alchemy Alohomora Aparecium Apparate Arithmancy Astronomy Auror Azkaban Basilisk Beater Bezoar Bludgers Boggart Bowtruckle Bubotuber Butterbeer Centaurs Charm Chaser Chimaera Chocoballs Colloportus Comet Crup Decree Densaugeo Diffindo Disapparate Dissendium Divination Doxy Dragon Dungbomb Engorgio Evanesco Expelliarmus Ferula Firebolt Flagrate Flobberworm Furnunculus Galleon Goblins Gobstones Grim Grindylow Gringotts Grunnings Gurg Healer Heliopath Hellebore Heptomology Herbology Hinkypunk Hippogriff Hogsmeade Honeydukes Howler Impervius Incarcerous Incendio Kappa Karkus Keeper Knarl Kneazle Knut Kwikspell Legilimency Legilimens Leprechaun Locomotor Magorian Mandragora Mandrake Merpeople Mobiliarbus Mobilicorpus Monkshood Morsmordre Mudblood Muggle Murtlap Nargles Niffler Nox Obliviate Obliviator Occlumency Ollivanders Omnioculars Ornithomancy Parselmouth Parseltongue Patronus Pensieve Phoenix Poltergeist Porlock Portkey Portus Potions Protego Quaffle Quidditch Quietus Reducio Relashio Remembrall Rennervate Reparo Rictusempra Riddikulus Salamander Scourgify Seeker Seer Sickle Silencio Smeltings Sneakoscope Sonorus Spellotape Splinching Squib Stupefy Tarantallegra Thestral Transfiguration Unicorn Unspeakable Vampire Veritaserum Wand Watchwizard Welcomewitch Werewolf Wizengamot Wolfsbane WWN`.split(" ");
// console.log(hpGlossary);

w = hpGlossary[randomIndex(0,hpGlossary.length-1)];
wAsArray = w.toLowerCase().split("");
console.log(wAsArray);

for(let i=0;i<w.length;i++)
{
    underscore.push("_");
}


let gamestates = 
[
    "img/0.png", "img/1.png","img/2.png",
    "img/3.png","img/4.png","img/5.png",
    "img/6.png", "img/7.png"
];

console.log(w);
let wg = 0;

function fillUnderscores(char)
{


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
            console.log(wrongGuesses);
			checkWin();

		}
		else {
			// wrongGuesses++;
			checkWin();
		}
	}

		if(wrongGuesses < 8)
		{
            // console.log("got a wrong guess");
			document.getElementById("gamestateDisplay").setAttribute("src", gamestates[wrongGuesses]);
		}
		else {
			document.getElementById("gamestateDisplay").setAttribute("src", gamestates[7]);
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
let time_in_minutes = 10;
let current_time = Date.parse(new Date());
let deadline = new Date(current_time + time_in_minutes*30*1000);

function time_remaining(endtime){
	let t = Date.parse(endtime) - Date.parse(new Date());
	let seconds = Math.floor( (t/1000) % 60 );
	let minutes = Math.floor( (t/1000/60) % 60 );
	let hours = Math.floor( (t/(1000*60*60)) % 24 );
	let days = Math.floor( t/(1000*60*60*24) );
	return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}
function run_clock(id,endtime){
	let clock = document.getElementById(id);
	function update_clock(){
		let t = time_remaining(endtime);
		if(t.seconds < 10) t.seconds = "0"+t.seconds;

		clock.innerHTML = ''+t.minutes+':'+t.seconds;
		if(t.total<=0)
		{ 
			let timeup = 1;
			checkWin(timeup);
			clearInterval(timeinterval); 

		}
	}
	update_clock(); // run function once at first to avoid delay
	var timeinterval = setInterval(update_clock,1000);
}
run_clock('clockdiv',deadline);

window.onload = () =>
{

    let hpc = document.querySelector(".hp-hangman-container");
    hpc.setAttribute("src", gamestates[wg]);


    
	document.getElementById("responseOutput").innerHTML = underscore.join(" ");
    this.document.getElementById("letters").innerHTML = letters.join(" ");
    updateScore();
}

