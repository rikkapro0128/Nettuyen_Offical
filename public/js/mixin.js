import { aleartFail, aleartSuccess } from './handleForm.js';

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
            "name": "Tiên Hiệp"
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
    let countPos = 0;
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
                    <button class="btn a-warning" id="remove-story">Xoá Truyện</button>
                    <button class="btn a-normal" id="edit-story">Chỉnh sửa</button>
                </td>
            </tr>
        `);
        $(`.select > input[position=${item.position}]`).val(item.position);
    }
    (function handleChangeOption() {
        let stackPosition = [];
        let lastValue;
        console.log('Listening...!')
        function renderOption(listValue) {
            $('.select-list__item').not('li[value=noSetValue]').remove();
            listValue.forEach((item) => {
                $('.select-list').append(`
                    <li class="select-list__item" value="${item}" content="Vị trí ${item}">Vị trí ${item}</li>
                `);
            })
        }
        $('body').on('click', '#sort-position', function() {
            let sortList = [];
            let isSort = true;
            const lengthElement = $(option.table).children('tr').length;
            if(lengthElement === 0) { Swal.fire('Có cái gì đâu mà sắp xếp!'); return false; }
            $('.select > input[name=select-value]').each(function(index, element) {
                const valueItem = parseInt($(element).attr('position'));
                if(isNaN(valueItem)) { 
                    Swal.fire('Bạn chưa sắp xếp xong!');
                    isSort = false;
                    return false;
                }
                sortList.push(valueItem);
            })
            if(isSort) {
                sortList.forEach((item, index) => {
                    listFile[index].position = item;
                })
                listFile.sort((before, after) => { return before.position - after.position })
                $(option.table).children('tr').remove();
                listFile.forEach((item) => {
                    addElementInTable(item);
                });
                console.log(listFile)
            }
        })
        $('body').on('click', '.select', function() {
            lastValue = parseInt($(this).children('input[name=select-value]').attr('position'));
            // console.log(lastValue)
        })
        $('body').on('change', '.select > input[name=select-value]', function(event) {
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
                // console.log('Deleted value = ', value);
                if(lastValue !== 'noSetValue' && !isNaN(lastValue)) { stackPosition.push(lastValue); }
                stackPosition = stackPosition.filter(item => item !== value);
                $(this).attr('position', value);
                $(this).val(value);
            }
            renderOption(stackPosition);
            // console.log('Value = ', $(this).val(), ', Position = ', $(this).attr('position'))
            // console.log('Value = ', stackPosition)
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
        // console.log(listFile)
        // listFile = [];
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
            console.log('Success:', result);
            if(result) {
                aleartSuccess('Update successful!', `http://localhost:3300/user/edit-your-storys/${id}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
}

export { 
    uploadSinglefile,
    showChildBox,
    loadImage,
    renderTypeStory,
    updateStory,
};
