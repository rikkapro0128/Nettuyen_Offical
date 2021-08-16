import { aleartFail, aleartSuccess, aleartWarning, reRenderIndex } from './handleForm.js';
// import './particles.js/particles.js';

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
        window.location.href = `/user/edit-your-storys/${idStory}`;
    })
}

function clickRemoveListStory(element) {
    let isPermit;
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    $(element).on('click', async function() {
        isPermit = await aleartWarning();
        if(isPermit) {
            const id_story = $(this).closest('tr').attr('id_story');
            await fetch('/user/remove-your-storys?_method=DELETE', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([id_story]),
            }).then((result) => {
                if(result.status === 301 || result.message === 'success') {
                    Toast.fire({
                        icon: 'success',
                        title: 'Đã xoá thành công!'
                    });
                    $(this).closest('tr').remove();
                    reRenderIndex('tr td#index-story');
                }else if(result.status === 404 || result.message === 'fail') {
                    Toast.fire({
                        icon: 'error',
                        title: 'Không xoá được!'
                    });
                }
            })
        }
    })
}

function clickStory(listElement) {
    listElement.on('click', function(event) {
        const id = $(this).attr('id-story');
        if(id) {
            window.location.replace(`/story/${id}`);
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
    $('button.your-tool__click.story').on('click', async function() {
        const listStory = [];
        let isPermit;
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
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'bottom-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
                isPermit = await aleartWarning();
                // console.log(isPermit)
                if(isPermit) {
                    await fetch('/user/remove-your-storys?_method=DELETE', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(listStory),
                    }).then((result) => {
                        if(result.status === 301 || result.message === 'success') {
                            Toast.fire({
                                icon: 'success',
                                title: 'Đã xoá thành công!'
                            });
                            if(listStory.length) {
                                listStory.forEach(item => {
                                    $(`tr[id_story=${item}]`).remove();
                                })
                                reRenderIndex('tr td#index-story');
                            }
                        }else if(result.status === 404 || result.message === 'fail') {
                            Toast.fire({
                                icon: 'error',
                                title: 'Không xoá được!'
                            });
                        }
                    })
                }
            }
        }
    });
}

function backgroundStyle() {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', '/js/config-particlesJS.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

function showMenuMoblie(selector, addClass) {
    let state = false;
    $(selector).siblings('ul').slideUp();
    $(selector).on('click', function () {
        if(state) {
            $(selector).removeClass(addClass);
            $(selector).siblings('ul').slideUp();
        }else {
            $(selector).addClass(addClass);
            $(selector).siblings('ul').slideDown();
        }
        state = !state;
    })
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
    backgroundStyle,
    showMenuMoblie,
};
