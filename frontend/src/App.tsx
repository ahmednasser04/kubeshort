import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import UrlDetails from './pages/UrlDetails/UrlDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path=":shortCode" element={<UrlDetails />} />
      <Route path="*" element={<UrlDetails />} />
    </Routes>
  )
}

export default App
