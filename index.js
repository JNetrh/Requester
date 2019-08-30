const LineByLineReader = require('line-by-line');
const fs = require('fs');
const request = require('request');

let numberOfLines = 0;
let numberOfErrors = 0;
let numberOfSuccess = 0;
let successfulResponsesWithoutData = 0;

let path = 'urls.txt'

const myArgs = process.argv.slice(2);
if(myArgs.length > 0) {
  path = myArgs[0];
}
const timestamp = new Date().getTime();
const writeStream = fs.createWriteStream(`./results/${timestamp}.txt`);
const lr = new LineByLineReader(path);

lr.on('error', function (err) {
	console.log(err);
});

lr.on('line', function (line) {
	numberOfLines++;
  lr.pause();
  
  request({
    method: 'GET',
    uri: line,
    gzip: true,
  }, async (error, response, body) => {
    if(!error) {
      const dataJSON = JSON.parse(body);
      if(dataJSON.partners) {
        numberOfSuccess++;
        const result = `${line};${dataJSON.partners[0].kvpsid};${dataJSON.partners[0].brand};${dataJSON.partners[0].countryCode};${dataJSON.partners[0].address.city};${dataJSON.partners[0].name}\n`;
        console.log(result);
        try {
          await writeStream.write(result);
        } catch (error) {
          console.log(error);
        }
      }
      else {
        successfulResponsesWithoutData++;
      }
    }
  })
  .on('end', () => {
    lr.resume()
  })
  .on('error', error => {
    numberOfErrors++;
    console.log('error: ');
    console.log(error);
    lr.resume()
  })

});

lr.on('end', function () {
  console.log('---Process ended---');
  console.log('All Lines In File: ');
  console.log(numberOfLines);
  console.log('Succesful Responses From API: ');
  console.log(numberOfSuccess);
  console.log('Successful Responses Without Data: ');
  console.log(successfulResponsesWithoutData);
  console.log('Unsuccessful Requests: ');
  console.log(numberOfErrors);
  
});