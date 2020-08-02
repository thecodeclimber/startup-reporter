const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: String,
    author: String,
    category: String,
    tags: [String],
    link: String,
    imageUrl: String,
    summary: String,
    content: String,
    feedlyId: String,
    sourceId: String,
    sourceTitle: String,
    sourceLink: String,
    sourceUpdated: String,
    pubDate: Date,
    updated: Date,
    isoDate: Date
  },
  {
    timestamps: true
  }
)

const Article = mongoose.model('Article', articleSchema)

module.exports = Article
