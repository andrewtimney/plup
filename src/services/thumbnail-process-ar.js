import path from 'path'
import easyimg from 'easyimage'
import {getSavedPictures} from './image-indexer'
import Q from 'q'
import fs from 'fs'
const thumbnailFolder = "../thumbnails"
const thumbnailCount = 30
const width = 250
const height = 250
const quality = 80

function createThumbnail(){
    getSavedPictures((err, savedFiles)=>{
        try{
            if(err) {
                process.stdout.write('error getting pictures '+err);
            }else{
                process.stdout.write(' WIT '+savedFiles.substring(0, 10));
                process.stdout.write(' WIT '+savedFiles.substring(-10, 10));
                let pics = JSON.parse(savedFiles);
                process.stdout.write('pics '+pics.length);
                // resize(pics);
            }
        }
        catch(er){
          process.stdout.write('Damn error '+er);  
        }
    });
}

function resize(pics){
    
    let current = [];
    let top = pics.slice(-thumbnailCount);
    let sliced = pics.slice(0, -thumbnailCount);
    
    top.forEach((pic)=>{
    
        let thumbnailPath = path.join(__dirname, thumbnailFolder, pic.file);
        
        try{
            fs.statSync(thumbnailPath);
            process.stdout.write('PRESENT');
            return;
        }
        catch(err){
        } 
        console.log('doing');
        var prom = easyimg.thumbnail({
            src:pic.path, 
            dst:thumbnailPath,
            width:width, height:height,
            x:0, y:0,
            quality: quality
        })
        pic.thumbnail = thumbnailPath;
        console.log(thumbnailPath);
        current.push(prom);
        
    });
    
    Q.all(current)
    .then(()=>{
      if(top && top.length){
        process.stdout.write(JSON.stringify(top));
        resize(sliced);
      }
    });
}

createThumbnail();