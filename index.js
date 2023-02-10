const input = document.querySelector('#input');
const btn = document.querySelector('#btn');
const infoText = document.querySelector('#info-text');
const meaningContainer = document.querySelector('#meaning-container');
const title = document.querySelector('#title');
const meaning = document.querySelector('#meaning');
const audio = document.querySelector('#audio');

async function fetchAPI(word) {

    try {
        meaningContainer.style.display = "none";
        infoText.style.display = "block";
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        infoText.innerText = `Searching the meaning of "${word}"`;
        const result = await fetch(url).then((res) => res.json());
        console.log(result.title);
        if (result.title) {
            meaningContainer.style.display = "block";
            infoText.style.display = "none";
            title.innerText = word;
            meaning.innerText = "N/A";
            audio.style.display = "none";
        } else {
            infoText.style.display = "none";
            meaningContainer.style.display = "block";
            audio.style.display = "inline-flex";
            title.innerText = `${result[0].word}`;
            meaning.innerText = `${result[0].meanings[1].definitions[0].definition}`;
            audio.src = `${result[0].phonetics[0].audio}`;


        }

    } catch (error) {
        meaningContainer.style.display = "none";
        infoText.style.display = "block";
        infoText.innerText = `An Error Occured!!! Try again later.`
    }

}
btn.addEventListener('click', () => {
    let w = input.value;
    fetchAPI(w);
});

input.addEventListener('keyup', (e) => {
    if (e.target.value && e.key === 'Enter') {
        fetchAPI(e.target.value);
    }
})