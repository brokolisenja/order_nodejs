
const user = require('../models/user');
const role = require('../models/role');

const list = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let listRole = await role.getAll(checkUser.data);
        res.json(listRole);
    } else {
        // res.status(401);
        res.json(checkUser);
    }
};

module.exports = {
    list
};