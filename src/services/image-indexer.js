import fs from 'fs'
import _ from 'lodash'
import moment from 'moment'
import path from 'path'

const indexFilePath = '../indexed-pics.json'

export function getSavedPictures(){
  try {
    var pics = require(indexFilePath);
    return pics;
  }
  catch(e){
  }
  return [];
}

export function savePictures(pics) {
  var sorted = _.sortBy(pics, function (pic) {
    if(pic.DateTimeOriginal){
      return moment(pic.DateTimeOriginal).valueOf();
    }
    return 0;
  }).reverse();

  var stringed = JSON.stringify(sorted);
  
  fs.writeFile(path.join(__dirname, indexFilePath), stringed, 'utf8', function (err) {
    if (err) {
      console.error('Could not save indexed pics json', err);
    }
  });
}
