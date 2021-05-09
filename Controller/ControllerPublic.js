class Public {
    home(req, res, next) {
        res.render('home');
    }
    about(req, res, next) {
        res.render('about');
    }
}

export default new Public;