var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var XLSX = require("xlsx");
const cors = require("cors");

const os = require("os");
const multer = require("multer");
const upload = multer({ dest: os.tmpdir() });

mongoose
  .connect("mongodb://localhost:27017/anirban1", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error", error);
  });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var excelSchema = new mongoose.Schema({
  "Name of the Program": {
    type: String,
    required: [true, "You entered wrong name of program"]
  },
  "Paper Title": String,
  "Paper Code": String,
  "Semester": String,
  "Question": mongoose.Schema.Types.Mixed,
  "Course Outcome": String,
  "Marks": String,
});

var excelModel = mongoose.model("exceldata", excelSchema);
var schoolValue = new mongoose.Schema({
  "num": Number,
  "Name of the program": String
})
var schooldata = mongoose.model("schooldata", schoolValue);
var dropdownValue = new mongoose.Schema({
  "num": Number,
  "Department": String,
  "Paper title and code": String,
  "Semester": String
});
var dropdowndata = mongoose.model("dropdowndata", dropdownValue);

app.get("/", (req, res) => {
  excelModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("faculty", { data: data });
    }
  });
});

app.get("/dropdown", (req, res) => {
  res.render("dropdown");
});
app.get("/school", (req, res) => {
  res.render("school");
});
app.get("/soet", (req, res) => {
  res.render("soet");
});
app.get("/sobs", (req, res) => {
  res.render("sobs");
});
app.get("/image", (req, res) => {
  res.render("image");
});

app.get("*", (req, res) => {
  res.render("error");
});

app.post("/", upload.single("excel"), (req, res) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var x = 0;
  sheet_namelist.forEach((element) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    excelModel.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
    x++;
  });
  res.redirect("/");
});
app.post("/school", (req, res) => {
  var { NOP } = req.body;
  mongoose.connection.db
    .collection("schooldatas")
    .count(function (err, count) {
      console.dir(err);
      console.dir(count);

      if (count == 0) {
        var value = new schooldata({
          "num": 1,
          "Name of the program": NOP
        });
        value.save();
      } else {
        const updateDocument = async (num) => {
          const result = await schooldata.updateOne(
            { num },
            { $set: { 
              "Name of the program": NOP
            } }
          );
        };
        updateDocument(1);
      }
    });
  if(NOP == "SOET"){
    res.redirect("/soet")
  }else{
    res.redirect("/sobs")
  }
  
});

app.post("/soet", (req, res) => {
  var { Department, Title, Semester } = req.body;
  mongoose.connection.db
    .collection("dropdowndatas")
    .count(function (err, count) {
      console.dir(err);
      console.dir(count);

      if (count == 0) {
        var value = new dropdowndata({
          "num": 1,
          "Department": Department,
          "Paper title and code": Title,
          "Semester": Semester
        });
        value.save();
      } else {
        const updateDocument = async (num) => {
          const result = await dropdowndata.updateOne(
            { num },
            { $set: { 
              "Department": Department,
              "Paper title and code": Title,
              "Semester": Semester 
            } }
          );
        };
        updateDocument(1);
      }
    });
  res.redirect("/school")
  
});
app.post("/sobs", (req, res) => {
    var { Department, Title, Semester } = req.body;
    mongoose.connection.db
      .collection("dropdowndatas")
      .count(function (err, count) {
        console.dir(err);
        console.dir(count);
  
        if (count == 0) {
          var value = new dropdowndata({
            "num": 1,
            "Department": Department,
            "Paper title and code": Title,
            "Semester": Semester
          });
          value.save();
        } else {
          const updateDocument = async (num) => {
            const result = await dropdowndata.updateOne(
              { num },
              { $set: { 
                "Department": Department,
                "Paper title and code": Title,
                "Semester": Semester 
              } }
            );
          };
          updateDocument(1);
        }
      });
    res.redirect("/school")
    
  });
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("server run at " + port));
