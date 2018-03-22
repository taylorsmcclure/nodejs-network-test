// server.js simple nodejs express server
const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');

// load config.json and callback to setting vars
config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));
const nodeListen = config.nodeListen
const nodePort = config.nodePort
const fileName = config.fileName
const fileSize = config.fileSize

// function to get size of a file
function getFilesize(fileName) {
  stats = fs.statSync(fileName);
  fileSizeBytes = stats.size;
  console.log('Bytes written so far: %d', (fileSizeBytes));
  return fileSizeBytes
}

// recursive function to create an arbitraily large file full of zeros
function writeFile(bytesWritten, fileSize, fileName) {
  fs.open(fileName, 'a', (err, fd) => {
    if (err) throw err;
    // allocate a 1MB large buffer of zeros
    var buffer = new Buffer.alloc(1024 * 1024);
    // write/append buffer to the file
    fs.write(fd, buffer, 0, buffer.length, fileSize, (err) => {
      if (err) throw err;
      // close file to avoid leaks
      fs.close(fd, (err) => {
        if (err) throw err;
      });
      // call filesize function to get new size
      var bytesWritten = getFilesize(fileName);
      // recursively call this function until the bytesWritten < fileSize
      while(bytesWritten < fileSize) {
        return writeFile(bytesWritten, fileSize, fileName);
      }
      console.log('%s is ready to be downloaded', (fileName));
    });
  });
}
// init the function
writeFile(0, fileSize, fileName);

// log the request and output to terminal
app.use((req, resp, next) => {
  console.log(req.headers)
  next()
});

// handle getting root page
app.get('/', (req, resp) => {
  msg = util.format('Go to http://%s to test throughput.', req.connection.localAddress);
  resp.status(200).send(msg);
});

app.get('/test', (req, resp) => {
  var options = {
    root: __dirname
  };
  console.log('Serving %s to %s.', fileName, req.connection.remoteAddress);
  resp.sendFile(fileName, options, (err) => {
    if (err) throw err;
  });
});

app.listen(nodePort, nodeListen);
console.log(util.format('Server is listening at http://%s:%s/', nodeListen, nodePort));
