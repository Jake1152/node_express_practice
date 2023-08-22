const fs = require('fs').promises;

fs.copyFile('./elemental.txt', 'writeme4.txt')
    .then(() => {
        console.log("Success copy");
    })
    .catch((err) => {
        console.error(err);
    })