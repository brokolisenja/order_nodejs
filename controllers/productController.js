const user = require('../models/user');
const product = require('../models/productModel');

const productInsert = async (req, res, next) => {

    let data = {
        product_name: req.body.product_name,
        qty: req.body.qty,
        price: req.body.price,
    };
   // console.log(req.body)

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    //console.log(checkUser)

    if(checkUser.status === "ok"){
        let result = await product.insert(data, checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
};

const productUpdate = async (req, res, next) => {
    let data = {
        product_id : req.body.product_id,
        product_name: req.body.product_name,
        qty: req.body.qty
    };
    // console.log(req.body)

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    //console.log(checkUser)

    if(checkUser.status === "ok"){
        let result = await product.update(data, checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
}

const productDelete = async (req, res, next) => {
    let id = req.params.id;
    // console.log(req.body)

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    //console.log(checkUser)

    if(checkUser.status === "ok"){
        let result = await product.deleteData(id, checkUser);

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
}


const productGetData = async (req, res, next) => {

    const token = req.headers['authorization'].replace('Bearer ', '');

    let checkUser = await user.checkUser(token);

    if(checkUser.status === "ok"){
        let result = await product.getAllProduct();

        res.json(result);
    } else {
        res.status(401);
        res.json(checkUser);
    }
}



module.exports = {
    productInsert,
    productUpdate,
    productDelete,
    productGetData
}