// command-line-graphics by Jon Keegan 
// this is some sample code created for my NICAR 2016 talk "Command Line Graphics"
// Twitter: @jonkeegan
// Github: https://github.com/jonkeegan
// Repo: https://github.com/jonkeegan/command-line-graphics
var fs = require('fs');
var util = require("util");
var _ = require('underscore');
var directory = "pill_images";
var json_dir = "pill_json";
var jumbo_object = [];

process_files();

function cleanColors(theColors) {
    // this function will take an array of sorted hex color values, check to make sure the first color is not grey, then return the dominant color
    if (theColors[0] != undefined) {
        var first_color = theColors[0];
        var this_color = first_color;
        /* Get the hex value without hash symbol. */
        var hex = this_color.substring(1);
        /* Get the RGB values to calculate the Hue. */
        var num_r = parseInt(hex.substring(0, 2), 16);
        var num_g = parseInt(hex.substring(2, 4), 16);
        var num_b = parseInt(hex.substring(4, 6), 16);
        /* Get the RGB values to calculate the Hue. */
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;
        /* Getting the Max and Min values for Chroma. */
        var max = Math.max.apply(Math, [r, g, b]);
        var min = Math.min.apply(Math, [r, g, b]);
        /* Variables for HSV value of hex color. */
        var chr = max - min;
        var hue = 0;
        var val = max;
        var sat = 0;
        if (val > 0) {
            /* Calculate Saturation only if Value isn't 0. */
            sat = chr / val;
            if (sat > 0) {
                if (r == max) {
                    hue = 60 * (((g - min) - (b - min)) / chr);
                    if (hue < 0) {
                        hue += 360;
                    }
                } else if (g == max) {
                    hue = 120 + 60 * (((b - min) - (r - min)) / chr);
                } else if (b == max) {
                    hue = 240 + 60 * (((r - min) - (g - min)) / chr);
                }
            }
        }
        if (hue > 0 && sat > 0) { // this checks to make sure it's not grey...
            var dominant_color = theColors[0];
        } else {
            var dominant_color = theColors[1];
        }
        return dominant_color;
    }
}

function add_dominant_color(theData) {
    var new_data = [];
    _.each(theData, function(value, index) {
        var the_colors = value.colors;
        var theDominantColor = cleanColors(the_colors);
        var dominant_color_data = hex_to_hsb(theDominantColor);
        var this_data = {
            'name': value.name,
            'colors': value.colors,
            'dominant': dominant_color_data
        };
        new_data.push(this_data);
    });
    return new_data;
}

function hex_to_hsb(theColor) { // this will take a single hex color and return an object with the original hex , the hue, the saturation and the value
    if (theColor != undefined) {
        var hex = theColor.substring(1);
        /* Get the RGB values to calculate the Hue. */
        var num_r = parseInt(hex.substring(0, 2), 16);
        var num_g = parseInt(hex.substring(2, 4), 16);
        var num_b = parseInt(hex.substring(4, 6), 16);
        /* Get the RGB values to calculate the Hue. */
        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;
        /* Getting the Max and Min values for Chroma. */
        var max = Math.max.apply(Math, [r, g, b]);
        var min = Math.min.apply(Math, [r, g, b]);
        /* Variables for HSV value of hex color. */
        var chr = max - min;
        var hue = 0;
        var val = max;
        var sat = 0;
        if (val > 0) {
            /* Calculate Saturation only if Value isn't 0. */
            sat = chr / val;
            if (sat > 0) {
                if (r == max) {
                    hue = 60 * (((g - min) - (b - min)) / chr);
                    if (hue < 0) {
                        hue += 360;
                    }
                } else if (g == max) {
                    hue = 120 + 60 * (((b - min) - (r - min)) / chr);
                } else if (b == max) {
                    hue = 240 + 60 * (((r - min) - (g - min)) / chr);
                }
            }
        }
        var colors_to_return = {
            'hex': theColor,
            'hue': hue,
            'sat': sat,
            'val': val
        }
        return colors_to_return;
    }
}
var color_sort = function(a, b) {
    // this will sort by saturation....
    // return parseFloat(b.dominant.sat) - parseFloat(a.dominant.sat)
    // this will sort by hue...
    //  return parseFloat(b.dominant.hue) - parseFloat(a.dominant.hue)
    // this will sort by value...
    return parseFloat(b.dominant.val) - parseFloat(a.dominant.val)
}

function process_files() {
    // loop through all of the images...
    fs.readdir(directory, function(err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        // how many files do we have?
        var num_files = files.length;
        var this_list = files.forEach(function(file, index) {
            if (files != '.DS_Store' && files != '..' && files != '.') { // skip these files...
                var this_file_name = file.split(".")[0];
                var this_json_file = json_dir + "/" + this_file_name + ".json";
                var this_obj;
                // now load the matching json file
                fs.readFile(this_json_file, 'utf8', function(err, data) { // Read each file
                    if (err) {
                        console.log("cannot read the file, something goes wrong with the file", err);
                    }
                    var obj = JSON.parse(data);
                    var the_color_array = _.pluck(obj, 'color'); // grab just the color array from the json file...
                    this_obj = {
                        'name': this_file_name,
                        'colors': the_color_array
                    };
                    if (this_obj.name != '') {
                        jumbo_object.push(this_obj);
                    }
                    if (index == num_files - 1) { // when we get to the end...
                        // this function will take our data, and add the dominnant color, plus the numerical value for hue, sat and value
                        var data_with_dominant = add_dominant_color(jumbo_object);
                        // lets sort this on the attribute of our choice...
                        var sorted = data_with_dominant.sort(color_sort);
                        // this par tcan be used to spit out the file list if you want to make a montage in imagemagick
                        // _.each(sorted, function(value, index) {
                        //   // console.log(value.name);
                        //   //  console.log(value.dominant.hex);
                        // });
                        // this will just spit out the whole sorted JSON object...
                        console.log(JSON.stringify(sorted));
                    }
                })
            }
        });
    });
}


