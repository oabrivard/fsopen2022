const _ = require('lodash')

const totalLikes = (blogs) => {
  return blogs.reduce((acc,blog) => acc+blog.likes,0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((acc,blog) => blog.likes > acc.likes ? blog : acc, { likes: -1 })
}

const mostBlogs = (blogs) => {
  const authors = _.map(_.groupBy(blogs,'author'), (v,k) => {
    return { author: k, blogs: v.length }
  })

  return _.last(_.sortBy(authors,['blogs']))
}

const mostLikes = (blogs) => {
  const authors = _.map(_.groupBy(blogs,'author'), (v,k) => {
    const likes = _.sumBy(v,'likes')
    return { author: k, likes }
  })

  return _.last(_.sortBy(authors,['likes']))
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}