const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

const validateContact = [
  body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
  body('email').optional().isEmail().withMessage('Email inválido'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('category').optional().isIn(['trabajo', 'personal', 'familia', 'amigo', 'otro']),
  body('favorite').optional().isBoolean(),
];

router.route('/')
  .get(contactController.getContacts)
  .post(validateContact, contactController.createContact);

router.route('/:id')
  .get(contactController.getContact)
  .put(validateContact, contactController.updateContact)
  .delete(contactController.deleteContact);

router.put('/:id/favorite', contactController.toggleFavorite);

module.exports = router;