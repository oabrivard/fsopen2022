const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has only no blog, equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has multiple blog, equals to sum of value for each blog', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('additional functions', () => {
  test('favorite blog likes should be equal to maximum like of blogs', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result.likes).toBe(12)
  })

  test('author with most blogs should be Robert C. Martin with 3 blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    console.log(result)
    expect(result.author).toBe('Robert C. Martin')
    expect(result.blogs).toBe(3)
  })

  test('author with most blogs should be Edsger W. Dijkstra with 17 likes', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    console.log(result)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })
})