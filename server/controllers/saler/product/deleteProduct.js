const { Product } = require('../../../models')

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await Product.update({
            status: 0,
        },
            {
                where: {
                    productid: id,
                },
            });

        console.log("____Delete Product Successfully");

        return res.status(200).json({
            status: 200,
            message: "Delete product successfully!",
            data: result,
        });
    } catch (e) { next(e); }
}

module.exports = { deleteProduct };