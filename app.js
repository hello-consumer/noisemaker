var audioCtx, oscillator;
var initialized = false;

var connected = false;


var body = document.querySelector('body');
body.addEventListener('click', toggleOscillator);

function initialize(){
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    oscillator.start();
    initialized = true;
}

function toggleOscillator(){
    if(!initialized){
        initialize();
    }

    connected = !connected;
    if(connected){
        oscillator.connect(audioCtx.destination)
    } else{
        oscillator.disconnect(audioCtx.destination)
    }
    
}