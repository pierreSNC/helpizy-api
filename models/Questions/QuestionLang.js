// models/FAQ/QuestionLang.js
module.exports = (sequelize, DataTypes) => {
    const QuestionLang = sequelize.define("QuestionLang", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_question: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_lang: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "question_lang",
    }
    );

    // Liaisons : Une traduction appartient à une question
    QuestionLang.associate = (models) => {
        QuestionLang.belongsTo(models.Question, {
            foreignKey: "id_question",
            as: "question",
        });
    };

    return QuestionLang;
};
