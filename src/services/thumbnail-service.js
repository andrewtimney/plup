//import pro from 'child_process'
import path from 'path'
import Promise from "bluebird"
import easyimg from 'easyimage'

const thumbnailFolder = "../thumbnails"

export function createThumbnail(imagepath){
    
    let thumbnailPath = path.join(__dirname, thumbnailFolder, path.basename(imagepath));
    
    try{
        fs.statSync(thumbnailPath);
        return Promise.resolve([]);
    }
    catch(err){
        console.log('Error with statSync');
    } 
    
    return easyimg.thumbnail({
        src:imagepath, 
        dst:thumbnailPath,
        width:250, height:250,
        x:0, y:0,
        quality: 80
    })
    .then(function(result){
        // Success
    }, function(err){
        console.error(err);
    });
}

export function createThumbnailProcess(path){
  var pro = require('child_process');
  var crt = pro.spawn('node', ['./thumbnail-process.js'], { stdio: ['pipe'] });
  crt.stdout.on('data', function(buffer){
    console.log('data');
  });
  crt.stdout.on('end', function(){
    console.log('END', arguments);
    //event.sender.send('exif-complete', sorted);
  });
}