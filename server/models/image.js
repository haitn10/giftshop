module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        imageid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        productid: DataTypes.INTEGER,
        image: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "Image",
        });
    Image.associate = function (models) {
        Image.belongsTo(models.Product, { foreignKey: "productid" });
    };
    return Image;
};
