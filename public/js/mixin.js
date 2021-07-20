import '../jquery-ui-1.12.1/jquery-ui-1.12.1/jquery-ui.min.js';
import { aleartFail, aleartSuccess } from './handleForm.js';

function uploadSinglefile(thisObj, controllAxis) {
    let file;
    const objDrag = thisObj;
    const inputFile = objDrag.children('input');
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
        getFileElement(file, $(this));
    }).children('button').on('click', function(event) {
        inputFile.trigger('click');
    });
    inputFile.on('change', function(event) {
        file = $(this)[0].files[0];
        getFileElement(file, objDrag);
        $(this).val('');
    })
    function getFileElement(file, element) {
        if(!element.find('div > img')[0]) {
            element.find('div').append(`<img id="show-img" src="${file ? URL.createObjectURL(file) : ''}"/>`);
        }else {
            element.find('div > img').attr('src', `${file ? URL.createObjectURL(file) : ''}`);
        }
        dragImage(element.find('div'), controllAxis);
        cancelImage(element.find('div > img'), element);
    }
}

function dragImage(element, direction) {
    element.on('mousedown', function(event) {
        const pos = {scrollX: element.scrollLeft(), scrollY: element.scrollTop(), mouseX: event.offsetX,mouseY: event.offsetY};
        $(this).on('mousemove', function(event) {
            const long = { x: event.offsetX - pos.mouseX, y: event.offsetY - pos.mouseY }
            if(direction === 'x') {
                $(this).scrollLeft(pos.scrollX - long.x);
            }else {
                $(this).scrollTop(pos.scrollY - long.y);
            }
        })
        $('html').on('mouseup', function(event) {
            element.unbind('mousemove');  
        });
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
    const { inputMutiFile, showImageUploaded, elementClick, linkPost, typeUpload } = option;
    let missOrderImageLenght;
    const objTypeStory = { type: [], details: {}, dataImage: []}; // obj data handle send sever
    let orderImage = [];
    let missOrderImage = [];
    let temp = 0, hold = 0, status = true;
    $(showImageUploaded).hide();
    $(inputMutiFile).on('change', function(event) {
        const files = event.target.files;
        $(showImageUploaded).show();
        for(const file of files) {
            if(objTypeStory.dataImage.find((obj) => obj.data.name === file.name)) {
                continue;
            }
            objTypeStory.dataImage.push({position: (temp + 1), data: file});
            $(showImageUploaded).find('.image__story--content').append(`
                <div class="image__story" id="" position="${temp}" value-name="${file.name}">
                    <span class="image__story--name">${file.name}</span>
                    <span class="image__story--size">${formatBytes(file.size)}</span>
                    <select name="order-${temp}" class="image__story--order">
                        <option value="NaN">No Tick</option>
                        <option selected value="${temp + 1}">${temp + 1}</option>
                    </select>
                </div>
            `);
            temp++;
        }
        // default run this code below
        if(status) {
            $('.box__show--image-loaded--right > .view-image > img').attr({
                value_name: objTypeStory.dataImage[0].data.name,
                src: URL.createObjectURL(objTypeStory.dataImage[0].data),
            });
            status = !status;
        }
        // do something when tag select to change!
        $('.image__story--order').on('change', function () {
            // re-render html check number is NaN or isNumber to render suitable for this state!
            $.each($('.image__story--order'), function (index, param) {
                const getVal = parseInt($(param).val());
                $(param).empty();
                if(getVal) {
                    $(param).append(`
                        <option value="NaN">No Tick</option>
                        <option selected value="${getVal}">${getVal}</option>
                    `);
                }else {
                    $(param).append(`
                        <option value="NaN">No Tick</option>
                    `);
                }
            })
            // find list number is shortcoming!
            $.each($('.image__story--order'), function (index, param) {
                const status = !parseInt(param.value) ? 'no-checked' : 'checked';
                orderImage.push({position: parseInt(index), value: parseInt(param.value), status});
            })
            for(let run = 0; run < orderImage.length; run++) {
                let isMiss = true;
                orderImage.forEach((item, index) => {
                    if((run + 1) === item.value) {
                        isMiss = false;
                        return;
                    }
                })
                if(isMiss) {
                    missOrderImage.push(run + 1);
                }
            }
            // render code html option with number shortcoming!
            $.each($('.image__story--order'), function (index, param) {
                missOrderImage.forEach((item) => {
                    $(param).append(`
                        <option value="${item}">${item}</option>
                    `);
                });
            })
            // sort list position number
            orderImage.forEach((item, index) => {
                objTypeStory.dataImage[index].position = item.value;
            })
            missOrderImageLenght = missOrderImage.length;
            orderImage = [];
            missOrderImage = [];
        });
        $('.image__story').on('click', function() {
            const thisName = this;
            $(thisName).css("background-color", "#1FB264");
            if(hold !== parseInt($(thisName).attr('position'))) {
                $(`.image__story[position=${hold}]`).css("background-color", "transparent");
            }
            hold = parseInt($(thisName).attr('position'));
            objTypeStory.dataImage.forEach((objData) => {
                if($(thisName).attr('value-name') === objData.data.name) {
                    $('.box__show--image-loaded--right > .view-image > img').attr({
                        value_name: objData.data.name,
                        src: URL.createObjectURL(objData.data),
                    });
                }
            })
        });
    });
    $('#sort-list-image').on('click', function() {
        if(missOrderImageLenght === 0) {
            objTypeStory.dataImage.sort(function(a, b) {
                return a.position - b.position;
            })
            objTypeStory.dataImage.forEach((item, index) => {
                $(`.image__story[position=${index}]`).attr('value-name', item.data.name);
                $(`.image__story[position=${index}]`).children('.image__story--name').text(item.data.name);
                $(`.image__story[position=${index}]`).children('select').empty();
                $(`.image__story[position=${index}]`).children('select').append(`
                    <option value="NaN">No Tick</option>
                    <option selected value="${item.position}">${item.position}</option>
                `);
            });
        }
    })
    $('#name-story').change(function() {
        objTypeStory.details.name = $(this).val();
        objTypeStory.details.chapter = parseInt($('#number-chapter').val());
    })
    $(elementClick).on('click', function() {
        const formStory = new FormData();
        if(!objTypeStory.dataImage.length) {
            aleartFail('Bạn chưa có dữ liệu nào!');
            return;
        }
        objTypeStory.dataImage.forEach((item, index) => {
            formStory.append('chapter', item.data);
        });
        const lengthString = document.URL.split('/').length;
        const id = document.URL.split('/')[lengthString - 1];
        //console.log(objTypeStory)
        // console.log(id)
        formStory.append('data_info', JSON.stringify({type: objTypeStory.type, details: objTypeStory.details}));
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
    })
}

export { 
    uploadSinglefile,
    showChildBox,
    loadImage,
    renderTypeStory,
};
