const input = document.querySelector('input');
const audioElem = document.querySelector('audio');

input.addEventListener('change', () => {
    const file = input.files[0];
    if(!file) return;

    // turning raw audio to URL source
    audioElem.src = URL.createObjectURL(file);
    audioElem.play();

    // Audio Processing
})
