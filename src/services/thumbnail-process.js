import path from 'path'
import Promise from "bluebird"
import easyimg from 'easyimage'
import fs from 'fs'

const thumbnailFolder = "../thumbnails"

function createThumbnail(imagepath){
    
    let thumbnailPath = path.join(__dirname, thumbnailFolder, path.basename(imagepath));
    
    try {
        fs.statSync(thumbnailPath);
        return Promise.resolve([]);
    }
    catch(err){
        console.error('Error with statSync');
    } 
    
    easyimg.thumbnail({
        src:imagepath, 
        dst:thumbnailPath,
        width:250, height:250,
        x:0, y:0,
        quality: 80
    })
    .then(function(result){
        console.log(thumbnailPath)
    }, function(err){
        console.error(err);
    });
    
    return thumbnailPath;
}

createThumbnail(process.argv[2]);