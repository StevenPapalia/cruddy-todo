const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function(err, id) {

    fs.writeFile(exports.dataDir.concat('/', id), {id, text}, (err) => {
      if (err) {
        throw ('error writing counter');
      } else {
        console.log('amost there');
        callback(null, id);
      }
    });


  });
  console.log('id:', id);
  items[id] = text;
  // fs.writefile with name of id.txt
  // fs.writeFile(exports.dataDir.concat('/', id), {id, text}, (err) => {
  //   if (err) {
  //     throw ('error writing counter');
  //   } else {
  //     console.log('amost there');
  //     callback(null, id);
  //   }





  // exports.getNextUniqueId = (callback) => {
  //   // GOAL: WriteData(ReadData+1)
  //   // readCounter: input: callback
  //   // callback: err, fileData
  //   // write(read+1, callback); WRONG
  //   //read(write(readValue+1)); RIGHT
  //   readCounter( (err, fileData) => {
  //     var count = fileData + 1;
  //     writeCounter( count, (err) => {
  //       callback(err, zeroPaddedNumber(count));
  //     });
  //   });
  // };




  // fs.writeFile(exports.counterFile, counterString, (err) => {
  //   if (err) {
  //     throw ('error writing counter');
  //   } else {
  //     callback(null, counterString);
  //   }
  // });


  // write(id, call)
  // counter.writeCounter(id, callback( null, {id, text} ) );
  //callback(null, { id, text });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
