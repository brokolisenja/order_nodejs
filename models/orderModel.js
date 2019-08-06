const knex = require('../util/knex');
const moment = require('moment');

const orderProduct = async (data, jwt) => {

    try{
        //checkQTY
        console.log(`oerder masuk`)
       let check = await checkQty(data.product_id , data.qty)

        //console.log(check)
        if(check === true){
            let dataInsert = {
                cust_id: jwt.data.user_id,
                product_id: data.product_id,
                merchant_id: data.merchant_id,
                reward: parseInt(data.price) > 10000 ? 1 : 2,
                qty: data.qty,
                created_at: knex.fn.now(),
            };

            await knex.insert(dataInsert).into('tb_order');

            await knex('tb_product as product')
                .where('product_id', '=', data.product_id)
                .update({qty : knex.raw('?? - 1', ['qty'])})

            return {
                status: 'ok',
                data: 'success',
                message: 'Order Success'
            }
        }else{
            return {
                status: 'nok',
                data: 'Out of Stock',
                message: 'Order Failed'
            }
        }

    }catch (e) {
        return {
            status: 'nok',
            data: e,
            message: 'Insert Failed'
        }
    }

};

const checkQty = async (prod_id,qty) => {
    let result = await knex.select('qty').table('tb_product')
        .where('product_id','=', prod_id)

    if(parseInt(result[0].qty) > 0 && parseInt(result[0].qty) >= parseInt(qty)){
        console.log('ok')
        return true

    }else{
        console.log('nok')
        return false
    }
}


const getOrderProduct = async (jwt) => {
    let role = jwt.data.role_id;
    //role khusus merchant
    console.log(role)
    if(role === 2){

        let result = await knex.select('user.name','product.product_name','order.created_at','order.qty').table('tb_order as order')
            .where('merchant_id','=', jwt.data.user_id)
            .leftJoin('tb_user as user', 'order.cust_id', 'user.user_id')
            .leftJoin('tb_product as product', 'order.product_id', 'product.product_id');


        if(result.length > 0){
            return {
                status : 'ok',
                data : result,
                message : "Get data Success"
            }
        }else{
            return {status:"nok",data:"null",message :"Data Null"}
        }

    }else{
        return {status:"nok",data:"null",message :"Dont have access"}
    }



}



module.exports = {
    orderProduct,getOrderProduct
}