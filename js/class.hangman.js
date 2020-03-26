function randomIndex(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

class Hangman {
    constructor(mode)
    {
        this.mode =  mode;
        this.score = window.localStorage;
        this.wrongGuesses = 0;
        this.scoreUpdated = 0;
        this.gameEnded  = 0;
        this.word = '';

        this.usedKeys = [];
        this.wordAsArray = [];
        this.underscore = [];
        
        this.initialize();
    }

    initialize()
    {
        this.assignGameStateAndMaxGuesses(this.mode);
        this.getAndFilterWord(this.mode);

    }

    assignGameStateAndMaxGuesses(mode)
    {
        if(this.mode === "ascii")
        {
            this.maxGuesses = 6;
            this.gamestates = asciiGameStates;
        }
        else if(this.mode === "potter")
        {
            this.maxGuesses = 7;
            this.gamestates = potterGameStates;
        }

    }

    getWord(mode, word)
    {
        if(mode === "ascii")
        {
            //using xhr for non-async api call

            var data = null;
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function()
            {
                let response = JSON.parse(this.responseText);

                console.log(response);
                this.word = response['word'];
                // if (this.readyState === this.DONE) 
                // {          
                // }
            })

            xhr.open("GET", "https://wordsapiv1.p.rapidapi.com/words/?random=true&frequencymin=8", false);
            xhr.setRequestHeader("x-rapidapi-host", "wordsapiv1.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "d47465c901msh33245ead01486fap1ff449jsn107f8654a8d5");

            xhr.send(data);

            return this.word;
        }
    }

    getAndFilterWord(mode, word = '')
    {

        if(mode === "ascii")
        {
            let x = -1;

            while(x === -1)
            {
                this.word = this.getWord(mode, '');

                if( (this.word.indexOf("-") || this.word.indexOf(" ")) !== -1 )
                {
                    this.word = "-1";
                }

                if(this.word !== "-1")
                {
                    x++;
                    this.wordAsArray = this.word.split("");
                }
            }
        }

        else if(mode === "potter")
        {
            let hpGlossary = `Accio Aconite Alchemy Alohomora Aparecium Apparate Arithmancy Astronomy Auror Azkaban Basilisk Beater Bezoar Bludgers Boggart Bowtruckle Bubotuber Butterbeer Centaurs Charm Chaser Chimaera Chocoballs Colloportus Comet Crup Decree Densaugeo Diffindo Disapparate Dissendium Divination Doxy Dragon Dungbomb Engorgio Evanesco Expelliarmus Ferula Firebolt Flagrate Flobberworm Furnunculus Galleon Goblins Gobstones Grim Grindylow Gringotts Grunnings Gurg Healer Heliopath Hellebore Heptomology Herbology Hinkypunk Hippogriff Hogsmeade Honeydukes Howler Impervius Incarcerous Incendio Kappa Karkus Keeper Knarl Kneazle Knut Kwikspell Legilimency Legilimens Leprechaun Locomotor Magorian Mandragora Mandrake Merpeople Mobiliarbus Mobilicorpus Monkshood Morsmordre Mudblood Muggle Murtlap Nargles Niffler Nox Obliviate Obliviator Occlumency Ollivanders Omnioculars Ornithomancy Parselmouth Parseltongue Patronus Pensieve Phoenix Poltergeist Porlock Portkey Portus Potions Protego Quaffle Quidditch Quietus Reducio Relashio Remembrall Rennervate Reparo Rictusempra Riddikulus Salamander Scourgify Seeker Seer Sickle Silencio Smeltings Sneakoscope Sonorus Spellotape Splinching Squib Stupefy Tarantallegra Thestral Transfiguration Unicorn Unspeakable Vampire Veritaserum Wand Watchwizard Welcomewitch Werewolf Wizengamot Wolfsbane WWN`.split(" ");
            let index = randomIndex(0, hpGlossary.length-1);

            this.word = hpGlossary[index];
            this.wordAsArray = this.word.split("");
        }


    }

    updateScore()
    {
        document.getElementById("scoreDisplay").innerHTML = `Your score: ${+score.getItem("Score")}`;
    }

    resetScore()
    {
        this.score.setItem("Score",0);
        this.updateScore();
    }

    checkLetterPool(char)
    {
        let cc = String.fromCharCode(char.charCode).toUpperCase();
        let index = '';

        if(!this.usedKeys.includes(cc))
        {
            this.usedKeys.push(cc);
            console.log(this.usedKeys);

            if(this.letters.includes(cc))
            {
                index = this.letters.indexOf(cc);
                this.letters.splice(index, 1);
                    // alert("Found char"); 
            }  

            this.document.getElementById("letters").innerHTML = letters.join(" ");
            fillUnderscores(cc.toLowerCase());
        }

        else {

        }
    }

    fillUnderscores(char)
    {

        for(let i=0;i<this.wordAsArray.length;i++)
        {
            if(this.wordAsArray[i] === char)
            {
                this.underscore[i] = char;
            }	

        }	

        if(this.underscore.indexOf(char) === -1)
        {
            if(!this.letters.includes(char))
            {
                this.wrongGuesses++;
                this.checkWin();

            }
            else {
                // wrongGuesses++;
                this.checkWin();
            }
        }

        
        if(this.wrongGuesses < this.gamestates.length -1)
        {
            document.getElementById("gamestateDisplay").innerHTML = this.gamestates[wrongGuesses];
        }
        else {
            document.getElementById("gamestateDisplay").innerHTML = this.gamestates[this.gamestates.length-1];
        }

        this.underscore[this.wordAsArray.indexOf(char)] = char;
        this.document.getElementById("responseOutput").innerHTML = underscore.join(" ").toUpperCase();	

    }

}


let mobileInput = document.querySelector(".mobileInput");

mobileInput.addEventListener("keyup", function()
{
	mobileInput.value="";
});
