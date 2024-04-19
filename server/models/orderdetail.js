module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        orderdetailid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        quantity: DataTypes.INTEGER,
        orderid: DataTypes.STRING,
        productid: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        feedback: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "OrderDetail",
        });
    OrderDetail.associate = function (models) {
        OrderDetail.belongsTo(models.Product, { foreignKey: "productid" });
        OrderDetail.belongsTo(models.Order, { foreignKey: "orderid" });
    };
    return OrderDetail;
};
