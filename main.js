
let tweetBtn = document.getElementById('tweetBtn');
let tweetInput = document.getElementById('tweet-input');
let tweetList = document.getElementById('tweets-list');
let tweetNum = document.getElementById('tweetNum');
let id = 0;

let tweets = [];
let imgUrlArr = [];
function getTime() {
return Date.now();
}

//localStorage.setItem('tweetsArray', tweetsData)
//let tweets = localStorage.getItem('tweetsArray');

function Tweet (id, text, retweetId, isLike) {
    this.id = 0;
    this.text = 'Hello world';
    this.time = Date.now();
    this.imgUrl = null;
    this.retweetId = 0;
    this.isLike = false
}


function addTweet() {
//set inital values
let tweet = new Tweet();
let url = tweetInput.value.match(/https:.*\.jpg|https:.*\.png/i);
tweet.id = id++;
tweet.text = tweetInput.value;
tweet.imgUrl = url;
imgUrlArr.push(url);
tweets.push(tweet);
console.log(tweets);
render();

//reset input
tweetInput.value = '';
}



function retweet(i) {
  //console.log(i);
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
render();

}

function delTweet(i) {
  console.log(i);
  console.log(tweets[i].retweetId);

if(tweets[i].retweetId !== 0) {
  tweets.splice(i,1);
} else { 
  tweets = tweets.filter(tweet => tweet.id !== tweets[i].id);
}
render();
console.log(tweets);
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
      if(tweet.imgUrl !== null) {
        imgHtml = `<img class="img-fluid" src="${tweet.imgUrl[0]}">`
      };
      let tweetHtml = `<div class="media">
      <a class="media-left" href="#fake">
        <img alt="" class="media-object rounded" src="http://placehold.it/64x64">
      </a>
      <div class="media-body">
        <p class="pl-3 pr-2 ">${tweet.text}</p>
        <div id="tweetImg">${imgHtml}</div>
          <ul class="d-flex">
          <li><a href="#"><span class="far fa-clock mr-4 ml-0"></span> ${moment(tweet.time).fromNow()}</a></li>
          <li><a href="#"><span class="fas fa-share tw-fa mr-4 ml-0"></span></a></li>
          <li onclick="retweet(${tweets.indexOf(tweet)})"><a href="#"><span class="fas fa-retweet tw-fa mx-4"></span></a></li>
          <li onclick="toggleLike()"><a href="#"><span class="fas fa-heart tw-fa mx-4"></span></a></li>
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

