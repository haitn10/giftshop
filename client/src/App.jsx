
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import ListPage from './components/Listpage'
import ProductDetail from './components/ProductDetail'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} index/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/products' element={<ListPage />}/>
        <Route path='/products/:id' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
