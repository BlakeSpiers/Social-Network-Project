const fs = require('fs');
const fileName = "target.txt";

const errorHandler = (err) => console.log(err);

const dataHandler = (data) => console.log(data.toString());

fs.readFile(fileName, (err, data) => {
	if(err)	errorHandler(err);
	dataHandler(data);
});

console.log("Node js async programming ... ?");