const crypto = require("crypto");
const { Order, OrderDetail, Product, Customer, Saler, Category } = require("../../models");

module.exports = {
  async index(req, res) {
    try {
      const data = await Order.findAll({
        include: [
          {
            model: OrderDetail,
            attributes: ["quantity"],
            include: [
              {
                model: Product,
                attributes: [
                  "productid",
                  "name",
                  "price",
                  "quantity",
                ],
              },
            ],
          },
          {
            model: Customer,
          },
        ],
        order: [["date", "DESC"]],
        raw: false,
        nest: true,
      });

      return res.status(200).json({
        status: 200,
        message: "Get list order/cart by  successful!",
        data: data,
      });

    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },

  async getbyCustomer(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Get all order by customer id"
        */
    try {
      const id = req.params["customerid"];
      let data = await Order.indAll({
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: db.Product,
                attributes: [
                  "productid",
                  "name",
                  "price",
                  "status",
                  "mainimg",
                  "quantity",
                ],
                include: [
                  {
                    model: Category,
                    attributes: ["catename"],
                    include: [
                      {
                        model: Saler,
                        attributes: ["name"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        order: [["date", "DESC"]],
        raw: false,
        nest: true,
        where: {
          customerid: id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Get list order/cart by customer id successful!",
        data: data,
      });
    } catch (error) {
      console.log("____Cannot get order cart by customer id");
    }
  },

  async store(req, res) {

    try {
      const customerid = req.body.customerid;
      const id = crypto.randomBytes(15).toString("hex");
      let result_1 = await OrderService.createOrder(id, customerid);
      console.log("____Create Empty Cart Successful");

      // if (result_1 != null && result_1 != "") {
      //   products.map(async function (item_cart) {
      //     await OrderDetailService.addOrderDetail(id, item_cart);
      //   });
      // }

      return res.status(200).json({
        status: 200,
        message: "Create Order Successful!",
        data: result_1,
      });
    } catch (err) {
      console.log("____Create Order Failed: ");
    }
  },

  async updateStatus(req, res) {
    /* 
        #swagger.tags = ['Order/Cart']
         #swagger.description = "Update status by orderid
         status: cart, pending_cast, pending_banking , done, canceled "
        */
    try {
      const orderid = req.params["orderid"];
      const tracking = req.body.tracking;

      let data = await OrderService.updateOrderStatus(orderid, tracking);
      console.log("____Update Order Tracking Successful");

      return res.status(200).json({
        status: 200,
        message: "Update Order Tracking Successful!",
        data: data,
      });
    } catch (err) {
      console.log("____Update Tracking Failed");
    }
  },
};
