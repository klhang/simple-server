const fs = require('fs');
const filePath = './stores.json';
let storeObject = {
    k3: 'v3',
    k4: 'v4'
};

function isFileExists(path, callback) {
    fs.access(path, fs.constants.R_OK, (err) => {
        if(err) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    })
}

isFileExists(filePath, (err, fileExists) => {
    if (!fileExists) {
        fs.appendFile(filePath, JSON.stringify(storeObject, null, 2), (err)=> {
            if (err) console.log(err);
        })
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) console.log(err);
            if (data) {
                console.log(data);
                const dataObj = JSON.parse(JSON.stringify(data, 'utf-8'));
                storeObject = dataObj;
                console.log(storeObject);
            }
        })
    }
});