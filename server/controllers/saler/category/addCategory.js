const crypto = require('crypto');
const { Category } = require('../../../models')


const addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        const id = crypto.randomBytes(5).toString("hex");

        const category = await Category.create({
            cateid: id,
            catename: name,
            salerid: req.info.id,
            status: 1,
        });

        console.log("____Create Category Successfully");

        return res.status(200).json({
            status: 200,
            message: "Create category successfully!",
            data: category,
        });
    } catch (e) { next(e); }
}

module.exports = { addCategory };