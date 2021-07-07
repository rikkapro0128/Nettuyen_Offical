let missOrderImageLenght;
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
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
} 

function mutifileUpload() {
    const inputMutiFile = $('#mutifile-upload-story');
    const showImageUploaded = $('.box__show--image-loaded');
    const showImageUploadLeft = $('.image__story--content');
    const storageImage = [];
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
            $('.box__show--image-loaded--right > .view-image').append(`
                <img value-name="${storageImage[0].data.name}" src="${URL.createObjectURL(storageImage[0].data)}">
            `);
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
            console.log(storageImage)
            orderImage = [];
            missOrderImage = [];
        });
        $('.image__story').on('click', function() {
            console.log('click')
            const thisName = this;
            $(thisName).css("background-color", "#1FB264");
            if(hold !== parseInt($(thisName).attr('position'))) {
                $(`.image__story[position=${hold}]`).css("background-color", "transparent");
            }
            hold = parseInt($(thisName).attr('position'));
            storageImage.forEach((objData) => {
                if($(thisName).attr('value-name') === objData.data.name) {
                    $('.box__show--image-loaded--right > .view-image').empty();
                    $('.box__show--image-loaded--right > .view-image').append(`
                        <img value-name="${objData.data.name}" src="${URL.createObjectURL(objData.data)}">
                    `);
                }
            })
        });
        $('.view-image > img').on('mousemove', function (event) {
            const src = $(this).children('img').attr('src');
            const coordinateEleX = $(this).offset().left;
            const coordinateEleY = $(this).offset().top;
            const { mouseX, mouseY } = { mouseX: event.pageX - coordinateEleX, mouseY: event.pageY - coordinateEleY };
            // const { zoomX, zoomY } = { zoomX: mouseX * (imageX / mouseX), zoomY: mouseY * (imageY / mouseY) };
            console.log({ mouseX, mouseY })
        })
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
}

export { inputStyle, renderTypeStory, mutifileUpload, };
