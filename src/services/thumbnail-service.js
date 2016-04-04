//import pro from 'child_process'
import path from 'path'
import Promise from "bluebird"

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
        width:500, height:500,
        x:0, y:0,
        quality: 90
    })
      .then(function(result){
        // Success
    }, function(err){
        console.error(err);
    });
}