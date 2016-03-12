# Command Line Graphics
@jonkeegan | jonathan.keegan@wsj.com

Slides from my talk "Command Line Graphics" at NICAR 2016:
http://bit.ly/clgfx-nicar16

@jonkeegan

## requirements
```
brew install node
brew install imagemagick
brew install ffmpeg
```

## Download the data and the pill photos
You can get the raw data from here: http://pillbox.nlm.nih.gov/developer.html

```wget http://pillbox.nlm.nih.gov/downloads/mysql_create_engine_data_20150511.txt
wget http://pillbox.nlm.nih.gov/downloads/pillbox_color_lookup.csv
wget http://pillbox.nlm.nih.gov/downloads/pillbox_DEA_lookup.csv
wget http://pillbox.nlm.nih.gov/downloads/pillbox_shape_lookup.csv
wget http://pillbox.nlm.nih.gov/downloads/pillbox_production_images_full_20140224.zip
wget http://pillbox.nlm.nih.gov/downloads/pillbox_production_images_update_20150511.zip
```

##Setup database
In `data.php` you must enter your database name. It's set up assuming you are using MAMP, with a local MySQL server.

Just use the `mysql_create_engine_data_20150511.txt` file to setup the database.  I renamed the table `pillbox`.

Place all of the pill photos into 'pill_photos'.

##Process images
```node analyze_pills.js > im_commands.sh
sh im_commands.sh
node build_sorted_list.js > jumbo_with_dom_sat.json
```

## Sample data call
All "BLUE" pills:
`data.php?filter=splcolor_new&value=C48333`

All round shapes:
`data.php?filter=splshape_new&value=C48348`