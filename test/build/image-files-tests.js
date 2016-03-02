'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _imageFiles = require('../../build/services/image-files');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('Construct ImageFiles', function (t) {
  t.plan(1);
  var imageFiles = new _imageFiles.ImageFiles();
  t.notEqual(null, imageFiles);
});

(0, _tape2.default)('Find images', function (t) {
  t.plan(1);
  var user = process.env.HOME || process.env.USERPROFILE;
  var dropbox = _path2.default.join(user, 'dropbox', 'Camera Uploads');
  var imageFiles = new _imageFiles.ImageFiles();

  var images = imageFiles.findImages(dropbox);

  t.ok(images.length > 0, 'Images were found');
});

(0, _tape2.default)('Get Images and file details', function (t) {
  t.plan(2);
  var user = process.env.HOME || process.env.USERPROFILE;
  var dropbox = _path2.default.join(user, 'dropbox', 'Camera Uploads');
  var imageFiles = new _imageFiles.ImageFiles();

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

(0, _tape2.default)('getNewAndOld', function (t) {
  t.plan(4);

  var imageFiles = new _imageFiles.ImageFiles();
  var images = imageFiles.getNewAndOld();

  t.ok(images.new.length > 0, 'Images were found');
  t.ok(images.new[0].path, "found path");
  t.ok(images.new[0].file, "found file");
  t.ok(images.new[0].fstat, "found fstat");
});