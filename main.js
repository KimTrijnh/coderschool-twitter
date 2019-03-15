/* Character Remaining */

let tweetbox = document.getElementById('tweet-input');
const maxCharacter = 140;
let charRemaining = maxCharacter; 
tweetbox.addEventListener('input',userInput);

let userInput = () => {
    let tweetLength = tweetbox.value.length;
    charRemaining = maxCharacter - tweetLength;
    render()
}

function render() {
let count = document.getElementById('char-remaining');
count.innerHTML = `${charRemaining} characters remaining ` 
 if (charRemaining < 0) {
     count.classList.add('text-danger')
     count.classList.remove('text-warning')}
if (charRemaining == 0) {
    count.classList.add('text-warning')
    count.classList.remove ('text-danger')
}
 if (charRemaining > 0) {
     count.classList.remove('text-danger','text-warning')
 } 

}

/* Character Remaining */