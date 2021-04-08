import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

let component, blog, user, mockHandler1, mockHandler2

beforeEach(() => {
  blog = {
    title: 'Test blog',
    author: 'tester',
    url: 'test.com',
    user: {username:'test_user'},
    likes: 0
  }
  user = {username: 'test_user'}
  mockHandler1 = jest.fn()
  mockHandler2 = jest.fn()
  component = render(
    <Blog blog={blog} likeBlog={mockHandler1} removeBlog={mockHandler2} user={user} />
  )

})

test("blog renders the blog's title & author, but not url or likes by default", ()=> {
  
  let div = component.container.querySelector('.blog-default')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  
})

test("blog url and likes are shown when view button is clicked", () => {
  const div = component.container.querySelector('.blog-details')
  expect(div).toHaveStyle('display: none')

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`likes ${blog.likes}`)
})

test('like button works', () => {
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler1.mock.calls).toHaveLength(2)
})