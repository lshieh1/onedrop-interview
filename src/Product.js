import React from 'react'

function Product(props) {
    return (
        <div className='product'>
            <span className='product-title'>{props.product.title} | </span>
            <span className='product-variant-price'>${props.product.variants[0].price}</span>
        </div>
    )
}

export default Product