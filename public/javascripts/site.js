/*global ZeroClipboard, console, document, $, setTimeout   */
/*jslint plusplus: true */
var client, showImages;

/* click to clip boared */
client = new ZeroClipboard();
client = new ZeroClipboard(document.getElementsByClassName("copy-button"));

/* Show Hidden images */
/* Function to find all hidden images and show them */
showImages = function() {
    
    'use strict';

    var i,
        hidden_photos = document.querySelectorAll('.image-container.imageHidden');

    if(hidden_photos) {
        for (i = 0; i < hidden_photos.length; ++i) {
            hidden_photos[i].classList.remove('fadeOutLeft');
            hidden_photos[i].classList.add('fadeIn');
        }
    }

    document.querySelector('.search-status').classList.remove('show-current-search');
    document.querySelector('.reset-search').classList.remove('show-reset');

};


/* Reset Search */
/* Clear Hidden elements and taga searched text on clear button click */
document.getElementsByClassName("reset-search")[0].addEventListener("click", function clear() {

    'use strict';

    showImages();
    document.querySelector('.current-search').innerHTML = '';

});


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
                els[j].classList.remove('fadeIn');
                els[j].classList.add('fadeOutLeft');
            }

            setTimeout(function(){
                //ZeroClipboard won't work with the extra css effects on the node so remove it
                for (j = 0; j < els.length; ++j) {
                    els[j].classList.remove('fadeOutLeft');
                    els[j].classList.add('imageHidden');
                }
            },500);

            //Display the tag searched
            document.querySelector('.current-search').innerHTML = ui.item.value;
            document.querySelector('.search-status').classList.add('show-current-search');
            document.querySelector('.reset-search').classList.add('show-reset');

            //Clear search field so you can immediately type in more search terms
            $(this).val(''); return false;
        }
    });
});