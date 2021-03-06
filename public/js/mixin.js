import { aleartFail, aleartSuccess, aleartWarning } from './handleForm.js';

const fileImageStory = {};

function uploadSinglefile(thisObj, controllAxis, speed) {
    let file;
    const objDrag = thisObj;
    const inputFile = objDrag.children('input');
    function getDataFile(controllAxis, file) {
        if(controllAxis === 'x') {
            fileImageStory.avatar = file;
        }else {
            fileImageStory.cover = file;
        }
    }
    objDrag.on('dragover', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).addClass('drag__element');
        //console.log('Drag over element!');
    }).on('dragleave', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).removeClass('drag__element');
        //console.log('Drag leave element!');
    }).on('drop', function(event) {
        event.preventDefault();  
        event.stopPropagation();
        $(this).removeClass('drag__element');
        //console.log('Drag droped on element!');
        file = event.originalEvent.dataTransfer.files[0];
        getDataFile(controllAxis, file);
        getFileElement(file, $(this));
    }).children('button').on('click', function(event) {
        inputFile.trigger('click');
    });
    inputFile.on('change', function(event) {
        file = $(this)[0].files[0];
        getDataFile(controllAxis, file);
        getFileElement(file, objDrag);
        $(this).val('');
    })
    function getFileElement(file, element) {
        if(!element.find('div > img')[0]) {
            element.find('div').append(`<img id="show-img" src="${file ? URL.createObjectURL(file) : ''}"/>`);
        }else {
            element.find('div > img').attr('src', `${file ? URL.createObjectURL(file) : ''}`);
        }
        dragImage(element.find('div'), controllAxis, speed);
        cancelImage(element.find('div > img'), element);
    }
}

function dragImage(element, direction = 'y', speed) {
    let pos = {}, nextPoint = { x: 0, y: 0}, present = {};
    function getPostion(event) {
        return {
            x: event.clientX - event.currentTarget.offsetLeft,
            y: event.clientY - event.currentTarget.offsetTop,
        }
    }
    element.on('mousedown', function(event) {
        pos = getPostion(event);
        present.x = -$(this).scrollLeft();
        present.y = -$(this).scrollTop();
        $(this).find('img').css("cursor", "grabbing");
    }).on('mousemove', function(event) {
        if(event.buttons !== 1) {
            return;
        };
        if(direction === 'x') {
            nextPoint.x = present.x + (getPostion(event).x - pos.x) / speed;
            $(this).scrollLeft(-nextPoint.x);
        }else {
            nextPoint.y = present.y + (getPostion(event).y - pos.y) / speed;
            $(this).scrollTop(-nextPoint.y);
        }
    }).on('mouseup', function() {
        $(this).find('img').css("cursor", "grab");
    })
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 

function renderTypeStory(objStory) {
    const typeStory = [
        {
            "name": "Manhwa"
        },
        {
            "name": "Truy???n M??u"
        },
        {
            "name": "Martial Arts"
        },
        {
            "name": "Sci-fi"
        },
        {
            "name": "Bender"
        },
        {
            "name": "Gender"
        },
        {
            "name": "Mystery"
        },
        {
            "name": "Psychological"
        },
        {
            "name": "Supernatural"
        },
        {
            "name": "Slice of Life"
        },
        {
            "name": "Comedy"
        },
        {
            "name": "Action"
        },
        {
            "name": "Adventure"
        },
        {
            "name": "Fantasy"
        },
        {
            "name": "Manga"
        },
        {
            "name": "Seinen"
        },
        {
            "name": "Ti??n Hi???p"
        },
        {
            "name": "Ecchi"
        },
        {
            "name": "Harem"
        },
        {
            "name": "Romance"
        },
        {
            "name": "Drama"
        },
        {
            "name": "Shounen"
        },
        {
            "name": "Shoujo"
        },
        {
            "name": "School Life"
        },
        {
            "name": "Ki???m Hi???p"
        },
        {
            "name": "Ng??n T??nh"
        },
        {
            "name": "???? Th???"
        },
        {
            "name": "Quan Tr?????ng"
        },
        {
            "name": "V??ng Du"
        },
        {
            "name": "Khoa Huy???n"
        },
        {
            "name": "H??? Th???ng"
        },
        {
            "name": "Huy???n Huy???n"
        },
        {
            "name": "D??? Gi???i"
        },
        {
            "name": "D??? N??ng"
        },
        {
            "name": "Qu??n S???"
        },
        {
            "name": "L???ch S???"
        },
        {
            "name": "Xuy??n Kh??ng"
        },
        {
            "name": "Xuy??n Nhanh"
        },
        {
            "name": "Tr???ng Sinh"
        },
        {
            "name": "Trinh Th??m"
        },
        {
            "name": "Th??m Hi???m"
        },
        {
            "name": "Linh D???"
        },
        {
            "name": "Ng?????c"
        },
        {
            "name": "S???ng"
        },
        {
            "name": "Cung ?????u"
        },
        {
            "name": "N??? C?????ng"
        },
        {
            "name": "Gia ?????u"
        },
        {
            "name": "????ng Ph????ng"
        },
        {
            "name": "??am M???"
        },
        {
            "name": "B??ch H???p"
        },
        {
            "name": "H??i H?????c"
        },
        {
            "name": "??i???n V??n"
        },
        {
            "name": "C??? ?????i"
        },
        {
            "name": "M???t Th???"
        },
        {
            "name": "Truy???n Teen"
        },
        {
            "name": "Ph????ng T??y"
        },
        {
            "name": "N??? Ph???"
        },
        {
            "name": "Light Novel"
        },
        {
            "name": "Vi???t Nam"
        },
        {
            "name": "??o???n V??n"
        },
    ];
    typeStory.forEach((item, index) => {
        $('.add-your-story__type').append(`
            <li>
                <input type="checkbox" id="${index}" value="${item.name}">
                <label for="${index}">${item.name}</label>
            </li>   
        `);
    })
    $('.add-your-story__type > li > input[type=checkbox]').change(function() {
        let objTypeStoryStack = [];
        if($(this).prop('checked')) {
            objTypeStoryStack.push({
                id: parseInt($(this).attr('id')),
                value: $(this).prop('checked'),
            })
        }else {
            objTypeStoryStack = objTypeStoryStack.filter((ele) => ele.id !== parseInt($(this).attr('id')));
            objStory.type = objStory.type.filter((ele, index) => ele !== typeStory[parseInt($(this).attr('id'))].name)
        }
        objTypeStoryStack.forEach((item, index) => {
            objStory.type.push(typeStory[item.id].name);
        })
    })
}

function cancelImage(element, eleParent) {
    eleParent.children('i.fa-trash-alt').on('click', function(event) {
        element.attr('src', '');
        eleParent.removeClass('img-cancel');
        eleParent.children('button').show();
    })
    eleParent.addClass('img-cancel');
    eleParent.children('button').hide();
}

function showChildBox(elementClick, elementShow, listIcon) {
    let state = true; // hide
    elementClick.on('click', function(event) {
        $(this).children('i').remove();
        if(state) {
            $(this).append(listIcon[1]);
            elementShow.slideDown('slow');
        } else {
            $(this).append(listIcon[0]);
            elementShow.slideUp('slow');
        }
        state = !state;
    });
}

function loadImage(option) {
    // listener event change file of element by id parameter inputMutiFile
    let listFile = [];
    let changeOption;
    let countPos = 0;
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
    function viewImage(urlHashImage) {
        $(option.showImageUploaded).append(`<img src="${urlHashImage}" id="view-image"/> `)
    }
    function addElementInTable(item) {
        $(option.table).append(`
            <tr class="add-story__tool--list-image--title">
                <td class="add-story__tool--list-image--title-item">
                    <div class="checkbox element-check">
                        <input type="checkbox" name="select-element" hidden>
                    </div>
                </td>
                <td class="add-story__tool--list-image--title-item">
                    <span class="add-story__tool--list-image--title-item--child-text">${item.data.name}</span>
                </td>
                <td class="add-story__tool--list-image--title-item">
                    <span class="add-story__tool--list-image--title-item--child-text">${formatBytes(item.data.size)}</span>
                </td>
                <td class="add-story__tool--list-image--title-item">
                    <div class="select">
                        <input type="text" name="select-value" position="${item.position}" hidden>
                        <span class="select__title" content="--- Tu??? ch???n ---">V??? tr?? ${item.position}</span>
                        <ul class="select-list" hidden>
                            <li class="select-list__item" value="noSetValue" content="noSetValue">B??? ch???n!</li>
                        </ul>
                    </div>
                </td>
                <td class="add-story__tool--list-image--title-item">
                    <button class="btn a-warning remove-chapter">Xo?? ???nh</button>
                    <button class="btn a-normal replace-chapter">Thay th???</button>
                    <input type="file" class="choose-file-replace" hidden/>
                </td>
            </tr>
        `);
        $(`table .select > input[position=${item.position}]`).val(item.position);
    }
    (function handleChangeOption() {
        let stackPosition = [];
        let lastValue;
        let isSort = true;
        function renderOption(listValue) {
            $('table .select-list__item').not('li[value=noSetValue]').remove();
            listValue.forEach((item) => {
                $('table .select-list').append(`
                    <li class="select-list__item" value="${item}" content="V??? tr?? ${item}">V??? tr?? ${item}</li>
                `);
            })
        }
        function checkSelectIsNaN() {
            $('table .select > input[name=select-value]').each(function(index, element) {
                const valueItem = parseInt($(element).attr('position'));
                if(isNaN(valueItem)) { 
                    Swal.fire('B???n ch??a s???p x???p xong!');
                    isSort = false;
                    return false;
                }else {
                    isSort = true;
                }
            })
        }
        $('body').on('click', '#sort-position', function() {
            let sortList = [];
            const lengthElement = $(option.table).children('tr').length;
            if(lengthElement === 0) { Swal.fire('C?? c??i g?? ????u m?? s???p x???p!'); return false; }
            checkSelectIsNaN();
            if(isSort) {
                $('table .select > input[name=select-value]').each(function(index, element) {
                    const valueItem = parseInt($(element).attr('position'));
                    sortList.push(valueItem);
                })
                sortList.forEach((item, index) => {
                    listFile[index].position = item;
                })
                listFile.sort((before, after) => { return before.position - after.position })
                $(option.table).children('tr').remove();
                listFile.forEach((item) => {
                    addElementInTable(item);
                });
            }
        }).on('click', 'table .select', function() {
            lastValue = parseInt($(this).children('input[name=select-value]').attr('position'));
        }).on('click', '.remove-chapter', async function() {
            const getPostion = parseInt($(this).closest('tr').find('input[name=select-value]').attr('position'));
            checkSelectIsNaN();
            if(isSort) {
                const isPermit = await aleartWarning();
                if(isPermit) {
                    listFile = listFile.filter(ele => ele.position !== getPostion);
                    $(option.table).children('tr').remove();
                    listFile.forEach((item, index) => {
                        item.position = index + 1;
                        addElementInTable(item);
                    });
                    countPos = listFile.length;
                    Toast.fire({
                        icon: 'success',
                        title: '???? xo?? th??nh c??ng!'
                    });
                }
            }else {
                Swal.fire('B???n ph???i s???p x???p xong m???i ???????c xo??!')
            }
        }).on('change', 'table .select > input[name=select-value]', function(event) {
            const value = isNaN(parseInt($(this).val())) ? $(this).val() : parseInt($(this).val());
            const position = parseInt($(this).attr('position'));
            if(value === 'noSetValue') {
                const isHas = stackPosition.find(item => item === position);
                if(!isHas && !isNaN(position)) {
                    stackPosition.push(position);
                    $(this).attr('position', 'noSetValue');
                    $(this).val('noSetValue');
                }
            }else if(typeof value === 'number') {
                if(lastValue !== 'noSetValue' && !isNaN(lastValue)) { stackPosition.push(lastValue); }
                stackPosition = stackPosition.filter(item => item !== value);
                $(this).attr('position', value);
                $(this).val(value);
            }
            renderOption(stackPosition);
        }).on('click', '.replace-chapter', function() {
            const getPostion = parseInt($(this).closest('tr').find('input[name=select-value]').attr('position'));
            let file;
            checkSelectIsNaN();
            if(isSort) {
                // do something!
                $(this).siblings('input.choose-file-replace').trigger('click');
                $(this).siblings('input.choose-file-replace').on('change', function(event) {
                    file = event.target.files[0];
                    if(file) {
                        let check = false;
                        listFile.forEach((item) => { if(item.data.name === file.name) { check = true; return; } });
                        if(check) { Swal.fire('???nh n??y b???n ???? ch???n r???i!'); return; }
                        else {
                            listFile.forEach((item, index) => { if(item.position === getPostion) { item.data = file; return; } })
                            $(option.table).children('tr').remove();
                            listFile.forEach((item, index) => {
                                addElementInTable(item);
                            });
                            Toast.fire({
                                icon: 'success',
                                title: 'Thay th??? th??nh c??ng!'
                            });
                        }
                    }
                })
            }else {
                Swal.fire('B???n ph???i s???p x???p xong m???i ???????c thay th???!')
            }
        });
        $('.select > input[name=select-value]').on('change', function(event) {
            changeOption = event.target.value;
        });
        $('button.your-tool__click.chapter').on('click', async function() {
            const listStory = [];
            if(changeOption === 'noSetValue' || changeOption === undefined) { Swal.fire('H??y nh???p tu??? ch???n!') }
            else if(changeOption === 'remove-all') {
                $('.checkbox.element-check > input[name=select-element]').each(function(index, element) {
                    if($(element).prop('checked') === true) {
                        const parentEle = parseInt($(element).closest('tr').find('td input[name=select-value]').attr('position'));
                        listStory.push(parentEle);
                    }
                });
                if(listStory.length === 0) { Swal.fire('Kh??ng c?? ???nh n??o ???????c ch???n!') }
                else {
                    checkSelectIsNaN();
                    if(isSort) {
                        const isPermit = await aleartWarning();
                        if(isPermit) {
                            listFile = listFile.filter((el) => {
                                return !listStory.includes(el.position);
                            });
                            $(option.table).children('tr').remove();
                            listFile.forEach((item, index) => {
                                item.position = index + 1;
                                addElementInTable(item);
                            });
                            countPos = listFile.length;
                            Toast.fire({
                                icon: 'success',
                                title: '???? xo?? th??nh c??ng!'
                            });
                        }
                    }else {
                        Swal.fire('B???n ph???i s???p x???p xong m???i ???????c xo??!')
                    }
                }
            }
        });
    })()
    $(option.inputMutiFile).on('change', function(event) {
        const files = event.target.files;
        for(const item of files) {
            const found = listFile.find(ele => ele.data.name === item.name);
            if(found) { continue; }
            listFile.push({position: (countPos + 1), data: item});
            addElementInTable({position: (countPos + 1), data: item});
            countPos++;
        }
    })
    $('#update-chapter button').on('click', function() {
        const idStory = document.URL.split('/')[document.URL.split('/').length - 1];
        const details = { name: $('input#name-story').val() };
        const formChapter = new FormData();
        if(!details.name) { Swal.fire('B???n ph???i nh???p t??n chapter!'); return false; }
        if(listFile.length === 0) { Swal.fire('B???n ch??a c?? ???nh n??o!'); return false; }
        formChapter.append('data_info', JSON.stringify({ details }));
        listFile.forEach(item => {
            formChapter.append('chapter', item.data);
        })
        fetch(`/user/upload-chapter/${idStory}`, {
            method: 'POST',
            body: formChapter,
        })
        .then(response => response.json())
        .then(result => {
            if(result) {
                aleartSuccess('Update successful!', `/user/edit-your-storys/${idStory}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
}

function updateStory(linkPost) {
    const btn = $('#update-story').find('.btn');
    const eleScroll = $('.render__avatar-story');
    const formStory = new FormData();
    const lengthString = document.URL.split('/').length;
    const id = document.URL.split('/')[lengthString - 1];
    btn.on('click', function(event) {
        fileImageStory.positionTransform = {
            avatar: $(eleScroll[0]).scrollLeft(),
            cover: $(eleScroll[1]).scrollTop(),
        };
        formStory.append('avatar', fileImageStory.avatar); // set avatar
        formStory.append('cover', fileImageStory.cover); // set cover
        formStory.append('position', JSON.stringify(fileImageStory.positionTransform));
        fetch(`${linkPost}/${id}`, {
            method: 'POST',
            body: formStory,
        })
        .then(response => response.json())
        .then(result => {
            if(result) {
                aleartSuccess('Update successful!', `http://localhost:3300/user/edit-your-storys/${id}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

function actionToggle(selector, addClass, selectorList, bgOverlay) {
    let stateAll = false;
    $('body').on('click', selector, function() {
        if(!$(selector).hasClass(addClass)) {
            $(selector).addClass(addClass);
            stateAll = true;
            if(selectorList) {
                $(selectorList).addClass('show');
                if(bgOverlay) {
                    $(bgOverlay).addClass('show');
                }
            }
        }else {
            $(selector).removeClass(addClass);
            stateAll = false;
            if(selectorList) {
                $(selectorList).removeClass('show');
                if(bgOverlay) {
                    $(bgOverlay).removeClass('show');
                }
            }
        }
    })
    if(bgOverlay) {
        $(bgOverlay).on('click', function(event) {
            $(selector).trigger('click');
        });
    }
}

function bodyClick(selector, addClass) {
    $('body').on('click', function(event) {
        let isHas = !$(event.target).closest(selector).length;
        if(isHas) {
            $(selector).removeClass(addClass);
        }
    })
}

export { 
    uploadSinglefile,
    showChildBox,
    loadImage,
    renderTypeStory,
    updateStory,
    actionToggle,
    bodyClick,
};
