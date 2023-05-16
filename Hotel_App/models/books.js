const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string()
        .required(),
    isbn: Joi.string()
        .required(),
    createdDate: Joi.date(),
    authorId: Joi.number()
        .integer()
        .min(1)
        .required(),
    description: Joi.string(),
    isAvailable: Joi.boolean()
        .default(true),
    unavailableUntil: Joi.date()
})

module.exports = bookSchema;