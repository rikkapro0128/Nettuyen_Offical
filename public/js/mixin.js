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
            "name": "Truyện Màu"
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
            "name": "Tiên Hiệp"
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
            "name": "Kiếm Hiệp"
        },
        {
            "name": "Ngôn Tình"
        },
        {
            "name": "Đô Thị"
        },
        {
            "name": "Quan Trường"
        },
        {
            "name": "Võng Du"
        },
        {
            "name": "Khoa Huyễn"
        },
        {
            "name": "Hệ Thống"
        },
        {
            "name": "Huyền Huyễn"
        },
        {
            "name": "Dị Giới"
        },
        {
            "name": "Dị Năng"
        },
        {
            "name": "Quân Sự"
        },
        {
            "name": "Lịch Sử"
        },
        {
            "name": "Xuyên Không"
        },
        {
            "name": "Xuyên Nhanh"
        },
        {
            "name": "Trọng Sinh"
        },
        {
            "name": "Trinh Thám"
        },
        {
            "name": "Thám Hiểm"
        },
        {
            "name": "Linh Dị"
        },
        {
            "name": "Ngược"
        },
        {
            "name": "Sủng"
        },
        {
            "name": "Cung Đấu"
        },
        {
            "name": "Nữ Cường"
        },
        {
            "name": "Gia Đấu"
        },
        {
            "name": "Đông Phương"
        },
        {
            "name": "Đam Mỹ"
        },
        {
            "name": "Bách Hợp"
        },
        {
            "name": "Hài Hước"
        },
        {
            "name": "Điền Văn"
        },
        {
            "name": "Cổ Đại"
        },
        {
            "name": "Mạt Thế"
        },
        {
            "name": "Truyện Teen"
        },
        {
            "name": "Phương Tây"
        },
        {
            "name": "Nữ Phụ"
        },
        {
            "name": "Light Novel"
        },
        {
            "name": "Việt Nam"
        },
        {
            "name": "Đoản Văn"
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
                        <span class="select__title" content="--- Tuỳ chọn ---">Vị trí ${item.position}</span>
                        <ul class="select-list" hidden>
                            <li class="select-list__item" value="noSetValue" content="noSetValue">Bỏ chọn!</li>
                        </ul>
                    </div>
                </td>
                <td class="add-story__tool--list-image--title-item">
                    <button class="btn a-warning remove-chapter">Xoá ảnh</button>
                    <button class="btn a-normal replace-chapter">Thay thế</button>
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
                    <li class="select-list__item" value="${item}" content="Vị trí ${item}">Vị trí ${item}</li>
                `);
            })
        }
        function checkSelectIsNaN() {
            $('table .select > input[name=select-value]').each(function(index, element) {
                const valueItem = parseInt($(element).attr('position'));
                if(isNaN(valueItem)) { 
                    Swal.fire('Bạn chưa sắp xếp xong!');
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
            if(lengthElement === 0) { Swal.fire('Có cái gì đâu mà sắp xếp!'); return false; }
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
                        title: 'Đã xoá thành công!'
                    });
                }
            }else {
                Swal.fire('Bạn phải sắp xếp xong mới được xoá!')
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
                        if(check) { Swal.fire('Ảnh này bạn đã chọn rồi!'); return; }
                        else {
                            listFile.forEach((item, index) => { if(item.position === getPostion) { item.data = file; return; } })
                            $(option.table).children('tr').remove();
                            listFile.forEach((item, index) => {
                                addElementInTable(item);
                            });
                            Toast.fire({
                                icon: 'success',
                                title: 'Thay thế thành công!'
                            });
                        }
                    }
                })
            }else {
                Swal.fire('Bạn phải sắp xếp xong mới được thay thế!')
            }
        });
        $('.select > input[name=select-value]').on('change', function(event) {
            changeOption = event.target.value;
        });
        $('button.your-tool__click.chapter').on('click', async function() {
            const listStory = [];
            if(changeOption === 'noSetValue' || changeOption === undefined) { Swal.fire('Hãy nhập tuỳ chọn!') }
            else if(changeOption === 'remove-all') {
                $('.checkbox.element-check > input[name=select-element]').each(function(index, element) {
                    if($(element).prop('checked') === true) {
                        const parentEle = parseInt($(element).closest('tr').find('td input[name=select-value]').attr('position'));
                        listStory.push(parentEle);
                    }
                });
                if(listStory.length === 0) { Swal.fire('Không có ảnh nào được chọn!') }
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
                                title: 'Đã xoá thành công!'
                            });
                        }
                    }else {
                        Swal.fire('Bạn phải sắp xếp xong mới được xoá!')
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
        if(!details.name) { Swal.fire('Bạn phải nhập tên chapter!'); return false; }
        if(listFile.length === 0) { Swal.fire('Bạn chưa có ảnh nào!'); return false; }
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

function actionToggle(selector, addClass, selectorList) {
    let stateAll = false;
    $(selector).on('click', function() {
        if(!$(selector).hasClass(addClass)) {
            $(selector).addClass(addClass);
            stateAll = true;
            if(selectorList) {
                $('.menu-list').css({
                    'transform': 'translate3d(0%, 0, 0)'
                })
            }
        }else {
            $(selector).removeClass(addClass);
            stateAll = !stateAll;
            if(selectorList) {
                $('.menu-list').css({
                    'transform': 'translate3d(-100%, 0, 0)'
                });
            }
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
};
