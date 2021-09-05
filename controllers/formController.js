class FormController{
    // [GET] /
    index(req, res, next){
        const error = req.flash('messageLogin') || '';
        res.render('login', { layout: 'loginLayout', message: error });
    }
}

module.exports = new FormController();