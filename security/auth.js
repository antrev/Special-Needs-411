const passport = require('passport'),
    user = require('../models/user'),
    LocalStorage = require('passport-local').Strategy,
    bcrypt = require('bcrypt');

const passportInstance = passport.Initialize();
const passportSession = passport.session();

function restrict(request, respond, next) {
    if (request.isAuthenticated()) {
        next();
    } else {
        respond.redirect('/');
    }
} //restrict


passport.serializeUser((user, done) => {
    done(null, user);
});


// passport.deserializeUser((userObj, done) => {
//     user.findByEmail(userObj.email)
//     .then(user => {
//             done(null, false);
//         }); //user
// }); //passport


passport.use('local-signup', new localStrategy({
                usernameFiled: 'user[email]',
                passwordField: 'user[password]',
                passReqToCallback: true
            },
            (request, emil, password, done) => {
                user.create(request.body.user);
                .then((user) => {
                    return done(null, user);
                });
            })
);

passport.use( 'local-signup', new localStrategy({
	usernameFiled: 'user[email]',
	passwordFiled: 'user[password]',
	passReqToCallback: true
},
(request, email, password, done) => {
	user.findByEmail(email)
	.then((user) => {
		const isAthued = bcrypt.compareSync(password, user.password_digest);
		if (isAuthed){
			return done(null, user);
		} else {
			return done(null, false);
		} else{
			return done(null, false);
		}
	})
}

);


module.exports = { passportInstance, passportSession, restrict };
