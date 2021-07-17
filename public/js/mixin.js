import '../jquery-ui-1.12.1/jquery-ui-1.12.1/jquery-ui.min.js';

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

function cancelImage(element, eleParent) {
    eleParent.children('i.fa-trash-alt').on('click', function(event) {
        element.attr('src', '');
        eleParent.removeClass('img-cancel');
        eleParent.children('button').show();
    })
    eleParent.addClass('img-cancel');
    eleParent.children('button').hide();
}

// edit position default image

export { 
    uploadSinglefile,
};
