module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
        status: DataTypes.STRING,
        cateid: DataTypes.STRING,
        detail: DataTypes.STRING,
        salerid: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "Product",
        });
    Product.associate = function (models) {
        Product.belongsTo(models.Category, { foreignKey: "cateid" });
        Product.hasMany(models.OrderDetail, { foreignKey: "productid" });
        Product.hasMany(models.Image, { foreignKey: "productid" });
    };
    return Product;
};
