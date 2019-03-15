

let tweetBtn = document.getElementById('tweetBtn');
let tweetInput = document.getElementById('tweet-input');
let tweetList = document.getElementById('tweets-list');
let tweetNum = document.getElementById('tweetNum');
let id = 0;


let tweets = [];

//localStorage.setItem('tweetsArray', tweetsData)
//let tweets = localStorage.getItem('tweetsArray');

function Tweet (id, text, retweetId, isLike) {
    this.id = 1;
    this.text = 'Hello world';
    this.imgUrl = null;
    this.retweetId = 0;
    this.isLike = false
}

//tweetBtn.addEventListener('click', addTweet);
function addTweet() {
let tweet = new Tweet();
tweet.id = id++;
tweet.text = tweetInput.value;
tweets.push(tweet);
console.log(tweets);
tweetInput.value = '';
render();

}

function retweet(i) {
let retweetedTweet = tweets[i];
//console.log(retweetedTweet);
retweetedTweet.retweetId = retweetedTweet.retweetId + 1;
retweetedTweet.isLike = false;
console.log(retweetedTweet);

let rtIndex = tweets.findIndex(t => t.id == tweets[i].id);
console.log(rtIndex);

//update tweets array to the new array that having 
//the retweedted tweet next to the one just retweet.
tweets.splice(rtIndex, 0, retweetedTweet);
render();

}

//function clear all
function clear() {
    id=0;
    tweets = [];
    render();
}

function render() {
    //render to tweet-list html
    tweetList.innerHTML = tweets.map( tweet => 
         `<div class="media">
        <a class="media-left" href="#fake">
          <img alt="" class="media-object rounded" src="http://placehold.it/64x64">
        </a>
        <div class="media-body">
          <p class="pl-3 pr-2 ">${tweet.text}</p>
          <ul class="d-flex">
            <li><a href="#"><span class="fas fa-share tw-fa mr-4 ml-0"></span></a></li>
            <li id="retweet" onclick="retweet(${tweets.indexOf(tweet)})"><a href="#"><span class="fas fa-retweet tw-fa mx-4"></span></a></li>
            <li><a href="#"><span class="fas fa-heart tw-fa mx-4"></span></a></li>
            <li><a href="#"><span class="fas fa-ellipsis-h tw-fa mx-4"></span></a></li>
          </ul>
        </div>

      </div>`).join('');

    //render numbers of tweets
    tweetNum.innerText = tweets.length;

}




/*****ANCHOR HASHTAG****/
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

