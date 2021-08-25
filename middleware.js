

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl 
        // req.flash('error', 'You must be signed in!');
        return res.redirect('/login'); //if is not returned, the reststill runs
        }
        next();
    }