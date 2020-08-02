const express = require('express')
const adminController = require('@controllers/adminController')

const router = express.Router()

router.use((req, res, next) => {
  res.locals.layout = 'admin'
  next()
})

router.get('/', adminController.getIndexAdmin)
router.post('/', adminController.postArticle)

module.exports = router
