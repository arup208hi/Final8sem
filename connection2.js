const mongoose = require("mongoose");
const {excelModel, dropdowndata, schooldata} = require("./app")
var tmp = require('tmp');
var fs = require('fs');

function generatePaper(){
mongoose.connect('mongodb://localhost:27017/arup3',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

var dbcourse = [];
var xlcourse = [];
dropdowndata.find({ num: 1 })
.then(data => {
    // console.log("Database Courses:")
    // console.log(data);

    // Putting all course id's in dbcourse array
    // data.map((d, k) => {
    //     dbcourse.push(d._id);
    // })

    let entries = Object.entries(data);
    // dbcourse.push(JSON.stringify(entries));
    let str1 = JSON.stringify(entries);
    let length = str1.length;
    // console.log(str1);
    let str2 = str1.substring(6,162);
    // console.log(str2);
    let str3 = JSON.parse(str2);
    // console.log(str3)
    dbcourse.push(str3)
    // console.log(dbcourse[0]['Department'])
    // console.log(dbcourse);
    // var str = dbcourse[0]
    // console.log(str)
    // for (var i in dbcourse) 
    // {
    // //    console.log("row " + i);
    //    for (var j in dbcourse[i]) 
    //      {
    //       console.log(JSON.stringify(dbcourse[i][j]));
    //      }
    // }

    // Getting students who are enrolled in any
    // database course by filtering students
    // whose courseId matches with any id in
    // dbcourse array


    excelModel.find({ Department: { $in: dbcourse[0]['Department'] }})
        .then(data => {
            // console.log("Students in Database Courses:")
            // console.log(data);
            for (let i in data){
                // console.log(data[i]["Question"])
                fs.appendFile('mynewfile1.txt', data[i]["Question"], function (err) {
                    if (err) throw err;
                  });
            }



            // tmp.file(function (err, path, fd, cleanupCallback) {
            //     if (err) throw err;
            
            //     console.log("File: ", path);
            //     console.log("Filedescriptor: ", fd);
            //     fs.writeFileSync(path, "Hello world!")
            // });
            // let entries = Object.entries(data);
            // dbcourse.push(JSON.stringify(entries));
            // let str4 = JSON.stringify(entries);
            // let x = (str4.length) - 6
            // let str5 = JSON.substring(6, x)
            // console.log(str5)
            // let length = str1.length;
            // // console.log(str1);
            // let str2 = str1.substring(6,162);
            // // console.log(str2);
            // let str3 = JSON.parse(str2);
            // // console.log(str3)
            // dbcourse.push(str3)
        })
        .catch(error => {
            console.log(error);
        })
    // excelModel.find({ Department: { $in: dbcourse[0]['Department'] }}, function (err, docs) {
    //     if (err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(docs);
    //     }
    // });
})
.catch(error => {
    console.log(error);
})
}

// console.log(dbcourse);