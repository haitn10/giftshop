module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        date: DataTypes.DATE,
        totalmoney: DataTypes.DECIMAL,
        customerid: DataTypes.STRING,
        status: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "Order",
        });
    Order.associate = function (models) {
        Order.belongsTo(models.Customer, { foreignKey: "customerid" });
        Order.hasMany(models.OrderDetail, { foreignKey: "orderid" });
    };
    return Order;
};
