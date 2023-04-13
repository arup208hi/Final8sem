const fs = require('fs')
fs.readFile("mynewfile1.txt", (err, inputD) => {
   if (err) throw err;
   for (let i in inputD.toString()){
      console.log(i);
   }
})