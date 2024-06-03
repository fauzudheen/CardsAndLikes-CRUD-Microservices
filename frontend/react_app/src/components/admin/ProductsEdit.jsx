import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const ProductsEdit = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                console.log('fetch')
                const response = await axios.get(`http://localhost:8000/api/products/${id}`)
                setTitle(response.data.title)
                setImage(response.data.image)
            } catch (error) {
                console.error('Error fetching product:', error)
            }
        }
        fetchProduct()
    }, [id])

    const submit = async(e) => {
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8000/api/products/${id}`, {title, image})
            navigate('/admin/products')
        }catch (error) {
            console.error('Error updating product:', error)
        }
    }

  return (
    <Wrapper>
        <form onSubmit={submit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" value={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image" value={image}
                           onChange={e => setImage(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
    </Wrapper>
  )
}

export default ProductsEdit
