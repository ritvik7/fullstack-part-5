import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test("Blog Form calls the createBlog function with correct props from input fields ", ()=> {

  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const form = component.container.querySelector('.blog-form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  
  fireEvent.change(title, {target: {value: 'test title'}})
  fireEvent.change(author, {target: {value: 'test author'}})
  fireEvent.change(url, {target: {value: 'www.test.com'}})
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toStrictEqual({title: 'test title', author: 'test author', url:'www.test.com'})

})
