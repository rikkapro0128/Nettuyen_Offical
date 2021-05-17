class Views {
    home(req, res, next) {
        res.render('home');
    }
    signin(req, res, next) {
        res.render('signin');
    }
    signup(req, res, next) {
        res.render('signup');
    }
    about(req, res, next) {
        res.render('about');
    }
    showData(req, res, next) {
        console.log(req.cookies)
        res.redirect('/');
    }
}

export default new Views;