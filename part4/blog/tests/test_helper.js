const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialUser = {
  _id: '625c5b0a5ba9bbc6be2aa796',
  username: 'oabrivard',
  name: 'Olivier Abrivard',
  passwordHash: '2b$10$G/o4d2b9lA.yJmM95z5BL.Qeh73sX/ZJG2a3GxgB8YIa2fFTWCR/W',
  __v: 0
}

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '625c5b0a5ba9bbc6be2aa796',
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ url: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog.id
}

const blogInDb = async (id) => {
  return await Blog.findById(id)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const validTokenForUser = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
}

module.exports = {
  initialUser, initialBlogs, blogsInDb, nonExistingId, blogInDb, usersInDb, validTokenForUser
}