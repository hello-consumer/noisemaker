(function(){
    var audioCtx, oscillator, filter;
    var initialized = false;

    function initialize() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        oscillator = audioCtx.createOscillator();
        oscillator.start();

        filter = audioCtx.createBiquadFilter();

        oscillator.connect(filter);

        oscillator2 = audioCtx.createOscillator();
        oscillator2.frequency.value = 0;
        oscillator2.start();
        oscillator2.connect(audioCtx.destination);

        initialized = true;
    }

    function toggleOscillatorOn() {
        if (!initialized) {
            initialize();
        }

        this.classList.add('pressed');
        oscillator.frequency.value = this.attributes.getNamedItem('data-pitch').nodeValue;
        filter.connect(audioCtx.destination);
    }

    function toggleOscillatorOff() {
        this.classList.remove('pressed')
        filter.disconnect(audioCtx.destination);
    }

    window.addEventListener('load', function () {
        var keys = document.querySelectorAll(".key");
        var octaves = Math.ceil(keys.length / 12);
        for(var j= 1; j <= octaves; j++){
            var refPitch = 220 * j;
        
            for (var i = (j - 1) * 12; i < keys.length; i++) {


                keys[i].setAttribute("data-pitch", refPitch * Math.pow(2, ((i % 12) / 12)));
                keys[i].addEventListener('mousedown', toggleOscillatorOn);
                keys[i].addEventListener('mouseup', toggleOscillatorOff);
                keys[i].addEventListener('touchstart', toggleOscillatorOn, {passive: true});
                keys[i].addEventListener('touchend', toggleOscillatorOff, {passive: true});
            }
        }

        document.querySelector("#wave").addEventListener('change', function(){
            if (!initialized) {
                initialize();
            }
            oscillator.type = this.value;
        });
        document.querySelector("#filter").addEventListener('input', function(){
            if (!initialized) {
                initialize();
            }
            filter.frequency.value = this.value;
        });
    })

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('sw.js').then(function (registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function (err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}())