import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link
              to="/"
              style={{
                textTransform: 'uppercase',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              Reminisce
            </Link>
          </li>
          <li>
            <Link to="/create" className="create-btn">
              Create Post
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
