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
    let pics = [];
    try {
        pics = getSavedPictures();
        resize(pics);
    }
    catch(err){
        console.log('error getSavedPictures');
    } 
}

function resize(pics){
    
    let current = [];
    let top = pics.slice(-thumbnailCount);
    let sliced = pics.slice(0, -thumbnailCount);
    
    top.forEach((pic)=>{
    
        let thumbnailPath = path.join(__dirname, thumbnailFolder, pic.file);
        
        try{
            fs.statSync(thumbnailPath);
            console.log('Present')
            return;
        }
        catch(err){
        } 
        
        var prom = easyimg.thumbnail({
            src:pic.path, 
            dst:thumbnailPath,
            width:width, height:height,
            x:0, y:0,
            quality: quality
        })
        console.log(thumbnailPath);
        current.push(prom);
        
    });
    
    Q.all(current)
    .then(()=>{
      process.stdout.write(JSON.stringify(top));
      resize(sliced);
    });
}

createThumbnail();