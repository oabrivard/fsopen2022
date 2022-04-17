const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)

  await User.deleteMany({})
  const user = new User(helper.initialUser)
  await user.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are 6 blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog about React patterns is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('React patterns')
  })

  test('id property is defined for all blogs', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(b => expect(b.id).toBeDefined())
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = JSON.parse(JSON.stringify(blogsAtStart[0]))

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  test('unauthenticated post is not allowed', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Nauges',
      author: 'Louis Nauges',
      url: 'https://nauges.typepad.com/',
      likes: 5,
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a valid blog can be added', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Nauges',
      author: 'Louis Nauges',
      url: 'https://nauges.typepad.com/',
      likes: 5,
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${helper.validTokenForUser(helper.initialUser)}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Nauges')
  })

  test('blog without url is not added', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Nauges',
      author: 'Louis Nauges',
      likes: 5,
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${helper.validTokenForUser(helper.initialUser)}`)
      .send(newBlog)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without a valid user is not added', async () => {
    const newBlog = {
      title: 'Nauges',
      author: 'Louis Nauges',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${helper.validTokenForUser(helper.initialUser)}`)
      .send(newBlog)
      .expect(400)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('likes value for a new blog is 0 by default', async () => {
    const users = await helper.usersInDb()

    const newBlog = {
      title: 'Nauges',
      author: 'Louis Nauges',
      url: 'https://nauges.typepad.com/',
      userId: users[0].id
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${helper.validTokenForUser(helper.initialUser)}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blog = blogsAtEnd.find(b => b.title === 'Nauges')

    expect(blog).toBeDefined()
    expect(blog.likes).toBe(0)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = JSON.parse(JSON.stringify(blogsAtStart[0]))

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${helper.validTokenForUser(helper.initialUser)}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if token is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = JSON.parse(JSON.stringify(blogsAtStart[0]))

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer 0000')
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 401 if user tries to delete a blog not creeated by himself', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = JSON.parse(JSON.stringify(blogsAtStart[0]))

    const user = new User({
      username: 'invalid',
      name: 'Olivier Abrivard',
      passwordHash: '2b$10$G/o4d2b9lA.yJmM95z5BL.Qeh73sX/ZJG2a3GxgB8YIa2fFTWCR/W',
    })
    await user.save()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${helper.validTokenForUser(user)}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('update of a blog', () => {
  test('update with valid parameters succeeds', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikeValue = blogToUpdate.likes + 1
    const updateData = { ...blogToUpdate, likes: newLikeValue }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateData)
      .expect(200)

    const blogAtEnd = await helper.blogInDb(blogToUpdate.id)
    expect(blogAtEnd.likes).toBe(newLikeValue)
  })

  test('update with invalid parameters leaves record intact', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newLikeValue = blogToUpdate.likes + 1
    const updateData = { ...blogToUpdate, url: '', likes: newLikeValue }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateData)
      .expect(400)

    const blogAtEnd = await helper.blogInDb(blogToUpdate.id)
    expect(blogAtEnd.likes).toBe(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})