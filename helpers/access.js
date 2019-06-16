module.exports = {
    isLogin: function (req, res, next) {
        if (req.isAuthenticated() ) {
            return next()
        }
        req.flash('fail_msg', 'Você precisa estar Logado para Acessar esta Funcionalidade')
        res.redirect('/')
    },

    isAdmin: function(req, res, next) {
        if ( req.isAuthenticated() && req.user.access == 4 ) {
            return next()
        }
        //req.flash('error_msg', 'Você precisa ser Admin para Acessar esta funcionalidade')
        res.redirect('/')
    },
    isGM: function (req, res, next) {
        if (req.isAuthenticated() && req.user.access >= 3) {
            return next()
        }
        //req.flash('error_msg', 'Você precisa ser Admin para Acessar esta funcionalidade')
        res.redirect('/')
    },

    isCM: function (req, res, next) {
        if (req.isAuthenticated() && req.user.access >= 2) {
            return next()
        }
        //req.flash('error_msg', 'Você precisa ser Admin para Acessar esta funcionalidade')
        res.redirect('/')
    },
    isGold: function (req, res, next) {
        if (req.isAuthenticated() && req.user.access >= 1) {
            return next()
        }
        //req.flash('error_msg', 'Você precisa ser Admin para Acessar esta funcionalidade')
        res.redirect('/')
    }
}