import Navbar from './Navbar'
import PostsList from './PostsList'

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <h1>Posts</h1>
        <PostsList />
      </main>
    </>
  )
}

export default Home
