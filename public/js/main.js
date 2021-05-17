import '../owlcarousel/owl.carousel.min.js';
import '../owlcarousel/jquery.mousewheel.min.js'
import owl from './optionOwl.js';
import { handleForm } from './handleForm.js'

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
            signin: 'Bạn đã đăng nhập thành công, nhấn OK để quay lại trang chủ nha!',
            signup: 'Bạn đã đăng ký thành công, nhấn OK để quay lại trang chủ nha!',
        },
        urlRedirect: {
            signin: '/',
            signup: '/',
        },
    }
    owl();
    handleForm(option);
});