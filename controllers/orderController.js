const user = require('../models/user');
const order = require('../models/orderModel');


const orderInsert = async (req, res, next) => {

    let data = {
        product_id: req.body.product_id,
        merchant_id: req.body.merchant_id,
        price: req.body.price,
        qty: req.body.qty
    };


    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);


    if(checkUser.status === "ok"){
        let result = await order.orderProduct(data, checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
};

const getDataOrder = async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let result = await order.getOrderProduct(checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
}

module.exports = {
    orderInsert,getDataOrder

}