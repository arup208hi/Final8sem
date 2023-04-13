const xlsx = require('xlsx');

const filepath = process.argv.slice(2)[0];
const workbook = xlsx.readFile(filepath);
const worksheet = workbook.sheets[workbook.SheetNames[0]];

const posts = []
let post = {};

// for(let cell in )