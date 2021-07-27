import { aleartFail, aleartSuccess, aleartWarning } from './handleForm.js';

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

function clickEditListStory(element) {
    $(element).click(function() {
        const idStory = $(this).closest('tr').attr('id_story');
        window.location.href = `http://localhost:3300/user/edit-your-storys/${idStory}`;
    })
}

function clickRemoveListStory(element) {
    $(element).click(function() {
        const idStory = $(this).closest('tr').attr('id_story');
        aleartWarning(`/user/remove-your-storys/${idStory}`, $(this).closest('tr'));
    })
}

function clickStory(listElement) {
    listElement.on('click', function(event) {
        const id = $(this).attr('id-story');
        if(id) {
            window.location.replace(`http://localhost:3300/story/${id}`);
        }
    });
}

function checkBox() {
    $('.checkbox').click(function() {
        const state = $(this).find('input[name=select-element]').prop('checked');
        if(state) {
            $(this).removeClass('active');
        }else {
            $(this).addClass('active');
        }
        $(this).find('input[name=select-element]').prop('checked', !state);
    });
}

function selectBox() {
    $('.select').click(function() {
        const state = $('.select > .select-list').hasClass('show');
        if(state) {
            $('.select > .select-list').removeClass('show');
        }else {
            $('.select > .select-list').addClass('show');
        }
    })
}

function selectAllCheckBox(selectorClick, selectorTrigger) {
    $(selectorClick).click(function() {
        $(selectorTrigger).trigger('click');
    });
}

export { 
    inputStyle,
    clickEditListStory,
    clickRemoveListStory,
    clickStory,
    checkBox,
    selectBox,
    selectAllCheckBox
};
