import '../owlcarousel/owl.carousel.min.js';
import '../owlcarousel/jquery.mousewheel.min.js'
import owl from './optionOwl.js';
import { handleForm, handleLoadImage } from './handleForm.js';
import { 
    inputStyle,
    renderTypeStory,
    loadImageStory,
    uploadStory,
    handleClickListStory
} from './style.js';
import { uploadSinglefile, showChildBox, loadImage, uploadChapterStory } from './mixin.js';

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
    renderTypeStory();
    uploadStory();
    handleClickListStory();
    uploadSinglefile($('.story__pic--avatar-story'), 'x');
    uploadSinglefile($('.story__pic--cover-story'), 'y');
    showChildBox($('.story__add--chapter-title#show-box'), $('.story__add--chapter-content-box'), ['<i class="fas fa-caret-right"></i>', '<i class="fas fa-caret-down"></i>']);
    loadImage($('#add-chapter'), $('.box__show--image-loaded'));
    loadImageStory($('#mutifile-upload-story'), $('.box__show--image-loaded'));
    uploadChapterStory($('#update-chapter > button'));
});