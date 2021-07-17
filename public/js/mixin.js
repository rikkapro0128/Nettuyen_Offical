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
        console.log('Drag leave element!');
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
        if(!element.children('img')[0]) {
            element.append(`<img id="show-img" src="${file ? URL.createObjectURL(file) : ''}"/>`);
        }else {
            element.children('img').attr('src', `${file ? URL.createObjectURL(file) : ''}`);
        }
        dragElement(element.children('img'), controllAxis);
        cancelImage(element.children('img'), element);
    }
}

function dragElement(element, controllAxis) {
    element.css({'left': '0'});
    element.draggable({
        axis: controllAxis,
        drag: function(event, ui) {
            
        }
    });
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
