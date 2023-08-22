const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then(() => {
        return Promise.reject('Already exist the folder.\n');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('No folder.\n');
            return fs.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('Success made folder.\n');
        return fs.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log('Success made empty folder.\n', fd);
        fs.rename('./folder/file.js', './folder/newfile.js');
    })