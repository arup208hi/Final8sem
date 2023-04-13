function generatePaper(){
    // var doc = new jsPDF()
    // doc.text('Hello world!', 10, 10)
    // doc.save('a5.pdf')
    // console.log("hello arup")
    document.write("Function has been called!");
}

// generatePaper();
module.exports={
    optionClickFunc: generatePaper
};