const { body, validationResult } = require("express-validator");

exports.validateProperty = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("bedrooms").isInt({ min: 1 }).withMessage("Bedrooms must be at least 1"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
