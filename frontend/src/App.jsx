import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div>
          <Routes>
              <Route
                path='/'
                element={<Main />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
