const ArticleModel = require('../models/articleModel')

exports.getIndexPage = (req, res) => {
  ArticleModel.find()
    .lean()
    .sort({ createdAt: -1 })
    .limit(3)
    .then((result) => {
      res.render('index', {
        pageTitle: 'Startup Reporter',
        articles: result
      })
    })
    .catch((err) => console.log('Error message: ', err))
}

exports.get404Page = (req, res) => {
  res.render('404', {
    pageTitle: 'Page Not Found (404 Error) | Startup Reporter'
  })
}
