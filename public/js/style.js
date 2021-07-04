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
    const showImageUploadLeft = $('.box__show--image-loaded--left');
    const storageImage = [];
    showImageUploaded.hide();
    let temp = 0, hold = 0;
    inputMutiFile.change(function(event) {
        const files = event.target.files;
        showImageUploaded.show();
        for(const file of files) {
            if(storageImage.find((obj) => obj.data.name === file.name)) {
                continue;
            }
            storageImage.push({data: file});
            showImageUploadLeft.append(`
                <div class="image__story" id="" position="${temp++}" value-name="${file.name}">
                    <span class="image__story--name">${file.name}</span>
                    <span class="image__story--size">${formatBytes(file.size)}</span>
                </div>
            `);
        }
        $('.image__story').click(function() {
            const thisName = this;
            $(thisName).css("background-color", "#1FB264");
            if(hold !== parseInt($(thisName).attr('position'))) {
                $(`.image__story[position=${hold}]`).css("background-color", "transparent");
            }
            hold = parseInt($(thisName).attr('position'));
            storageImage.forEach((objData) => {
                if($(thisName).attr('value-name') === objData.data.name) {
                    $('.box__show--image-loaded--right').empty();
                    $('.box__show--image-loaded--right').append(`
                        <img value-name="${objData.data.name}" src="${URL.createObjectURL(objData.data)}">
                    `);
                }
            })
        });
        console.log(storageImage)
    });
}

export { inputStyle, renderTypeStory, mutifileUpload };
