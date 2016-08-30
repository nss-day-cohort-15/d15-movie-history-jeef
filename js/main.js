"use strict";

let $ = require('jquery'),
    db = require("./db-interactions"),
    fb = require("./fb-interactions"),
    hb = require("./hbcontrols"),
    login = require("./user"),
    firebase = require("firebase/app"),
    userId = "",
    myMovies = [],
    movieResultsArray = [];


function loadMoviesToDOM() {
 // var userId = firebase.auth().userId.uid;
  $("hb-main").html("");
  fb.getMovies()
  .then(function(movieData){
    var movieIdArr = Object.keys(movieData);
    movieIdArr.forEach(function(key, val){
      movieData[key].id = key;
    });
    console.log("movie obj with ID added", movieData);
    hb.displayAll(movieData);
  });
}
//***************************************************************
// User login section. Should ideally be in its own module
$("#loginLink").click(function() {
  console.log("clicked auth");
  login()
  .then(function (result) {
    // var token = result.credential.accessToken;
    let user = result.user;
    console.log("logged in user", user.uid);
    userId = user.uid;//uid is the key to building a proper firebase app!
    loadMoviesToDOM();
    // console.log("logged in user", user.uid);
    // userId = user.uid;
    // loadSongsToDOM();
  });
});


//****************************************************************


$("a").click(function(e){
    e.preventDefault();
});

$("#searchMovies").click(function() {
  let searchQuery = $("#movieTitleInput").val();
  console.log("clicked search");
  debugger;
  db.searchMovies(searchQuery).then( function (movieTitles) {
    var movieTitlesArray = [];
    $.each(movieTitles.Search, function (index, key) {
      movieTitlesArray.push(key.Title);
    });

    for (var i = 0; i < movieTitlesArray.length; i++ ) {
      movieTitlesArray[i] = movieTitlesArray[i].replace(/\s/g, '+');
    }

      console.log(movieTitlesArray);
      db.secondMovieCall(movieTitlesArray);
  });

});





//************ was working on comparing firebase movie ID to
//************ OMBD movie ID, checking if they were the same,
//************ and omitting duplicates.  Didn't finish

// $("#searchMovies").click(function() {
//   myMovies = [];
//   let searchQuery = $("#movieTitleInput").val();
//   console.log("clicked search");

//    fb.getMovies()
//     .then(function(movieData){
//       $.each(movieData, function(key, val) {
//         $.each(val, function (moreKeys, moreVals) {
//           if (moreKeys === "movieID") {
//             myMovies.push(moreVals);
//           }
//         });
//       });
//    }).then(function () {
//     db.searchMovies(searchQuery).then( function (movieTitles) {
//       var movieTitlesArray = [];
//       for (var j = 0; j < movieTitles.Search.length; j++) {
//         var a = movieTitles.Search[j].imdbID;
//         for (var h = 0; h < myMovies.length; h++) {
//           var b = myMovies[h];
//           if (a === b) {
//             console.log("match", a, b);
//           } else {
//             console.log(movieTitles.Search[j].Title);
//           }
//         }
//       }

//       $.each(movieTitles.Search, function (index, key) {
//         movieTitlesArray.push(key.Title);
//       });

//       for (var i = 0; i < movieTitlesArray.length; i++ ) {
//         movieTitlesArray[i] = movieTitlesArray[i].replace(/\s/g, '+');
//       }

//         console.log(movieTitlesArray);
//         db.secondMovieCall(movieTitlesArray);
//     });
//    });
// });
//*******************************************




$(document).on("click", ".addButton", function() {
  let movieID = $(this).data("add-id");
  let movieObject = db.buildMovieObject(movieID, userId);
  fb.saveMovie(movieObject);
  console.log("main 60 movie saved", movieObject);
});

$(document).on("click", ".deleteChip", function() {
  let movieID = $(this).data("delete-id");
  console.log("movieID", movieID);
    fb.deleteMovie(movieID)
    .then(function(data){
    loadMoviesToDOM();
  });
});
