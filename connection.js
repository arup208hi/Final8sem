// const express = require("express");
// localStorage.setItem("lastname", "Smith");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("endterm");
  dbo.collection("dropdowndatas").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    // sessionStorage.setItem(result);
    // localStorage.setItem("dropdown", JSON.stringify(result));
    // for (const [key, value] of Object.entries(result)) {
    //   // console.log(key, value);
    //   sessionStorage.setItem(key, value);
    //   // localStorage.setItem(key, value);
    // }

    // let lastname = localStorage.getItem("Department");
    // console.log(lastname);

    // var result1 = [];
    // var keys = Object.keys(result);
    // keys.forEach(function(key){
    //     // result1.push(result[key]);
    //     console.log(result[key]);

    // const data = localStorage.getItem("dropdown");
    // console.log("data: ", JSON.parse(data));

    db.close();
    // var user = sessionStorage.getItem("Department");
    // var user = localStorage.getItem("dropdown".);
    // console.log();

  });
  // return result1;
});

// var user = sessionStorage.getItem("Department");
// // var user = localStorage.getItem("dropdown");
// console.log(user);

// let lastname = localStorage.getItem("Department");
// console.log(lastname);
