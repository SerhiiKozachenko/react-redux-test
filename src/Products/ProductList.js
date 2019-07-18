import React from 'react'

export const ProductList = ({ products }) => (
  <section className='products-list'>
    {products.map(pr => 
      <div key={pr.id} className="product">
        <div className="product-photo">
          <img src={pr.image}/>
          <div className="product-hover">
            <div className="product-hover-details">PRODUCT DETAILS</div>
            <div className="product-hover-pick">PICK THIS</div>
          </div>
        </div>
        <div className="product-info">
          <span className="product-name">{pr.name}</span>
          <br/>
          <span className="product-price">Starting at {pr.price}</span>
        </div>
      </div>
    )}
  </section>
)

export default ProductList
