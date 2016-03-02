import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import {getPictures} from './image-indexer'

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
    var savedFiles = getPictures();

    this.pictureFolders.forEach((folder)=>{
      allFiles = allFiles.concat(this.getImagesAndFileDetails(folder));
    })

    var newFiles = this.getNewFiles(savedFiles, allFiles);

    return {
      new: newFiles,
      old: savedFiles
    }
  }

  getNewFiles(saved, allFiles){
  	 return _.filter(allFiles, function(file){
  		 return !_.find(saved, function(savedFile){
  			 return savedFile.path === file.path;
  		 });
  	 });
  }
}
