// command-line-graphics by Jon Keegan 
// this is some sample code created for my NICAR 2016 talk "Command Line Graphics"
// Twitter: @jonkeegan
// Github: https://github.com/jonkeegan
// Repo: https://github.com/jonkeegan/command-line-graphics

var ExifImage = require('exif').ExifImage;
var fs = require('fs');
// define the directory full of images we want to examine...
var directory = "samples/";
var all_data = [];
// Loop through all the files in the directory
fs.readdir(directory, function(err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    var fileCount = files.length;
    files.forEach(function(file, index) {
        if (file != '.DS_Store' && file != '..' && file != '.') { // skip these files...
            try {
                new ExifImage({
                    image: directory + file
                }, function(error, exifData) {
                    if (error)
                        console.log();
                    else
                        var this_metadata = {
                            "filename": file,
                            "metadata": exifData
                };
                    all_data.push(this_metadata);
                    if (index == fileCount - 1) {
                        // console.log("index: "+index)
                        console.log(JSON.stringify(all_data));
                    }
                });
            } catch (error) {
                console.log('Error: ' + error.message);
            }
        }
    });
});
