const { Question, QuestionLang } = require("../../models");

const QuestionController = {
    getAll: async (req, res) => {
        try {
            const questions = await Question.findAll({
                include: [
                    {
                        model: QuestionLang,
                        as: "translations",
                    },
                ],
            });
            res.status(200).json(questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).json({ message: "Error fetching questions" });
        }
    },

    create: async (req, res) => {
        const { active, isSpotlight, translations } = req.body;

        try {
            const question = await Question.create({
                active,
                isSpotlight,
            });

            if (translations && Array.isArray(translations)) {
                const questionLangs = translations.map((lang) => ({
                    ...lang,
                    id_question: question.id_question,
                }));
                await QuestionLang.bulkCreate(questionLangs);
            }

            res.status(201).json({ message: "Question created successfully", question });
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ message: "Error creating question" });
        }
    },

    getOne: async (req, res) => {
        const { id } = req.params;

        try {
            const question = await Question.findByPk(id, {
                include: [
                    {
                        model: QuestionLang,
                        as: "translations",
                    },
                ],
            });

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            res.status(200).json(question);
        } catch (error) {
            console.error("Error fetching question:", error);
            res.status(500).json({ message: "Error fetching question" });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { active, isSpotlight, translations } = req.body;

        try {
            const question = await Question.findByPk(id);

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            // Mettre à jour la question
            question.active = active;
            question.isSpotlight = isSpotlight;
            await question.save();

            // Mettre à jour les traductions
            if (translations && Array.isArray(translations)) {
                for (let lang of translations) {
                    const questionLang = await QuestionLang.findOne({
                        where: {
                            id_question: id,
                            id_lang: lang.id_lang,
                        },
                    });

                    if (questionLang) {
                        questionLang.title = lang.title;
                        questionLang.content = lang.content;
                        await questionLang.save();
                    }
                }
            }

            res.status(200).json({ message: "Question updated successfully", question });
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ message: "Error updating question" });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            // Vérifier si la question existe
            const question = await Question.findByPk(id);

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            // Supprimer les traductions associées à la question
            await QuestionLang.destroy({ where: { id_question: id } });

            // Supprimer la question elle-même
            await question.destroy();

            res.status(200).json({ message: "Question deleted successfully" });
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(500).json({ message: "Error deleting question" });
        }
    },
};

module.exports = QuestionController;
