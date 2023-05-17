const express = require('express');
const app = express();
const fs = require('fs');
const {exec} = require('child_process');

// File to be executed
const command = 'python main.py';

// Execute the script
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error}`);
        return;
    }

    // Print the output
    console.log(`Script output:\n${stdout}`);

    if (stderr) {
        console.error(`Script error:\n${stderr}`);
    }
});

// 'download-pdf' endpoint that will trigger the download of the PDF file
app.get('/download-pdf', (req, res) => {
    const filePath = 'assets/pdf/output.pdf';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while reading the PDF file.');
        }

        res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
