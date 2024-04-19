module.exports = (sequelize, DataTypes) => {
    const Saler = sequelize.define('Saler', {
        salerid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        image: DataTypes.STRING,
        address: DataTypes.STRING,
        password: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "Saler",
            timestamps: false,
        });
    Saler.associate = function (models) {
        Saler.hasMany(models.Product, { foreignKey: "salerid" });
    };
    return Saler;
};