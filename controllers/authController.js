
const user = require('../models/user');

const login = (req, res) => {
    res.render('auth/login');
};

const authenticate = async (req, res) => {
    let data = {
        username: req.body.login_username,
        password: req.body.login_password
    };

    let response = await user.authenticate(data);

    res.json(response);
};

module.exports = {
    login, authenticate
};