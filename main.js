let stringInput = tweetInput;
// let stringInput = 'tweetInput #let stringInput = ##tweetInput';

function returnHashtag (str) {
    let stringList = str.split(' ');
    let re1 = /##/;
    let re2 = /#/;
    let hash = [];
    for (let i = 0; i < stringList.length; i++){
      if (re1.test(stringList[i])) {
        hash.push(stringList[i].slice(2));
      }
      else if (re2.test(stringList[i])) {
        hash.push(stringList[i].slice(1))
      }
    }
    return hash
}

let hashtags = returnHashtag(stringInput);

function renderHash() {
  document.getElementById(
    "trending"
  ).innerHTML = hashtags.map(
    hashtag => `
    <h6 class="mb-0"><a href="#">#${hashtag}</a></h6>
    <small class="text-muted">${Math.floor(Math.random() * (1500 + 1) + 500)}K Tweets</small>`
  ).join('');
}

renderHash();