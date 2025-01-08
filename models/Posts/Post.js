const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define(
        "Post",
        {
            id_post: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_author: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            thumbnail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            video_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nb_like: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
            tableName: "post",
            freezeTableName: true,
        }
    );
};
