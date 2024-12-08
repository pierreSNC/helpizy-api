const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostModel = require("./Posts/Post");
const PostLangModel = require("./Posts/PostLang");
const CategoryModel = require("./Categories/Category");
const CategoryLangModel = require("./Categories/CategoryLang");

const Post = PostModel(sequelize, DataTypes);
const PostLang = PostLangModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const CategoryLang = CategoryLangModel(sequelize, DataTypes);

// Définir les relations entre les modèles
Post.hasMany(PostLang, { foreignKey: "id_post", as: "translations" });
PostLang.belongsTo(Post, { foreignKey: "id_post", as: "post" });

Category.hasMany(CategoryLang, { foreignKey: "id_category", as: "translations" });
CategoryLang.belongsTo(Category, { foreignKey: "id_category", as: "category" });

module.exports = {
    sequelize,
    Post,
    PostLang,
    Category,
    CategoryLang,
};
