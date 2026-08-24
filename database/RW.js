const path = require('path');
const fs = require('fs').promises;

const PathToFile = path.join(__dirname, 'data.json');

async function AppendData(data) {
    await fs.appendFile(PathToFile, data, 'utf8');
}

async function WriteData(data) {
    await fs.writeFile(
        PathToFile,
        JSON.stringify(data, null, 2),
        'utf8'
    );
}

async function ReadData() {
    const data = await fs.readFile(PathToFile, 'utf8');

    return JSON.parse(data);
}

module.exports = {
    WriteData,
    ReadData,
    AppendData
};