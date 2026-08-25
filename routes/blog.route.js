const router = require('express').Router();
const controller = require('../controllers/blog.controller')

router.get('/all', controller.getAll)
router.get('/:id', controller.getById)
router.post('/create', controller.create)
router.put('/update/:id', controller.update)
router.delete('/remove/:id', controller.remove)

module.exports = router