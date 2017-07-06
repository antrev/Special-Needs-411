const passport = require('passport'),
      User = require('../models/user'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs');

const passportInstance = passport.initialize();
const passportSession = passport.session();

function restrict(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else if (req.method == 'POST'){
        res.send('logged out');
    } else {
        res.redirect('/');
    }
}


passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((userObj, done) => {
    User
        .findByEmail(userObj.email)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('ERROR in deserializeUser:', err);
            done(null, false);
        });
});


passport.use(
    'local-signup',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .create(req.body.user)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    console.log('ERROR:', err);
                    return done(null, false);
                });
        })
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: 'user[email]',
            passwordField: 'user[password]',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User
                .findByEmail(email)
                .then((user) => {
                    if (user) {
                        const isAuthed = bcrypt.compareSync(password, user.password_digest);
                        if (isAuthed) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    } else {
                        return done(null, false);
                    }
                });
        })
);




module.exports = { passportInstance, passportSession, restrict };
