const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Post = sequelize.define(
        "Post",
        {
            id: {
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
                type: DataTypes.INTEGER,
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
        }
    );

    return Post;
};
