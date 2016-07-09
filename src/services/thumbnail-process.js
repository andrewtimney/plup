import path from 'path'
import Promise from "bluebird"
import easyimg from 'easyimage'
import fs from 'fs'

const thumbnailFolder = "../thumbnails"

function createThumbnail(imagepath){
    
    let thumbnailPath = path.join(__dirname, thumbnailFolder, path.basename(imagepath));
    
    try {
        fs.statSync(thumbnailPath);
    }
    catch(err){
        //process.stdout.write('Error with statSync');
        process.stdout.write(thumbnailPath);
        return;
    } 
    
    easyimg.thumbnail({
        src:imagepath, 
        dst:thumbnailPath,
        width:250, height:250,
        x:0, y:0,
        quality: 80
    })
    .then(function(result){
        process.stdout.write(thumbnailPath);
    }, function(err){
        //process.stdout.write(err);
    });
}

createThumbnail(process.argv[2]);