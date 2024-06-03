import './App.css'
import Products from './components/admin/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/main/Main'
import ProductsCreate from './components/admin/ProductsCreate'
import ProductsEdit from './components/admin/ProductsEdit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<Main />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/products/create' element={<ProductsCreate />} />
          <Route path='/admin/products/:id/edit' element={<ProductsEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
