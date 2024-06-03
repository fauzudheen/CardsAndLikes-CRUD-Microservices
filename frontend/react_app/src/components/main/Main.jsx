import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Main = () => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async() =>{
            try{
                console.log('Fetch started')
                const response = await axios.get(`http://localhost:8000/api/products`)
                setProducts(response.data)
            }catch (error){
                console.error('Error fetching products', error)
            }
        }
        fetchProducts();
    }, [])

    const handleLike = async(id) => {
        try {
            console.log('like')
            await axios.post(`http://localhost:8001/api/products/${id}/like`)
            const updatedResponse = await axios.get(`http://localhost:8000/api/products/${id}`)
            setProducts(products.map((p) => (
                p.id === id ? { ...p, likes: updatedResponse.data.likes } : p
            )));
        } catch (error) {
            console.error('Error liking product:', error)
        }
    }

  return (
    <main role="main">
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {products && products.map((p) => (
                <div className="col-md-4" key={p.id}>
                <div className="card mb-4 box-shadow">
                    <img src={p.image} height='250' />
                  <div className="card-body">
                    <p className="card-text">
                      {p.title}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button onClick={() => handleLike(p.id)} type="button" className="btn btn-sm btn-outline-primary">Like</button>
                      </div>
                      <small className="text-muted">{p.likes} Likes</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main
