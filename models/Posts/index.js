// models/index.js
const { Sequelize } = require("sequelize");
const PostModel = require("./Post");
const PostLangModel = require("./PostLang");

const sequelize = new Sequelize("helpizy", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

const Post = PostModel(sequelize);
const PostLang = PostLangModel(sequelize);

// Définir les associations
Post.hasMany(PostLang, { foreignKey: "id_post", as: "translations" });
PostLang.belongsTo(Post, { foreignKey: "id_post", as: "post" });

module.exports = {
    sequelize,
    Post,
    PostLang,
};
