const express = require('express');

const router = express.Router();
const Joi = require('@hapi/joi');
const validate = require('express-joi-validate');

const { getTreeHandler, postTreeHandler } = require('./handlers');

const postTreeValidator = {
  body: {
    parent: Joi.number().required(),
    label: Joi.string().required(),
  },
};

router.get('/tree', getTreeHandler);
router.post('/tree', validate(postTreeValidator), postTreeHandler);

module.exports = router;
