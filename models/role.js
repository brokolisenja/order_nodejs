
const knex = require('../util/knex');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const getAll = async (user) => {
    try{
        let data = await knex.select('*').from('tb_role');

        return {
            status: 'ok',
            data: data,
            user: user,
        }
    }
    catch (e) {
        console.log(e);
        return {
            status: 'nok',
            data: e
        }
    }
};
//aaa
module.exports = {
    getAll
};