/*global ZeroClipboard, console, document  */
var client = new ZeroClipboard();
client = new ZeroClipboard(document.getElementsByClassName("copy-button"));




document.getElementById("reset-search").addEventListener("click", function clear() {

    var els = document.querySelectorAll('.gif-container');
    
    for (var i = 0; i < els.length; ++i) {
        els[i].classList.remove('hidden');
    }
    document.querySelector('.current-search').innerHTML = '';
});




$(function() {
    var tags = document.getElementById("images").getAttribute('data-tag-list').split(" ");

    console.log(tags);
    var availableTags = tags;
    
    $( "#tags-search" ).autocomplete({
        source: availableTags,
        select: function(event, ui) {
                    var hidden_els = document.querySelectorAll('.gif-container.hidden');
                    if(hidden_els) {
                        for (d = 0; d < hidden_els.length; ++d) {
                            console.log(hidden_els[d]);
                            hidden_els[d].classList.remove('hidden');
                        }
                    }

                    var tag = '.gif-container:not(.' + ui.item.value + ')';
                    var els = document.querySelectorAll(tag);

                    for (i = 0; i < els.length; ++i) {
                        console.log(els[i]);
                        els[i].classList.add('hidden');
                    }

                    document.querySelector('.current-search').innerHTML = ui.item.value;

                    

                    $(this).val(''); return false;
        },
    });
});