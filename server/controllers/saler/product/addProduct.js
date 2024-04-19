const crypto = require('crypto');
const { Product } = require('../../../models')

const addProduct = async (req, res, next) => {
    const { name, quantity, price, cateid, detail } = req.body;

    try {
        const id = crypto.randomBytes(15).toString("hex");

        const result = await Product.create({
            productid: id,
            name: name,
            quantity: quantity,
            price: price,
            status: 1,
            cateid: cateid,
            detail: detail,
            salerid: req.info.id,
        });

        console.log("____Create Product Successfully");
        return res.status(200).json({
            status: 200,
            message: "Create product successfully!",
            data: result,
        });
    } catch (e) { next(e); }
}

module.exports = { addProduct };