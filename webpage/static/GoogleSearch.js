
// Global Variable
var index = 0;
var responseData;
var userResponse = "";
var startTime;
var endTime;
var timeRemaining;
var choice = 4;
var count = 0;

 (function() {
   "use strict";

   let timerId = null;
   let set = "";
   let timerMode = false;
   let seconds = 15;
   let seen = [];
   const ALGORITHM = new Array("0g", "01gfp", "05gfp", "09gfp");

   window.addEventListener("load", init);

   function init() {
     let submitButton = document.querySelector(".submit");
     submitButton.disabled = true;
     submitButton.addEventListener("click", submit_form);
     let ratingButton = document.getElementsByName("rating");
     for (let i = 0; i < ratingButton.length; i++) {
       ratingButton[i].addEventListener("click", chooseRating);
     }
     generateRandom();
     fillColumn();
   }

   function generateRandom() {
     let randomCount = Math.floor(Math.random() * ALGORITHM.length);
     if (seen.includes(randomCount) && seen.length != 4) {
       generateRandom();
     } else {
       if (seen.length != 4) {
         seen.push(randomCount);
         set = ALGORITHM[randomCount];
         if (set == "0g" || set == "01gfp") {
           index = 0;
         } else {
           index = 10;
         }
       }
     }
   }


   function updateResults() {
     index++;
     count++;
     if (index <= 10) {
       populateResults();
       if (index == 10) {
          generateRandom();
       }
     }
     if (index > 10 && index <= 20) {
       populateResults();
       if (index == 20) {
          generateRandom();
       }
     }
     if (count == 41) {
       window.location = window.location + "end/" + userResponse;
     }
   }

   function startTimer() {
     timerId = setInterval(function() {
       if (seconds == 0) {
         clearInterval(timerId);
         timerId = null;
         seconds = 15;
         document.querySelector(".submit").disabled = true;
         updateResults();
       } else {
         timerMode = true;
         seconds--;
       }
       let time = document.getElementById("clock");
       time.textContent = seconds;
     }, 1000)
   }

   /*
   function start() {
    startTime = new Date();
    couting();
  }

  function couting() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    // get seconds
    seconds = Math.round(timeDiff);
    //console.log(seconds + " seconds");
    timeRemaining = 15 - seconds;
    document.getElementById("clock").innerHTML = timeRemaining;
    if (timeRemaining == 0) {
      clearInterval(timerId);
      timerId = null;
      document.querySelector(".submit").disabled = true;
      updateResults();
      console.error("time out");;
    }
    timerId = setInterval(function(){
      couting()
    //do what you need here
    }, 1000);
  }
  */
   function chooseRating() {
     let submitButton = document.querySelector(".submit");
     submitButton.disabled = false;
   }

   function handleRequest(data) {
     responseData = data;
     updateResults();
   }
   /*
   function updateResults() {
     //console.log(userResponse);
     index = index + 1;
     if (index <= 20) {
       //only 20 queries
       //generateResult();
       populateResults();
     } else {
        window.location = window.location + "end/" + userResponse;    // redirect
     }
   }
   */

   function populateResults() {
     // update search box placeholder
     let searchEngine = document.getElementById("search-word");
     searchEngine.placeholder = responseData[index][1][0];

     // display results, but clear all previous results first
     let resultInfo = document.querySelector(".resultInfo");
     resultInfo.innerHTML = "";
     for (let i = 0; i < 5; i++) {
       let title = document.createElement("a");
       let description = document.createElement("div");
       let link = document.createElement("div");
       title.className = "title";
       link.className = "url";
       description.className = "description";
       title.innerHTML = responseData[index][i][1];
       link.innerHTML = responseData[index][i][2];
       description.innerHTML = responseData[index][i][3];
       resultInfo.appendChild(title);
       resultInfo.appendChild(link);
       resultInfo.appendChild(description);
       //start couting
     }
     startTimer();
   }

  function fillColumn() {
    let column = document.querySelector(".resultInfo");
    column.innerHTML = "";
    let currentUrl = window.location.href;
    let url = currentUrl.substring(0, currentUrl.length - 5) + set + "/results/";
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(handleRequest)
      .catch(console.error);
  }

  /**
    * Checks to see if the data that is being fetched can be used.
    * @param {string} response = JSON data that was fetched from the API
    * @return {string} Returns the data that fits the condition
  */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " +
      response.statusText));
    }
  }

  function submit_form() {
    let submitButton = document.querySelector(".submit");
    submitButton.disabled = true;
    console.log("time took:" + seconds)
    //console.log("form submitted")
    //return selected rating value
    var rate = document.getElementsByName('rating');
    for(var i=1; i<rate.length; i++){
        if(rate[i].checked){
            console.log("user selects" + " " +i)
            userResponse += i.toString() //number
            //clear cache
            rate[i].checked = false;
        }
    }
    clearInterval(timerId)
    timerId = null;
    seconds = 15;
    updateResults();
  }
})();
