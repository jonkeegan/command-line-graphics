// command-line-graphics by Jon Keegan 
// this is some sample code created for my NICAR 2016 talk "Command Line Graphics"
// Twitter: @jonkeegan
// Github: https://github.com/jonkeegan
// Repo: https://github.com/jonkeegan/command-line-graphics

var fs = require('fs');
var util = require("util");

// this is the full path to the location of the full size pill images
var directory = "pill_images";

// this is the full path to the location of where your matching json files will be saved
var json_dir = "pill_json";

fs.readdir(directory, function(err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }
    files.forEach(function(file, index) {
    	// The original imageMagcik command we know works...
    	//
    	// Here's what this command will do when executed...
		// - first, we reduce the number of colors in the image to 16: -dither Riemersma -colors 16
		// - then we spit out a histogram: a list of the colors, and their counts: -format %c histogram:info:-
		// - then we filter that list to exclude any lines with black or grey: grep -v -E "#000000|#767676"
		// - then we turn that into a simplfied CSV list of just the 2 columns we need (count and color): in2csv -f fixed -s histogram_schema.csv 
		// - then we sort that data descending on the count: csvsort -r -c 1 
		// - then we save a JSON file with the quantified colors for each image: csvjson > '+json_dir+"/"+file.split(".")[0]+".json

    	//convert blue_pill.jpg -dither Riemersma -colors 16 -format %c histogram:info:- | grep -v -E "#000000|#767676" | in2csv -f fixed -s histogram_schema.csv | csvsort -r -c 1 | sed -n 2p | awk -F',' '{print $2}'
         var this_im_command = 'convert '+directory+"/"+file+' -dither Riemersma -colors 16 -format %c histogram:info:- | grep -v -E "#000000|#767676" | in2csv -f fixed -s histogram_schema.csv | csvsort -r -c 1 | csvjson > '+json_dir+"/"+file.split(".")[0]+".json";
      
    // I haven't gotten this to work yet, but apparently you CAN just pass a system
    // command to execute directly through node, but I couldnt get it working.  
    // So for this example, we're just spitting out a list of imageMagick coammnds as a shell script.

       console.log(this_im_command);
    });
});