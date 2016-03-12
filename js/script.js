var limit = 500;
var direction = 'desc';
var current_field, current_value, current_field_label, current_value_label;
sort_pills();
var jumbo_data;
init();

function init() {
    $("#hue").on("click", function() {
        //plot_colors_from_jumbo();
        sort_pills_from_color_sorted("jumbo_with_dom_hue.json");
    });
    $("#sat").on("click", function() {
        //plot_colors_from_jumbo();
        sort_pills_from_color_sorted("jumbo_with_dom_sat.json");
    });
    $("#val").on("click", function() {
        //plot_colors_from_jumbo();
        sort_pills_from_color_sorted("jumbo_with_dom_val.json");
    });
    $("#pillColorDD")
        .change(function() {
            // console.log("color: " + $(this).val())
            current_field = 'splcolor_new';
            current_value = $(this).val();
            current_field_label = "color"
            current_value_label = $("#pillColorDD option:selected").text();
            sort_pills(current_field, current_value);
        }).change();
    $("#pillShapeDD")
        .change(function() {
            // console.log("shape: " + $(this).val())
            current_field = 'splshape_new';
            current_value = $(this).val();
            current_field_label = "shape"
            current_value_label = $("#pillShapeDD option:selected").text();
            sort_pills(current_field, current_value);
        })
}

function sort_pills_from_color_sorted(file) {
    $("#output").html("");
    $.getJSON(file, function(data) {
        $("#meta_text").html("");
        $.each(data, function(index, val) {
            if (val['name'] != '') {
                var the_html = "<div class='pill_card' style='background-color: " + val['dominant']['hex'] + "'>";
                the_html += "<img src='pills_clipped/" + val['name'] + ".png'><br />";
                the_html += "</div>";
            }
            $("#output").append(the_html);
        });
    });
}

function sort_pills(field, value) {
    $("#output").html("");
    $.getJSON("data.php?filter=" + field + "&value=" + value, function(data) {
        var this_data = _.sortBy(data.data, 'rxstring').reverse();
        $("#meta_text").html("Found " + this_data.length + " pills with " + current_value_label + " " + current_field_label + "...");
        $.each(data.data, function(index, val) {
            if (val['splimage'] != '') {
                var the_html = "<div class='pill_card'>";
                the_html += "<img src='pill_thumbs/" + val['splimage'] + "._thumb.jpg'><br />";
                the_html += "</div>";
            }
            $("#output").append(the_html);
        });
    });
}
