const router = require('express').Router(),
    User = require('../models/user'),
    passport = require('passport'),
    auth = require('../security/auth');


//home page on load
router.get('/', (request, respond) => {
    respond.render('welcome');
});


router.post('/user', passport.authenticate(
    'local-login', {
        failureRedirect: '/newuser',
        successRedirect: '/user'
    }
));


router.get(
    '/user',
    auth.restrict,
    (req, res) => {
        User
            .findByEmail(req.params.email)
            .then((user) => {
                res.render(
                    'user', { user: user }
                );
            })
            .catch(err => console.log('ERROR:', err));
    }
);

//register
router.get('/newuser', (request, respond) => {
    respond.render('newuser');
})

router.post(
    '/newuser', 
    passport.authenticate(
        'local-signup', {
            failureRedirect: '/newuser',
            successRedirect: '/user'
        }
    )
    
);


	


	

module.exports = router;
