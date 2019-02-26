var audioCtx, oscillator;
var initialized = false;


var keys = document.querySelectorAll(".key");
for(var i = 0; i < keys.length; i++){
    keys[i].setAttribute("data-pitch", 440 * Math.pow(2, (i/keys.length)));
    keys[i].addEventListener('mousedown', toggleOscillatorOn);
    keys[i].addEventListener('mouseup', toggleOscillatorOff);
    keys[i].addEventListener('touchstart', toggleOscillatorOn);
    keys[i].addEventListener('touchend', toggleOscillatorOff);
}

function initialize(){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    oscillator.start();
    initialized = true;
}

function toggleOscillatorOn(){
    if(!initialized){
        initialize();
    }

    this.classList.add('pressed');
    oscillator.frequency.value = this.attributes.getNamedItem('data-pitch').nodeValue;
    oscillator.connect(audioCtx.destination);
}

function toggleOscillatorOff(){
    this.classList.remove('pressed')
    oscillator.disconnect(audioCtx.destination);
}