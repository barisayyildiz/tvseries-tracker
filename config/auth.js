module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('not_auth', 'Please log in to view that resource');
    res.redirect('/login');
  },
};
