const fs = require('fs');
const be_wrote_file = fs.createWriteStream('./big.txt');

for (let iter = 0; iter < 10000000; iter++) {
    be_wrote_file.write('This file is will be pretty big file.\n');
}
be_wrote_file.end();