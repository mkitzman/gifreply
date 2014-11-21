/*global ZeroClipboard, console, document, $,   */
/*jslint plusplus: true */


var client, showImages;

/* click to clip boared */
client = new ZeroClipboard();
client = new ZeroClipboard(document.getElementsByClassName("copy-button"));

//Function to find all hidden images and show them
showImages = function() {
    
    'use strict';
    var i,
        hidden_photos = document.querySelectorAll('.image-container.fadeOutLeft');

    if(hidden_photos) {
        for (i = 0; i < hidden_photos.length; ++i) {
            hidden_photos[i].classList.remove('fadeOutLeft');
        }
    }
};

/* Auto Complete */
$(function() {

    'use strict';

    var availableTags = document.getElementsByClassName("images-list")[0].getAttribute('data-tag-list').split(" ");
    
    $( "#tags-search" ).autocomplete({
        source: availableTags,
        select: function(event, ui) {
            
            
            var tag,
                els,
                j;

            //See if any elements have the hidden class, if so remove it
            showImages();

            //create css selector based off of tag selected in autocomplete
            //selector will be used to hide all photos without the search tab
            tag = '.image-container:not(.' + ui.item.value + ')';
            els = document.querySelectorAll(tag);

            for (j = 0; j < els.length; ++j) {
                els[j].classList.add('fadeOutLeft');
            }

            //Display the tag searched
            document.querySelector('.current-search').innerHTML = ui.item.value;
            
            //Clear search field so you can immediately type in more search terms
            $(this).val(''); return false;
        }
    });
});

/* Clear Hidden elements and tag searched text on clear button click */
document.getElementsByClassName("reset-search")[0].addEventListener("click", function clear() {

    'use strict';

    showImages();
    document.querySelector('.current-search').innerHTML = '';
});
