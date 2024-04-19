module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        cateid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        catename: DataTypes.STRING,
        salerid: DataTypes.STRING,
        status: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
        {
            sequelize,
            modelName: "Category",
        });
    Category.associate = function (models) {
        Category.belongsTo(models.Saler, { foreignKey: "salerid" });
        Category.hasMany(models.Product, { foreignKey: "cateid" });
    };
    return Category;
};