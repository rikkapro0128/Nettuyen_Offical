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
        aleartWarning(`/user/remove-your-storys/`, $(this).closest('tr'));
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
    $('body').on('click', '.checkbox', function () {
        // console.log('active')
        const state = $(this).find('input[name=select-element]').prop('checked');
        if(state) {
            $(this).removeClass('active');
        }else {
            $(this).addClass('active');
        }
        $(this).find('input[name=select-element]').prop('checked', !state).trigger("change");
    });
}

function selectBox() {
    let clicked = true;
    const selectElement = '.select';
    $('body').on('click', selectElement, function() {
        const state = $(this).find('.select-list').hasClass('show');
        if(state) {
            $(this).find('.select-list').removeClass('show');
        }else {
            $(selectElement).css({'z-index': 'unset'});
            $('.select').find('.select-list').removeClass('show');
            $(this).find('.select-list').addClass('show');
            $(this).css({'z-index': 1});
        }
        clicked = false;
    }).on('click', function () {
        const check = $(selectElement).find('.select-list').hasClass('show');
        if(clicked && check) {
            $(selectElement).find('.select-list').removeClass('show');
        }
        clicked = true;
    }).on('click', selectElement + ' .select-list__item', function(event) {
        const value = $(this).attr('value');
        const content = $(this).attr('content');
        $(this).closest('.select-list').siblings('.select__title').text(content);
        if(content === 'noSetValue') { 
            $(this).closest('.select-list').siblings('.select__title').text($(this).closest('.select-list').siblings('.select__title').attr('content')) 
        }
        $(this).closest('.select-list').siblings('input[name=select-value]').val(value).trigger("change");
        // console.log($(this).closest('.select-list').siblings('input[name=select-value]').val())
    })
}

function selectAllCheckBox(selectorClick, selectorTrigger) {
    $('body').on('click', selectorClick,function() {
        const checked = $(this).find('input[name=select-element]').prop('checked');
        if(checked) {
            $(selectorTrigger).addClass('active');
        }else {
            $(selectorTrigger).removeClass('active');
        }
        $(selectorTrigger).find('input[name=select-element]').prop('checked', checked).trigger("change");
    });
}

function handleExecSelectOption() {
    let option;
    $('.select > input[name=select-value]').on('change', function(event) {
        option = event.target.value;
        // console.log(option)
    });
    $('button.your-post__list--tool-click').on('click', function() {
        const listStory = [];
        if(option === 'noSetValue' || option === undefined) { Swal.fire('Hãy nhập tuỳ chọn!') }
        else if(option === 'remove-all') {
            $('.checkbox.element-check > input[name=select-element]').each(function(index, element) {
                if($(element).prop('checked') === true) {
                    const parentEle = $(element).closest('tr').attr('id_story');
                    listStory.push(parentEle);
                }
            });
            if(listStory.length === 0) { Swal.fire('Không có truyện nào được chọn!') }
            else {
                aleartWarning('/user/remove-your-storys', undefined, listStory);
            }
        }
    });
}

export { 
    inputStyle,
    clickEditListStory,
    clickRemoveListStory,
    clickStory,
    checkBox,
    selectBox,
    selectAllCheckBox,
    handleExecSelectOption,
};
