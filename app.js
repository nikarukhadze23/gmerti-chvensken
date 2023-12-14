const circle = document.getElementById('circlee');
const input = document.querySelector('.textInput');
const indivh1 = document.querySelector('.indivh1');
const indivh5 = document.querySelector('.indivh5');
const nAmh1 = document.querySelector('.nAmh1');
const nAmh2 = document.querySelector('.nAmh2');
const nAmh3 = document.querySelector('.nAmh3');
const verbsh1 = document.querySelector('.verbsh1');
const verbsh2 = document.querySelector('.verbsh2');
const verbsh3 = document.querySelector('.verbsh3');
const Links = document.querySelector('.aClass');

function clientData(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            updatePage(data);
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
}

function updatePage(data) {
    const word = data[0];

    indivh1.textContent = word.word;
    indivh5.textContent = word.phonetics[0].text;
    
    
    nAmh3.textContent = "";
    verbsh3.textContent = "";


    word.meanings.forEach((meaning) => {
        const partOfSpeech = document.createElement('h1');
        partOfSpeech.textContent = meaning.partOfSpeech;
        
        const definitionText = document.createElement('h3');
        definitionText.textContent = meaning.definitions[0].definition;
        
        if (meaning.partOfSpeech === "noun") {
            nAmh1.textContent = partOfSpeech.textContent;
            nAmh3.textContent = definitionText.textContent;
        } else if (meaning.partOfSpeech === "verb") {
            verbsh1.textContent = partOfSpeech.textContent;
            verbsh3.textContent = definitionText.textContent;
        }
    });

    Links.href = `https://en.wiktionary.org/wiki/${wordInfo.word}`;
    Links.textContent = `https://en.wiktionary.org/wiki/${wordInfo.word}`;
}

input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        clientData(e.target.value);
    }
});

circle.onclick = function () {
    document.body.classList.toggle('light-mode');
    circle.classList.toggle('whiteCirclerotate');
};