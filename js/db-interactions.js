"use strict";

let $ = require('jquery'),
    hb = require("./hbcontrols"),
    login = require("./user"),
    userId = "",
    firebase = require("./firebaseConfig");

function searchMovies(searchQuery) {
  return new Promise( function (resolve, reject) {
    $.ajax({
      url: `http://www.omdbapi.com/?s=${searchQuery}&y=&plot=short&type=movie&r=json&page=1`
    }).done(function(movieData) {
      console.log("movieData", movieData);
      resolve(movieData);
    });
  });
}

function secondMovieCall(movieData){
    Promise.all([
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[0]}&y=&pvlot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[1]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[2]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[3]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[4]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[5]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[6]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[7]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[8]}&y=&plot=short&r=json`,
    }),
    $.ajax({
      url: `http://www.omdbapi.com/?t=${movieData[9]}&y=&plot=short&r=json`,
    })
    ]).then(function(data){
    hb.displayAll(data);
      // console.log(data);
    });
}



function buildMovieObject (movieID, userId) {
  let movieObj = {
    Title: $(`#movieTitle${movieID}`).text(),
    Year: $(`#movieYear${movieID}`).text(),
    Actors: $(`#movieActors${movieID}`).text(),
    Rating: $(`#movieRating${movieID}`).text(),
    Poster: $(`#moviePicture${movieID}`).attr('src'),
    uid: userId,
    movieID: movieID,
    fbId: null
  };
  // console.log("this is a moviemovieObj", movieObj);
  return movieObj;
}


module.exports = { searchMovies, secondMovieCall, buildMovieObject };
