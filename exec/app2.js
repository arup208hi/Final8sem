const express = require('express');
const app = express();
const fs = require('fs');
const {exec} = require('child_process');

// File to be executed
// const command = 'python main.py';

// // Execute the script
// exec(command, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing script: ${error}`);
//         return;
//     }

//     // Print the output
//     console.log(`Script output:\n${stdout}`);

//     if (stderr) {
//         console.error(`Script error:\n${stderr}`);
//     }
// });

// 'download-pdf' endpoint that will trigger the download of the PDF file
app.get('/pdf', (req, res) => {
//     var stream = fs.createReadStream('assets/pdf');
//   var filename = "WhateverFilenameYouWant.pdf"; 
//   // Be careful of special characters

//   filename = encodeURIComponent(filename);
//   // Ideally this should strip them

//   res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
//   res.setHeader('Content-type', 'application/pdf');

//   stream.pipe(res);
var data =fs.readFileSync('output.pdf');
res.contentType("application/pdf");
res.send(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
