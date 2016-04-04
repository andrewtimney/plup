import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {getSavedPictures} from './image-indexer'
import getExif from './exif-service'
import moment from 'moment'
import Promise from "bluebird"

export class ImageFiles {

  constructor(){
    var user = process.env.HOME || process.env.USERPROFILE;
    var dropbox = path.join(user, 'Pictures');
    var pictures = path.join(user, 'dropbox', 'Camera Uploads');
    this.pictureFolders = [dropbox, pictures];
  }

  findImages(folder){
    var pictureFiles = fs.readdirSync(folder);
  	var images = pictureFiles.filter(this.filterImages);
    return images;
  }

  filterImages(file){
    return file.indexOf('.jpg') !== -1 ||
      file.indexOf('.jpeg') !== -1 ||
      file.indexOf('.png') !== -1;
  }

  getImagesAndFileDetails(folder){
    return this.findImages(folder).map((img)=>{
      return {
            file: img,
  			path: path.join(folder, img), //TODO: FIX FOLDER
  			fstat: fs.statSync(path.join(folder, img))
      }
    });
  }

  getNewAndOld(){
    var allFiles = [];
    var savedFiles = getSavedPictures();

    var exifPromies = [];
    this.pictureFolders.forEach((folder)=>{
        var newFiles = this.getImagesAndFileDetails(folder).map((picture)=>{
            picture.dateTime = moment(0);
            picture.date = '';
            if(picture.path.indexOf(".png") === -1){
                exifPromies.push(getExif(picture.path)
                    .then((exifData)=>{
                        if(exifData){
                            picture.exif = exifData;
                            this.getCreatedDate(picture);
                        }
                        return picture;
                    }));
            }
            return picture;
        });
        allFiles = allFiles.concat(newFiles);
    });

    return Promise.all(exifPromies)
        .then((files)=>{
             return _.sortBy(savedFiles.concat(files), (file)=>{
                return -file.dateTime.valueOf();
            })
        });
  }

  getNewFiles(saved, allFiles){
  	 return _.filter(allFiles, function(file){
  		 return !_.find(saved, function(savedFile){
  			 return savedFile.path === file.path;
  		 });
  	 });
  }
  
  getCreatedDate(picture){
      if (picture.exif.exif.DateTimeOriginal ||picture.exif.CreatedDate) {
        picture.dateTime = moment(picture.exif.exif.DateTimeOriginal || picture.exif.exif.CreatedDate, "YYYY:MM:DD HH:mm:SS");
        picture.date = picture.dateTime.format('DD/MM/YYYY');  
    }
  }
 
}
