const router = require('express').Router();
const { User } = require('../../models');

//create new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            password: req.body.password,
        })
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.userName = newUser.userName;
            req.session.loggedIn = true;
            res.json(newUser);
        })
    }
    catch(err) {
        res.status(500).json(err)
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { username: req.body.userName }
        })
        if (!user) {
            res.status(400).json({ message: 'User Not Found' })
            return;
        }
        const validatePassword = user.checkPassword(req.body.password)
        if (!validatePassword) {
            res.status(400).json({ message: 'User Not Found' })
            return;
        }
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.userName = newUser.userName;
            req.session.loggedIn = true;
            res.json({ user, message: 'You Are Logged In!' });
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        })
    } else {
        res.status(404).end()
    }
});

module.exports = router;