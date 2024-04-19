const crypto = require('crypto');
const { Product } = require('../../../models')

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, quantity, price, cateid, detail } = req.body;

        const result = await Product.update({
            name: name,
            quantity: quantity,
            price: price,
            cateid: cateid,
            detail: detail,
        }, {
            where: {
                productid: id,
            },
        });

        console.log("____Updated Product Successfully");

        return res.status(200).json({
            status: 200,
            message: "Updated product successfully!",
        });
    } catch (e) { next(e); }
}

module.exports = { updateProduct };