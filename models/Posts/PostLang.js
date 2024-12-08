const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PostLang = sequelize.define(
        "PostLang",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_post: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Post",
                    key: "id",
                },
            },
            id_lang: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isIn: [[1, 2]]
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            excerpt: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            additionnal_content: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: false,
            tableName: "post_lang",
        }
    );

    return PostLang;
};
