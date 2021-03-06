let tweetBtn = document.getElementById('tweetBtn');
let tweetInput = document.getElementById('tweet-input');
let tweetList = document.getElementById('tweets-list');
let tweetNum = document.getElementById('tweetNum');
let id = 0;
let tweets = [];
let imgUrlArr = [];

fetchTweets();

async function fetchTweets() {
  let url = `https://api.myjson.com/bins/iglny`;
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved

  //setting data here
  tweets = data;
  if(tweets.length !== 0) {
    let idArr = tweets.map(tweet => tweet.id);
    id = Math.max(...idArr);
  } else {
    id = 0;
  }

  render();
  
}

let hashes = [];
let tweetObj = {};
let tweetContent = [];


async function postTweets() {
  const rawResponse = await fetch('https://api.myjson.com/bins/iglny', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tweets)
  });
  const content = await rawResponse.json();

  console.log(content);
};




function Tweet (id, text, retweetId, isLike, hashtags) {
    this.id = 0;
    this.text = 'Hello world';
    this.time = Date.now();
    this.imgUrl = null;
    this.retweetId = 0;
    this.isLike = false;
    this.hagstag = null;
}
let newT = new  Tweet();
console.log(newT);


function returnHashtag() {
  let stringList = tweetInput.value.split(" ");
  let re1 = /##/;
  let re2 = /#/;
  for (let i = 0; i < stringList.length; i++) {
    if (re1.test(stringList[i])) {
      hashes.push(stringList[i].slice(2));
    } else if (re2.test(stringList[i])) {
      hashes.push(stringList[i].slice(1));
    }
  }
  return hashes;
}

function renderHash() {
  let hashtags = returnHashtag();
    document.getElementById("trending").innerHTML = hashtags.map(
        hashtag => `
  <h6 class="mb-0"><a href="#">#${hashtag}</a></h6>
  <small class="text-muted">${Math.floor(
    Math.random() * (1500 + 1) + 500
  )}K Tweets</small>`
      )
      .join("");
}


function addTweet() {
//set inital values
let tweet = new Tweet();
let url = tweetInput.value.match(/https:.*\.jpg|https:.*\.png/i);
let hagstag = #bbc
tweet.id = id + 1;
tweet.text = tweetInput.value;
tweet.imgUrl = url;
tweetContent.push(tweetInput.value);

imgUrlArr.push(url);
tweets.push(tweet);
console.log(tweets);
postTweets();
fetchTweets();
renderHash();
//reset input
tweetInput.value = '';


}


function retweet(i) {
let reTweet = new Tweet();
//set time, like and retweetId for the retweeted tweet
reTweet.id = tweets[i].id;
reTweet.text = tweets[i].text;
reTweet.imgUrl = tweets[i].imgUrl;

//return array that contain retweetIds of the same id. ex id: 0 can have rtIdArr = [0,1,2]
//want new retweet to have the max retweetId
let rtIdArr = tweets.filter( tweet => tweet.id == tweets[i].id ).map(tweet => tweet.retweetId);
 reTweet.retweetId = Math.max(...rtIdArr) + 1;

tweets.splice(i+1, 0, reTweet);

postTweets();
fetchTweets();

}

function delTweet(i) {
if(tweets[i].retweetId !== 0) {
  tweets.splice(i,1);
} else { 
  tweets = tweets.filter(tweet => tweet.id !== tweets[i].id);
}

postTweets();
fetchTweets();
}



//function clear all
function clear() {
    id=0;
    tweets = [];
    render();
}

function render() {
    //render tweets to html
    tweetList.innerHTML = tweets.map( tweet => {
      let imgHtml ='';
      let likeStyle = '';
      if(tweet.imgUrl !== null) {
        imgHtml = `<img class="img-fluid" src="${tweet.imgUrl[0]}" width="80%">`
      };
      if(tweet.isLike) {
        likeStyle =`style="color: red"`;
      };
      let tweetHtml = `<div class="media border p-3">
      <a class="media-left" href="#fake">
        <img alt="" class="media-object rounded" src="https://pbs.twimg.com/profile_images/2385573551/anonymous_400x400.jpg" width="35px">
      </a>
      <div class="media-body">
        <p class="pl-3 pr-2 ">${tweet.text}</p>
        <div id="tweetImg" class="text-center py-2">${imgHtml}</div>
          <ul class="d-flex">
          <li><a href="#"><span class="far fa-clock mx-2 "></span> ${moment(tweet.time).fromNow()}</a></li>
          <li onclick="retweet(${tweets.indexOf(tweet)})"><a href="#"><span class="fas fa-retweet tw-fa mx-4"></span></a></li>
          <li ><a href="#"><span onclick="toggleLike(${tweets.indexOf(tweet)})" class="fas fa-heart tw-fa mx-4"
          ${likeStyle}></span></a></li>
          <li onclick="delTweet(${tweets.indexOf(tweet)})"><a href="#"><span class="far fa-trash-alt mx-4"></span></a></li>
        </ul>
      </div>
    </div>`;
    
      if( tweets.length == 0){
        tweetHtml = ``;
      }

        return tweetHtml;
    }).join('');

    //render numbers of tweets
    tweetNum.innerText = tweets.length;
}


function toggleLike(i) {
  tweets[i].isLike = !tweets[i].isLike;
  postTweets();
  fetchTweets();
}


/* Character Remaining */

const maxCharacter = 140;
let charRemaining = maxCharacter; 
tweetInput.addEventListener('input',userInput);

function userInput() {
    let tweetLength = tweetInput.value.length;
    charRemaining = maxCharacter - tweetLength;
    renderChar()
}

function renderChar() {
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

