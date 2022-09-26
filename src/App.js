import { Route, Routes } from 'react-router-dom'
import CreatePost from './Components/CreatePost'
import Home from './Components/Home'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/create" element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App
