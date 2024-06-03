import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('fetching')
        const getProducts = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        };
        getProducts();
    }, [])

    const handleDelete = async(id) => {
        if (window.confirm("Are you sure you want to delete this product?")){
            try {
                await axios.delete(`http://localhost:8000/api/products/${id}`)
                setProducts(products.filter((p) => p.id!==id))
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }

    

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/products/create' className="btn btn-md btn-outline-success">Add</Link>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td><img src={p.image} height='180'/></td>
                                <td>{p.title}</td>
                                <td>{p.likes}</td>
                                <td>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <div className="btn-group">
                                            <button onClick={() => navigate(`/admin/products/${p.id}/edit`)} type="button" className="btn btn-sm btn-outline-warning">Edit</button>
                                            <button onClick={() => handleDelete(p.id)} type="button" className="btn btn-sm btn-outline-danger">Delete</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
    
}

export default Products
