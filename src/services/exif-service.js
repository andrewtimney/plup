import Promise from "bluebird"
import ExifImage from "exif"
import moment from 'moment'
import geolib from 'geolib'

export default function getExif(imagePath){
    return new Promise((resolve, reject)=>{
        try{
            new ExifImage({image: imagePath}, (error, exifData)=>{
                if(error){
                    resolve();
                }else{
                    resolve(slimDown(exifData));
                } 
            });
        }
        catch(error){
            reject(error);
        }
    });
}

function slimDown(exif){
    
    if (exif.exif.DateTimeOriginal || exif.exif.CreatedDate) {
        exif.DateTimeOriginal = moment(exif.exif.DateTimeOriginal || exif.exif.CreatedDate, "YYYY:MM:DD HH:mm:SS");
        exif.date = exif.DateTimeOriginal.format('DD/MM/YYYY');
    }
    
    if (exif.exif.ExifImageHeight && exif.exif.ExifImageWidth) {
        exif.orientation = (exif.exif.ExifImageWidth > exif.exif.ExifImageHeight) ? 0 : 1;
    } else {
        exif.orientation = 0;
    }
     
    if (exif.gps && exif.gps.GPSLatitude && exif.gps.GPSLongitude) {
        try {
            var lat = geolib.sexagesimal2decimal(GPSCoordToString(exif.gps.GPSLatitude, exif.gps.GPSLatitudeRef));
            var lon = geolib.sexagesimal2decimal(GPSCoordToString(exif.gps.GPSLongitude, exif.gps.GPSLongitudeRef));
            var point = { latitude: lat, longitude: lon };
            exif.point = point;
        }
        catch (error) {
            console.log('GPS Error', error);
        }
    }
      
     return exif; 
}

function GPSCoordToString(coords, ref) {
  return coords[0] + "\u00B0 " + coords[1] + "' " + coords[2] + "\" " + ref;
}