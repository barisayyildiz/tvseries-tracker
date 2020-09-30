require("dotenv").config();


module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('not_auth', 'Please log in to view that resource');
    res.redirect('/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');      
  },
  ensureAdmin : function (req, res, next)
  {
    if(req.user != undefined && req.user.email == process.env.ADMIN_EMAIL)
    {
      return next();
    }
    res.redirect("/");
  }
};
