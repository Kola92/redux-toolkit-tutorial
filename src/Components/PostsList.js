import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../features/posts/postsSlice'

const PostsList = () => {
  const dispatch = useDispatch()
  
  // Get the posts from the store
  const posts = useSelector((state) => state.posts)

  // Pull the post properties
  const { postItems, status, error } = posts

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isMounted = true

    // If status is 'idle', then fetch the posts data from the API
    if (status === 'idle') {
      dispatch(getPosts())
    }

    // Cleanup function
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dispatch])

  let bodyContent

  if (status === 'loading') {
    bodyContent = <div className="loader"></div>
  } else if (status === 'successful') {
    // Sort the posts by id in descending order
    const sortedPosts = postItems.slice().sort((a, b) => b.id - a.id)

    // Map through the sorted posts and display them
    bodyContent = sortedPosts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  } else {
    // Display the error message
    bodyContent = <div>{error}</div>
  }

  return <div>{bodyContent}</div>
}

export default PostsList
