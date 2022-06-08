const find  = require('../controllers/find.controller');

const router = require('express').Router();

router.get('/:controller/:term',find)

module.exports = router
