module.exports = {
    isLogin: function (req, res, next) {
        if (req.isAuthenticated() ) {
            return next()
        }
        req.flash('fail_msg', 'Você precisa estar Logado para Acessar')
        res.redirect('/login')
    },

    isAdmin: function(req, res, next) {
        if ( req.isAuthenticated() && req.user.access == 4 ) {
            return next()
        }
        //req.flash('error_msg', 'Você precisa ser Admin para Acessar esta funcionalidade')
        res.redirect('/login')
    }
}