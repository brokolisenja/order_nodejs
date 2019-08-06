const getID = require("../helper/getID")
const knex = require('../util/knex');
const moment = require('moment');

const insert = async (data, jwt) => {

    try{
        let id = getID.getProductID()
        let role = jwt.data.role_id;
        //role khusus merchant
        // console.log(role)
        if(role === 2){
            let dataInsert = {
                product_id: id,
                product_name: data.product_name,
                qty: data.qty,
                price: data.price,
                created_by: jwt.data.user_id,
                updated_by: jwt.data.user_id,
                created_at: knex.fn.now(),
                updated_at : knex.fn.now(),
            };

            let result = await knex.insert(dataInsert).into('tb_product');

            return {
                status: 'ok',
                data: result,
                message: 'Insert Success'
            }
        }else{
            return {status:"nok",data:"null",message :"Dont have access"}
        }

    }catch (e) {
        return {
            status: 'nok',
            data: e,
            message: 'Insert Failed'
        }
    }

};


const update = async (data, jwt) => {

    try{

        let role = jwt.data.role_id;
        //role khusus merchant

        if(role === 2){
            let dataUpdate = {
                product_name: data.product_name,
                qty: data.qty,
                price: data.price,
                updated_by: jwt.data.user_id,
                updated_at : knex.fn.now(),
            };

            let result = await knex('tb_product')
                .where('product_id', '=', data.product_id)
                .update(dataUpdate)

            return {
                status: 'ok',
                data: result,
                message: 'Update Success'
            }
        }else{
            return {status:"nok",data:"null",message :"Dont have access"}
        }

    }catch (e) {
        return {
            status: 'nok',
            data: e,
            message: 'Update Failed'
        }
    }

};

const deleteData = async (id, jwt) => {

    try{
        // console.log(jwt)

        let role = jwt.data.role_id;
        //role khusus merchant

        if(role === 2){
            let result = await knex('tb_product')
                .where('product_id', id)
                .del()

            return {
                status: 'ok',
                data: result,
                message: 'delete Success'
            }
        }else{
            return {status:"nok",data:"null",message :"Dont have access"}
        }

    }catch (e) {
        return {
            status: 'nok',
            data: e,
            message: 'delete Failed'
        }
    }

};

const getAllProduct = async () => {

    try{
        // console.log(jwt)

        let result = await knex.select('product.product_id','product.product_name','product.qty',
            'product.price',`user.name`, 'user.user_id as merchant_id').table('tb_product as product')
            .leftJoin('tb_user as user', 'product.created_by', 'user.user_id')

        return {
            status: 'ok',
            data: result,
            message: 'Get Data Success'
        }
    }catch (e) {
        return {
            status: 'nok',
            data: e,
            message: 'Get Data Failed'
        }
    }

};

module.exports = {
    insert,update,deleteData,getAllProduct
}