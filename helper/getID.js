let getProductID = () =>{
    let random = process.hrtime();
    let prod_id = "PR" + random[1];

    return prod_id
}

module.exports = {
    getProductID
}