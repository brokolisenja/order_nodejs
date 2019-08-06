
const knex = require('../util/knex');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const authenticate = async (data) => {
    try {

        let user = await knex.select('*').from('tb_user').where({
            'user_username': data.username
        });

        if(user.length > 0){
            if(bcrypt.compareSync(data.password, user[0].user_password)){
                let token = jwt.sign({
                    user_id: user[0].user_id,
                    role_id: user[0].role_id,
                    username: user[0].user_username,
                }, process.env.JWT_KEY);
                return {
                    status: 'ok',
                    data: token
                };
            }
            else {
                return {
                    status: 'nok',
                    data: 'Password Salah'
                }
            }
        }
        else {
            return {
                status: 'nok',
                data: 'User Tidak Terdaftar'
            };
        }
    }
    catch (e) {
        console.log(e);
        return {
            status: 'nok',
            data: e
        };
    }
};

const checkUser = async (token) => {
    try{
        if(!token){
            return {
                status: 'nok',
                data: 'Invalid Token'
            };
        }
        else {
            let data = await jwt.verify(token, process.env.JWT_KEY);
            return {
                status: 'ok',
                data: data
            }
        }
    }
    catch (e) {
        console.log(e);
        return {
            status: 'nok',
            data: "invalid token"
        }
    }
};

const getUser = async (start, length, draw, order, custom_search, checkUser) => {
    try{
        let orderDir = order[0].dir;
        let orderColumn = parseInt(order[0].column);
        let query = knex(`tb_user as user`)
            .join(`tb_role as role`, `user.role_id`, `=`, `role.id_role`)
            .select(`user.user_id`, `user.user_username`, `user.created_at`, `user.role_id`, 'role.nama as role_name')
            .where(`user.user_username`, `like`, `%${custom_search.username}%`);

        if(custom_search.role != null && custom_search.role !== "null" && custom_search.role !== ""){
            console.log(custom_search.role);
            query = query.where(`user.role_id`,  `${custom_search.role}`);
        }

        switch (orderColumn) {
            case 0:
                query = query.orderBy('user.created_at', orderDir);
                break;
            case 1:
                query = query.orderBy('user.user_username', orderDir);
                break;
            default:
                query = query.orderBy('user.created_at', 'DESC');
                break;
        }

        let fullList = await query;
        let limitList = await query.limit(length).offset(start);

        let data = [];
        for (let i = 0; i < limitList.length; i++) {
            data[i] = [];
            data[i][0] = (i + 1) + start;
            data[i][1] = limitList[i].user_username;
            data[i][2] = limitList[i].role_name;
            data[i][3] = limitList[i].created_at;
            data[i][4] = limitList[i].user_id;
        }
        return {
            data: data,
            recordsTotal: fullList.length,
            recordsFiltered: fullList.length
        };

    }
    catch (e) {
        console.log(e);
        return {
            status: 'nok',
            data: e
        }
    }
};

const insert = async (data, user) => {
    let id = "US" + moment().format("YYYYMMDDHHmmssx");


    let dataInsert = {
        user_id: id,
        role_id: data.role_id,
        user_username: data.username,
        user_password: bcrypt.hashSync(data.password),
        created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    let result = await knex.insert(dataInsert).into('tb_user');

    return {
        status: 'ok',
        data: result
    }
};

module.exports = {
    authenticate, checkUser, getUser, insert
};