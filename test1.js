let express=require('express');
let app=express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("endterm");
    dbo.collection("dropdowndatas").find({}, { projection: { _id: 0 } }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      app.get("/ppp", (req, res) => {
        const ss = "hello";
        res.render("ppp",{data:JSON.stringify(result)} )
    });
// res.render(ppp, {data : result});
});
});
// app.get("/ppp", (req, res) => {
//     const ss = "hello";
//     res.render("ppp",{data: ss} )
// });
app.listen(5000);
