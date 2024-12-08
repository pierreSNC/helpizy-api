// models/Category.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Category", {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        timestamps: true,
        tableName: "category",
    }
    );
};
