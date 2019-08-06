
const knex = require('../util/knex');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const getByUser = async (user) => {
    try{
        let data = await knex('tb_menu_matrix as matrix')
            .join('tb_menu_all as menu', 'matrix.menu_id', 'menu.menu_id')
            .select('menu.*', 'matrix.menu_parent_id', 'matrix.matrix_order')
            .where('matrix.role_id', user.role_id)
            .where('matrix.matrix_status', 1)
            .orderBy('matrix.menu_parent_id', `ASC`)
            .orderBy(`matrix.matrix_order`, `ASC`);

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

module.exports = {
    getByUser
};