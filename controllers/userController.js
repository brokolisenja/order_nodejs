
const user = require('../models/user');
const menu = require('../models/menu');

const list = async (req, res, next) => {
    res.render('user/list');
};

const listDatatable = async (req, res, next) => {
    let draw = req.query.draw;
    let start = parseInt(req.query.start);
    let length = parseInt(req.query.length);
    let order = req.query.order;

    let custom_search = {
        username: req.query.username,
        role: req.query.role,
    };

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let listUser = await user.getUser(start, length, draw, order, custom_search, checkUser);
        res.json({
            draw: draw,
            recordsTotal: listUser.recordsTotal,
            recordsFiltered: listUser.recordsFiltered,
            data: listUser.data,
            user: checkUser
        });
    } else {
        res.status(401);
        res.json(checkUser);
    }


};

const insert = async (req, res, next) => {
    let data = {
        username: req.body.add_username,
        password: req.body.add_password,
        role_id: req.body.add_role,
    };

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let result = await user.insert(data, checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }

};

module.exports = {
    list, listDatatable, insert
};