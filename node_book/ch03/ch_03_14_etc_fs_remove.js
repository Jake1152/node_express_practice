const fs = require('fs').promises;


fs.readdir('./folder')
    .then((dir) => {
        console.log("Check folder contents.", dir);
        return fs.unlink('./folder/newFile.js');
    })
    .then(() => {
        console.log('Success remove file.');
        return fs.rmdir('./folder');
    })
    .then(() => {
        console.log('Success remove folder.');
    })
    .catch((err) => {
        console.error(err);
    })