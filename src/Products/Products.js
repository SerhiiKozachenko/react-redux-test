import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Products.scss'
import fakeProductsData from './fakeProductsData.json'

const formatName = (name) => name.replace('&amp;', '&')
const toSlug = (name) => `#${name.toLowerCase().replace(' ', '-')}`


function mapProduct(product) {

  
  return (
    <div key={product.product_id+Math.random()} className="product">
      <div className="img-container">
        <a className="detail-link" target="_blank" href="https://www.google.com">PRODUCT DETAIL</a>
        <div
          className="product-image"
          style={{backgroundImage: `url(${product.url})`}}
        />
        <a className="detail-pick" target="_blank" href="https://www.google.com">PICK THIS</a>
      </div>
      <div  className="product-details">
        <h5 className="product-name">{product.name}</h5>
        <h5 className="product-price">STARTING AT {product.cheapest_price}</h5>
      </div>
    </div>
  )
}


const filterProductsByCategory = (category) =>
  fakeProductsData['product-catalog']
    .find(c => c.name === category)
    .items
    .reduce((res, i) => {
      if (i.type === 'product') {
        res.push(mapProduct(i))
      } else if (i.type === 'category') {
        i.items
          .filter(i => i.type === 'product')
          .forEach(i => res.push(mapProduct(i)))
      }
      return res
    }, [])

export const Products = () => {
  const [selectedCategory, selectCategory] = useState('All');

  return (
    <div className='products-container' >
      <nav className='nav nav-pills flex-column flex-sm-row'>
        {
          fakeProductsData['product-catalog']
            .filter(i => i.type === 'category')
            .reverse()
            .map(c => (
              <a key={c.name}
                className={'flex-sm-fill text-sm-center nav-link' +
                  (c.name === selectedCategory ? ' active' : '')}
                onClick={() => selectCategory(c.name)}
                href={toSlug(c.name)}>
                {formatName(c.name)}
              </a>
            ))
        }
      </nav>
      <hr />
      { filterProductsByCategory(selectedCategory) }
      
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      <i aria-hidden="true"></i>
      {/*TODO: Replace with responsive products grid*/}
      {/*<pre dangerouslySetInnerHTML={{__html: JSON.stringify(filterProductsByCategory(selectedCategory), null, 2) }}></pre>*/}
    </div>
  )
}

export default Products
