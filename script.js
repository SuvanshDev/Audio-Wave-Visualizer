const input = document.querySelector('input');
const audioElem = document.querySelector('audio');
const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    // turning raw audio to URL source
    audioElem.src = URL.createObjectURL(file);
    audioElem.play();

    // Audio Processing
    // 1. Create audio Context
    // 2. Create audio source
    // 3. Create audio effects (AnalyserNode)
    // 4. Create audio destination

    // Audio Context Processing Graph
    const audioContext = new AudioContext();

    // Source Node 
    const audioSource = audioContext.createMediaElementSource(audioElem);

    // Analyser Node 
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);

    // Destination Node
    analyser.connect(audioContext.destination); // Hardware speakers

    analyser.fftSize = 512; // no of sound bars
    const bufferDataLength = analyser.frequencyBinCount; // actual count of sound bars

    const bufferDataArr = new Uint8Array(bufferDataLength);

    const barWidth = canvas.height / bufferDataLength;
    let x = 0;
    function drawAndAnimateSoundBars() {
        x = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        analyser.getByteFrequencyData(bufferDataArr);
        bufferDataArr.forEach(dataValue => {
            const barHeight = dataValue;

            context.fillStyle = '#32CD32';
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        })
        if (!audioElem.ended) requestAnimationFrame(drawAndAnimateSoundBars);

    }
    drawAndAnimateSoundBars();
})
