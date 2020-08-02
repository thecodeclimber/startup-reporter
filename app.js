require('module-alias/register')

// Import (built-in)
const fs = require('fs')
const path = require('path')

// Imports (3rd party)
const cron = require('node-cron')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const mongoose = require('mongoose')
require('dotenv').config()
const rssParser = require('rss-parser')
const stripTags = require('striptags')

// Imports (custom)
const adminRoutes = require('@routes/adminRoutes')
const pageRoutes = require('@routes/pageRoutes')
const pageController = require('@controllers/pageController')
const ArticleModel = require('@models/articleModel')
const navLinksData = require('@data/navLinks')

// Constants
const app = express()
const dbURI = process.env.DB_URI
const host = process.env.HOST
const port = process.env.PORT

// App Setup
app.engine('html', expressHandlebars({ extname: 'html' }))
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

// Data
app.use((req, res, next) => {
  res.locals.navLinks = navLinksData.navLinks
  next()
})

ArticleModel.find()
  .lean()
  .sort({ createdAt: -1 })
  .limit(3)
  .then((result) => (app.locals.latestArticles = result))
  .catch((err) => console.log('Error message: ', err))

// Routes
app.use(pageRoutes)
app.use('/admin', adminRoutes)
app.use(pageController.get404Page)

// RSS Parser
cron.schedule('*/5 * * * *', () => {
  const parser = new rssParser({
    customFields: {
      item: [
        ['media:content', 'mediaContent', { keepArray: false }],
        ['updated', 'updated'],
        ['category', 'category', { keepArray: true }],
        ['link', 'link'],
        ['summary', 'summary'],
        ['source', 'source']
      ]
    }
  })

  ;(async () => {
    let feed = await parser.parseURL(
      'https://feedly.com/f/pWsYtBtG3JGsPQbfqhd6x3oL.atom'
    )
    // console.log('Category (Clean Tech): ', feed.title)

    const currentUpdate = new Date(feed.items[0].updated).getTime()
    const lastUpdateFile = path.join(
      __dirname,
      'src',
      'data',
      'last-update.txt'
    )
    let firstWrite = false

    if (!fs.existsSync(lastUpdateFile)) {
      firstWrite = true
    }

    feed.items.forEach((item) => {
      let articleObj = {}
      let currentUpdateTime = new Date(item.updated).getTime()
      let addItem = true
      let tagsArray = []

      if (!firstWrite) {
        let lastUpdate = fs.readFileSync(lastUpdateFile, 'utf8')

        if (lastUpdate >= currentUpdateTime) {
          addItem = false
        }
      }

      if (addItem) {
        if (item.category) {
          item.category.forEach((cat) => tagsArray.push(cat.$.term))
        }
        if (tagsArray.length > 0) {
          articleObj.tags = tagsArray
        }
        if (item.title) {
          articleObj.title = item.title
        }
        if (item.author) {
          articleObj.author = item.author
        }
        if (item.link) {
          articleObj.link = item.link
        }
        if (item.summary) {
          articleObj.summary = stripTags(item.summary)
          articleObj.content = item.summary
          // console.log('summary: ', item.summary)
          // console.log('summary raw: ', stripTags(item.summary))
        }
        if (item.pubDate) {
          articleObj.pubDate = item.pubDate
        }
        if (item.updated) {
          articleObj.updated = item.updated
        }
        if (item.isoDate) {
          articleObj.isoDate = item.isoDate
        }
        if (item.mediaContent) {
          articleObj.imageUrl = item.mediaContent.$.url
        }
        if (item.id) {
          articleObj.feedlyId = item.id
        }
        if (item.source.id[0]) {
          articleObj.sourceId = item.source.id[0]
        }
        if (item.source.title[0]._) {
          articleObj.sourceTitle = item.source.title[0]._
        }
        if (item.source.link[0].$.href) {
          articleObj.sourceLink = item.source.link[0].$.href
        }
        if (item.source.updated[0]) {
          articleObj.sourceUpdated = item.source.updated[0]
        }

        const articleDoc = new ArticleModel(articleObj)

        articleDoc
          .save()
          .then((result) => console.log(''))
          .catch((error) => console.log(error))
      } else {
        console.log('did not add item')
      }
    })

    fs.writeFileSync(lastUpdateFile, currentUpdate)
    // ArticleModel.deleteMany().then((result) => console.log(result))
    // ArticleModel.find().then((result) => console.log('result: ', result))
  })()
})

// Database
mongoose
  .connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    console.log('Connected to db')
    app.listen(port, () => {
      console.log(`Listening on Port ${port}: ${host}:${4000}`)
    })
  })
  .catch((error) => console.log('Error: ', error))
