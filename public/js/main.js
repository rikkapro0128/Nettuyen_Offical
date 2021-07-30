import owl from './optionOwl.js';
import { handleForm, handleLoadImage, addStory } from './handleForm.js';
import { 
    inputStyle,
    clickEditListStory,
    clickRemoveListStory,
    clickStory,
    checkBox,
    selectBox,
    selectAllCheckBox,
    handleExecSelectOption,
} from './style.js';
import { uploadSinglefile, showChildBox, loadImage, updateStory } from './mixin.js';

$(function() {
    // do something!
    const option = {
        idElement: {
            signin: '#sign-in',
            signup: '#sign-up',
        },
        port: 3300,
        path: {
            signin: 'api/signin',
            signup: 'api/signup',
        },
        domain: 'localhost',
        message: {
            signin: 'Bạn đã đăng nhập thành công!',
            signup: 'Bạn đã đăng ký thành công!',
        },
        urlRedirect: {
            signin: '/',
            signup: '/',
        },
    }
    owl();
    handleForm(option);
    handleLoadImage();
    inputStyle();
    checkBox();
    selectBox();
    clickEditListStory('td button#edit-story'); // query equal class
    clickRemoveListStory('td button#remove-story'); // query equal class
    uploadSinglefile($('.story__pic--avatar-story'), 'x', 2.5);
    uploadSinglefile($('.story__pic--cover-story'), '', 1);
    // showChildBox($('.story__add--chapter-title#show-box'), $('.story__add--chapter-content-box'), ['<i class="fas fa-caret-right"></i>', '<i class="fas fa-caret-down"></i>']);
    addStory({
        elementClick: '.submit-story.btn',
        linkPost: 'http://localhost:3300/user/upload-story',
    });
    loadImage({
        inputMutiFile: '#add-chapter',
        showImageUploaded: 'add-story__tool--show-image',
        table: '.add-story__tool--list-image',
        elementClick: '#update-chapter > button',
        linkPost: 'http://localhost:3300/user/upload-chapter',
        typeUpload: 'chapter',
    });
    updateStory('http://localhost:3300/user/upload-avatar-cover');
    clickStory($('.story[id-story]'));
    selectAllCheckBox('#element-check-all', '.checkbox.element-check');
    handleExecSelectOption();

});