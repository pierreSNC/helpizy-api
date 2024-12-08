// models/FAQ/Question.js
module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("Question", {
        id_question: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isSpotlight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: true,
        tableName: "question",
    }
    );

    Question.associate = (models) => {
        Question.hasMany(models.QuestionLang, {
            foreignKey: "id_question",
            as: "translations",
        });
    };

    return Question;
};
