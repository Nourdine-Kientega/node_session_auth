// auth.js in middleware folder

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return next();  // User is logged in, continue to the next middleware or route handler
    } else {
        return res.redirect('/login');  // Redirect to login if not logged in
    }
}

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();  // User is admin, continue to the next middleware or route handler
    } else {
        return res.redirect('/');  // Redirect to homepage if not admin
    }
}

function redirectIfLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect('/');  // If user is logged in, redirect to homepage
    } else {
        return next();  // If user is not logged in, proceed to login page
    }
}

// Export middleware functions
export { isLoggedIn, isAdmin, redirectIfLoggedIn };
