// const AdminModel = require('../models/adminModel')
const ArticleModel = require('../models/articleModel')

exports.getIndexAdmin = (req, res) => {
  res.render('admin/edit', { pageTitle: 'Admin' })
}

exports.postArticle = (req, res) => {
  const articleDoc = new ArticleModel(req.body)

  articleDoc
    .save()
    .then((result) => {
      console.log(result)
      res.redirect('/')
    })
    .catch((err) => console.log(err))
}
