const crypto = require('crypto');
const { Product, Category, Image } = require('../models')

const getProduct = async (req, res, next) => {
    try {
        const data = await Product.findAll({
            attributes: [
              "productid",
              "name",
              "quantity",
              "price",
              "status",
              "detail",
            ],
            include: [
              {
                model: Category,
                attributes: ["catename"],
              },
              {
                model: Image,
                attributes: ["image"],
                group: "productid",
              },
            ],
            raw: false,
            nest: true,
          });

        return res.status(200).json({
            status: 200,
            message: "Get all product successfully!",
            data: data,
        });
    } catch (e) { next(e); }
}

const getProductById = async (req, res, next) => {
    try {
      const data = await Product.findAll({
        where: {
          productid: req.params.id,
        },
        include: {
          model: Image,
          attributes: [
            "image",
          ],
          group: "productid",
        },
        raw: false,
        nest: true,
      });

        return res.status(200).json({
            status: 200,
            message: "Get product successfully!",
            data: data,
        });
    } catch (e) { next(e); }
}

module.exports = { getProduct, getProductById };