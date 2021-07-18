import { aleartFail, aleartSuccess } from './handleForm.js';

let missOrderImageLenght;
const storageImage = [];
const objTypeStory = { type: [], details: {}, dataImage: []};
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

function renderTypeStory() {
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
            objTypeStory.type = objTypeStory.type.filter((ele, index) => ele !== typeStory[parseInt($(this).attr('id'))].name)
        }
        objTypeStoryStack.forEach((item, index) => {
            objTypeStory.type.push(typeStory[item.id].name);
        })
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

function actionViewLoadStory() {
    const inputMutiFile = $('#mutifile-upload-story');
    const showImageUploaded = $('.box__show--image-loaded');
    const showImageUploadLeft = $('.image__story--content');
    let orderImage = [];
    let missOrderImage = [];
    showImageUploaded.hide();
    let temp = 0, hold = 0, status = true;
    inputMutiFile.on('change', function(event) {
        const files = event.target.files;
        showImageUploaded.show();
        for(const file of files) {
            if(storageImage.find((obj) => obj.data.name === file.name)) {
                continue;
            }
            storageImage.push({position: (temp + 1), data: file});
            showImageUploadLeft.append(`
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
                value_name: storageImage[0].data.name,
                src: URL.createObjectURL(storageImage[0].data),
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
                storageImage[index].position = item.value;
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
            storageImage.forEach((objData) => {
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
            storageImage.sort(function(a, b) {
                return a.position - b.position;
            })
            storageImage.forEach((item, index) => {
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
    $('.add-your-story__context--name--number-chapter input[id=name-story]').change(function() {
        objTypeStory.details.name = $(this).val();
    })
    $('.add-your-story__context--name--number-chapter input[id=number-chapter]').change(function() {
        objTypeStory.details.chapter = parseInt($(this).val());
    })
}

function uploadStory() {
    $('.submit-story').on('click', function() {
        const formStory = new FormData();
        const id = $('.avatar__name--user').attr('id_user');
        if(!storageImage.length) {
            aleartFail('Bạn chưa có dữ liệu nào!');
        }
        objTypeStory.dataImage = [...storageImage];
        objTypeStory.dataImage.forEach((item, index) => {
            formStory.append('story', item.data);
        });
        formStory.append('data_info', JSON.stringify({type: objTypeStory.type, details: objTypeStory.details}));
        fetch(`http://localhost:3300/user/upload-story/${id}`, {
            method: 'POST',
            body: formStory,
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            if(result) {
                aleartSuccess('Update successful!', 'http://localhost:3300/user/add-your-storys');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })
}

function handleClickListStory() {
    $('.your-post__list--table-row--content').click(function() {
        const idUser = $(this).attr('id_story');
        window.location.href = `http://localhost:3300/user/edit-your-storys/${idUser}`;
    })
}

export { inputStyle, renderTypeStory, actionViewLoadStory, uploadStory, handleClickListStory };
