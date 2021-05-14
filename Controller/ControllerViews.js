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
}

export default new Views;