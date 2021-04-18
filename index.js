var temp = document.querySelector('.time');
var button = document.querySelector("button");
var words = document.querySelector(".words");
var timerDiv = document.querySelector(".time");
var scoreDiv = document.querySelector(".score");
var points = 0; //set initial score to 0
var spans;
var typed;
var seconds = 20; //set initial time to 20 seconds
var bgm = new Audio('audio/correct.mp3');

//function for the countdown timer
function countdown() {
    points = 0;
    var timer = setInterval(function(){
        button.disabled = true;
        seconds--; 
        temp.innerHTML = seconds;
        if (seconds === 0) {
            alert("Times up! Your score is " + points); //alert times up
            scoreDiv.innerHTML = "0";
            words.innerHTML = "";
            button.disabled = false;
            clearInterval(timer); //clears a timer set
            seconds = 20;
            timerDiv.innerHTML = "20";
            button.disabled = false;	
        }
    }, 1000);
}

// this function take random words from the list to be displayed
function random() {
    words.innerHTML = "";
    var random = Math.floor(Math.random() * (240+ 1));
    var wordArray = list[random].split("");
    for (var i = 0; i < wordArray.length; i++) { //building the words with spans around the letters
        var span = document.createElement("span");
        span.classList.add("span");
        span.innerHTML = wordArray[i];
        words.appendChild(span);
    }
    spans = document.querySelectorAll(".span");
}


const list = ['ACCOUNT','ACCURATE','ACRES','ACROSS','ACT','ACTION','ACTIVE','ACTIVITY','ACTUAL','ACTUALLY',
'BABY','BACK','BAD','BADLY','BAG','BALANCE','BALL','BALLOON','BAND','BANK',
'CABIN','CAGE','CAKE','CALL','CALM','CAME','CAMERA','CAMP','CAN','CANAL',
'DAILY','DAMAGE','DANCE','DANGER','DANGEROUS','DARK','DARKNESS','DATE','DAUGHTER','DAWN',
'EACH','EAGER','EAR','EARLIER','EARLY','EARN','EARTH','EASIER','EASILY','EAST',
'FACE','FACING','FACT','FACTOR','FACTORY','FAILED','FAIR','FAIRLY','FALL','FALLEN',
'GAIN','GAME','GARAGE','GARDEN','GAS','GASOLINE','GATE','GATHER','GAVE','GENERAL',
'HABIT','HAD','HAIR','HALF','HALFWAY','HALL','HAND','HANDLE','HANDSOME','HANG',
'ICE','IDEA','IDENTITY','IF','ILL','IMAGE','IMAGINE','IMMEDIATELY','IMPORTANCE','IMPORTANT',
'JACK','JAR','JET','JOB','JOIN','JOINED','JOURNEY','JOY','JUDGE','JUMP',
'KEEP','KEPT','KEY','KIDS','KILL','KIND','KITCHEN','KNEW','KNIFE','KNOW',
'LABEL','LABOR','LACK','LADY','LAID','LAKE','LAMP','LAND','LANGUAGE','LARGE',
'MACHINE','MACHINERY','MAD','MADE','MAGIC','MAGNET','MAIL','MAIN','MAINLY','MAJOR',
'NAILS','NAME','NATION','NATIONAL','NATIVE','NATURAL','NATURALLY','NATURE','NEAR','NEARBY',
'OBJECT','OBSERVE','OBTAIN','OCCASIONALLY','OCCUR','OCEAN','OF','OFF','OFFER','OFFICE',
'PACK','PACKAGE','PAGE','PAID','PAIN','PAINT','PAIR','PALACE','PALE','PAN',
'QUARTER','QUEEN','QUESTION','QUICK','QUICKLY','QUIET','QUIETLY','QUITE', 
'RABBIT','RACE','RADIO','RAILROAD','RAIN','RAISE','RAN','RANCH','RANGE','RAPIDLY',
'SAD','SADDLE','SAFE','SAFETY','SAID','SAIL','SALE','SALMON','SALT','SAME',
'TABLE','TAIL','TAKE','TAKEN','TALES','TALK','TALL','TANK','TAPE','TASK', 
'UNCLE','UNDER','UNDERLINE','UNDERSTANDING','UNHAPPY','UNION','UNIT','UNIVERSE','UNKNOWN','UNLESS',
'VAPOR','VARIETY','VARIOUS','VAST','VEGETABLE','VERB','VERTICAL','VERY','VESSELS','VICTORY',
'WAGON','WAIT','WALK','WALL','WANT','WAR','WARM','WARN','WAS','WASH',
'YARD','YEAR','YELLOW','YES','YESTERDAY','YET','YOU','YOUNG','YOUNGER','YOUR',
'ZERO','ZOO'];

//when click button, start countdown, start random word and button start disabled
button.addEventListener("click", function(e){
    countdown();
    random();
    button.disabled = true;	
});


function typing(e) {
        typed = String.fromCharCode(e.which);
        for (var i = 0; i < spans.length; i++) {
            if (spans[i].innerHTML === typed) { // if typed letter is the one from the word
                if (spans[i].classList.contains("bg")) { // if it already has class with the bacground color then check the next one
                    continue;
                } else if (spans[i].classList.contains("bg") === false && spans[i-1] === undefined || spans[i-1].classList.contains("bg") !== false ) { // if it dont have class, if it is not first letter or if the letter before it dont have class (this is done to avoid marking the letters who are not in order for being checked, for example if you have two "A"s so to avoid marking both of them if the first one is at the index 0 and second at index 5 for example)
                    spans[i].classList.add("bg");
                    break;
                }
            }
        }
        var checker = 0;
        for (var j = 0; j < spans.length; j++) { //checking if all the letters are typed
            if (spans[j].className === "span bg") {
                checker++;
            }
            if (checker === spans.length) { 
        bgm.pause();
                    bgm.currentTime = 0;
        bgm.play();
                words.classList.add("animated");
                words.classList.add("fadeOut");
                points++; // increment the points
                scoreDiv.innerHTML = points; //add points to the points div
                document.removeEventListener("keydown", typing, false);
                setTimeout(function(){
                    words.className = "words"; // restart the classes
                    random(); // give another word
                    document.addEventListener("keydown", typing, false);
                }, 400);
            }

        }
}

document.addEventListener("keydown", typing, false);