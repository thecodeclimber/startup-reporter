const express = require('express')
const pageController = require('../controllers/pageController')

const router = express.Router()

router.get('/', pageController.getIndexPage)
router.get('/about', pageController.getIndexPage)
router.get('/news', pageController.getIndexPage)

module.exports = router
