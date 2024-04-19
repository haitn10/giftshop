module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customerid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
        image: DataTypes.STRING,
        password: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: "Customer",
            timestamps: false,
        });
    Customer.associate = function (models) {
        Customer.hasMany(models.Order, { foreignKey: "customerid" });
    };
    return Customer;
};
