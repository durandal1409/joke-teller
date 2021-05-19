const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// passing joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '3094342034f94d9ca8e1f7c36210f649',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        };
        // text-to-speech
        tellMe(joke);
        // toggle button
        toggleButton();
    } catch (error) {
        console.log("whoops", error)
    }
};

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);