// models/CategoryLang.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("CategoryLang", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_category: {
            type: DataTypes.INTEGER,
        },
        id_lang: DataTypes.INTEGER,
        title: DataTypes.STRING,
        excerpt: DataTypes.STRING,
        content: DataTypes.TEXT,
    },
    {
        timestamps: false,
        tableName: "category_lang",
    }
    );
};
