const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PostModel = require("./Posts/Post");
const PostLangModel = require("./Posts/PostLang");
const CategoryModel = require("./Categories/Category");
const CategoryLangModel = require("./Categories/CategoryLang");
const AuthorModel = require("./Authors/Authors");
const QuestionModel = require("./Questions/Question");
const QuestionLangModel = require("./Questions/QuestionLang");
const UserModel = require("./Users/User");

const Post = PostModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const CategoryLang = CategoryLangModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);
const Question = QuestionModel(sequelize, DataTypes);
const QuestionLang = QuestionLangModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const PostLang = PostLangModel(sequelize, DataTypes);


Post.hasMany(PostLang, { foreignKey: "id_post", as: "translations" });
PostLang.belongsTo(Post, { foreignKey: "id_post", as: "post" });

Category.hasMany(CategoryLang, { foreignKey: "id_category", as: "translations" });
CategoryLang.belongsTo(Category, { foreignKey: "id_category", as: "category" });

Author.hasMany(Post, { foreignKey: "id_author", as: "posts" });
Post.belongsTo(Author, { foreignKey: "id_author", as: "author" });

Question.hasMany(QuestionLang, { foreignKey: "id_question", as: "translations" });
QuestionLang.belongsTo(Question, { foreignKey: "id_question", as: "question" });

module.exports = {
    sequelize,
    Post,
    PostLang,
    Category,
    CategoryLang,
    Author,
    Question,
    QuestionLang,
    User
};
