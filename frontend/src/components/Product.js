import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product}) => {
    return (
        <Card className='my-3 p-3 rounded' >
            <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} variants="top"></Card.Img>
            </Link>
            <Card.Body>
                <Link to={`/data/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong> {product.name}</strong>
                    </Card.Title>
                </Link>
                    <Card.Text as='div'>
                        <Rating value={product.rating} 
                        text={`${product.numReviews} reviews`}
                        />
                         </Card.Text>

                    <Card.Text as='h4'>₹{product.price} Per Kg</Card.Text>
            </Card.Body>
        </Card>
    )
}


export default Product
