let tweetBtn = document.getElementById('tweetBtn');
let tweetInput = document.getElementById('tweet-input');
let tweetList = document.getElementById('tweets-list');
let id = 0;

let tweets = [];
function Tweet (id, text, retweetID, isLike) {
    this.id = 1;
    this.text = 'Hello world';
    this.imgUrl = null;
    this.retweetID = null;
    this.isLike = false
}

//tweetBtn.addEventListener('click', addTweet);
function addTweet() {
let tweet = new Tweet();
tweet.id = id++;
tweet.text = tweetInput.value;
tweets.push(tweet);
console.log(tweets);
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
            <li><a href="#"><span class="fas fa-retweet tw-fa mx-4"></span></a></li>
            <li><a href="#"><span class="fas fa-heart tw-fa mx-4"></span></a></li>
            <li><a href="#"><span class="fas fa-ellipsis-h tw-fa mx-4"></span></a></li>
          </ul>
        </div>

      </div>`).join('');
}



