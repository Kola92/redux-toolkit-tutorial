import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../features/posts/postsSlice'

const CreatePost = () => {
  // Set the initial state for the form
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [addPostRequestStatus, setAddPostRequestStatus] = useState('idle')

  // Get the dispatch function
  const dispatch = useDispatch()

  // Get the navigate function [replace the history.push() method]
  const navigate = useNavigate()

  // Handle form field value changes
  const onTitleChange = (e) => setTitle(e.target.value)
  const onBodyChange = (e) => setBody(e.target.value)

  /* 
    Get the Boolean value based on whether the form is empty or not && the post request status.
    We use the Boolean value returned to toggle the disbale status submit button
  */
  const canSavePost =
    [title, body].every(Boolean) && addPostRequestStatus === 'idle'

  // Handle form submission
  const handleAddPost = async (e) => {
    e.preventDefault()
    const post = { title, body }
    if (canSavePost) {
      try {
        setAddPostRequestStatus('pending')
        await dispatch(addPost(post)).unwrap()
        setTitle('')
        setBody('')

        navigate('/')
      } catch (err) {
        console.error('Unable to create post:', err)
      } finally {
        setAddPostRequestStatus('idle')
      }
    }
  }

  return (
    <div className="create-post">
      <div className="create-heading">
        <h1>Create Post</h1>
      </div>
      <div className="form-container">
        <h2>Add New Post</h2>
        <form onSubmit={handleAddPost}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={onTitleChange}
              value={title}
            />

            <label htmlFor="bodyContent">Content</label>
            <textarea
              id="bodyContent"
              name="bodyContent"
              cols="30"
              rows="10"
              onChange={onBodyChange}
              value={body}
            />

            <button type="submit" className="btn" disabled={!canSavePost}>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
