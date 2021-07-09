import '../owlcarousel/owl.carousel.min.js';
import '../owlcarousel/jquery.mousewheel.min.js'
import owl from './optionOwl.js';
import { handleForm, handleLoadImage } from './handleForm.js';
import { inputStyle, renderTypeStory, actionViewLoadStory, uploadStory } from './style.js';

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
    actionViewLoadStory();
    uploadStory();
});