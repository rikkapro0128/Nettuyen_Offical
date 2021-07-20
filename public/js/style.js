import { aleartFail, aleartSuccess } from './handleForm.js';

// declare variable
function inputStyle()  {
    var $inputItem = $(".js-inputWrapper");
    $inputItem.length && $inputItem.each(function() {
        var $this = $(this),
            $input = $this.find(".formRow--input"),
            placeholderTxt = $input.attr("placeholder"),
            $placeholder;
        
        $input.after('<span class="placeholder">' + placeholderTxt + "</span>"),
        $input.attr("placeholder", ""),
        $placeholder = $this.find(".placeholder"),
        
        $input.val().length ? $this.addClass("active") : $this.removeClass("active"),
            
        $input.on("focusout", function() {
            $input.val().length ? $this.addClass("active") : $this.removeClass("active");
        }).on("focus", function() {
            $this.addClass("active");
        });
    });
}

function handleClickListStory() {
    $('.your-post__list--table-row--content').click(function() {
        const idUser = $(this).attr('id_story');
        window.location.href = `http://localhost:3300/user/edit-your-storys/${idUser}`;
    })
}

export { inputStyle, handleClickListStory };
