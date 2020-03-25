let score = window.localStorage;
let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let underscore = [];
let usedKeys = [];
let wrongGuesses = 0;
let gameended = 0;

function randomIndex(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

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


window.onload = () =>
{

    let hpc = document.querySelector(".hp-hangman-container");
    hpc.setAttribute("src", gamestates[wg]);

    // hpc.addEventListener("click", function()
    // {

    //     wg++
    //     if(wg > 7) wg = 0;
    //     hpc.setAttribute("src", gamestates[wg]);

    // });

    
	document.getElementById("responseOutput").innerHTML = underscore.join(" ");
	this.document.getElementById("letters").innerHTML = letters.join(" ");
}

