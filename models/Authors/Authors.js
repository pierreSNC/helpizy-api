const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define(
        "Author",
        {
            id_author: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            profile_picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "user",
            },
        },
        {
            timestamps: true,
            tableName: "author",
            hooks: {
                beforeCreate: async (author) => {
                    if (author.password) {
                        const salt = await bcrypt.genSalt(10);
                        author.password = await bcrypt.hash(author.password, salt);
                    }
                },
                beforeUpdate: async (author) => {
                    if (author.password && author.changed("password")) {
                        const salt = await bcrypt.genSalt(10);
                        author.password = await bcrypt.hash(author.password, salt);
                    }
                },
            },
        }
    );

    return Author;
};
