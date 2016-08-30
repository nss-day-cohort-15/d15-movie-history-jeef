"use strict";

let $ = require('jquery'),
    hb = require("./hbcontrols"),
    db = require("./db-interactions"),
    firebase = require("./firebaseConfig");



function getMovies(userID) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://cat-ladies-movie-history.firebaseio.com/movies.json?orderBy="uid"&equalTo="${userID}"`,
    }).done(function (movieData) {
      resolve(movieData);
    });
  });
}


function saveMovie(movieObj) {
  // console.log("fb 22 movie object", movieObj);
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://cat-ladies-movie-history.firebaseio.com/movies.json',
      type: 'POST',  // used for first time posting to DB
      data: JSON.stringify(movieObj),
      dataType: 'json'
    }).done(function (movieID) {
      resolve(movieID);
    });
  });
}


function deleteMovie(movieId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://cat-ladies-movie-history.firebaseio.com/movies/${movieId}.json`,
      type: 'DELETE'
    }).done(function (data) {
      resolve(data);
    });
  });
}



module.exports = {saveMovie, deleteMovie, getMovies};
