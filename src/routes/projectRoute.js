const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController');
const { auth } = require('../middleware/auth.js');


router.get('/project', auth, projectController.getProject);
router.get('/project/:id', auth, projectController.details);
router.post('/project', auth, projectController.create);
router.put('/project/:id', auth, projectController.update);
router.delete('/project/:id', auth, projectController.delete);

module.exports = router;