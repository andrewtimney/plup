import Promise from "bluebird"
import ExifImage from "exif"

export default function getExif(imagePath){
    return new Promise((resolve, reject)=>{
        try{
            new ExifImage({image: imagePath}, (error, exifData)=>{
                if(error){
                    resolve();
                }else{
                    resolve(exifData);
                } 
            });
        }
        catch(error){
            reject(error);
        }
    });
}
