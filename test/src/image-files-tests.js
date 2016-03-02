import test from 'tape'
import { ImageFiles } from '../../build/services/image-files'
import path from 'path'

test('Construct ImageFiles', (t)=>{
  t.plan(1);
  var imageFiles = new ImageFiles();
  t.notEqual(null, imageFiles);
});

test('Find images', (t)=>{
  t.plan(1);
  var user = process.env.HOME || process.env.USERPROFILE;
  var dropbox = path.join(user, 'dropbox', 'Camera Uploads');
  var imageFiles = new ImageFiles();

  var images = imageFiles.findImages(dropbox);

  t.ok(images.length > 0, 'Images were found');
});

test('Get Images and file details', (t)=>{
  t.plan(2);
  var user = process.env.HOME || process.env.USERPROFILE;
  var dropbox = path.join(user, 'dropbox', 'Camera Uploads');
  var imageFiles = new ImageFiles();

  var images = imageFiles.getImagesAndFileDetails(dropbox);

  t.ok(images.length > 0, 'Images were found');
  t.ok(images[0].file, 'Has file object');
});

// test('GetSavedFiles', (t) =>{
//   t.plan(1);
//
//   var imageFiles = new ImageFiles();
//   var files = imageFiles.getSavedFiles();
//
//   t.ok(files.length===0);
// });

test('getNewAndOld', (t) => {
  t.plan(4);

  var imageFiles = new ImageFiles();
  var images = imageFiles.getNewAndOld();

  t.ok(images.new.length > 0, 'Images were found');
  t.ok(images.new[0].path, "found path");
  t.ok(images.new[0].file, "found file");
  t.ok(images.new[0].fstat, "found fstat");
});
