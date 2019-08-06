
const user = require('../models/user');
const menu = require('../models/menu');

const list = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let listMenu = await menu.getByUser(checkUser.data);
        res.json(listMenu);
    } else {
        res.status(401);
        res.json(checkUser);
    }
};

module.exports = {
    list
};