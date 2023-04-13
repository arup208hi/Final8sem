var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const express = require("express");
const app = express();
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("endterm");
    dbo.collection("dropdowndatas").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
  });
});