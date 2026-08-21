const path = require('path');
const fs = require('fs');
const PathToFile = path.join(__dirname, "data.json")

function WriteData(data){
    fs.appendFile(PathToFile,data, ()=>{
        console.log("Data added");
    })
}

 function ReadData() {
    const data =  fs.readFile(PathToFile, "utf8")
    return JSON.parse(data);
}

module.exports = {
    WriteData,
    ReadData
}