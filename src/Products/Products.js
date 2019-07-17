import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Products.scss'
import fakeProductsData from './fakeProductsData.json'

const formatName = (name) => name.replace('&amp;', '&')
const toSlug = (name) => `#${name.toLowerCase().replace(' ', '-')}`

const mapProduct = (product) => ({
  id: product.product_id,
  name: product.name,
  price: product.cheapest_price,
  image: product.url
})

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
  const products = filterProductsByCategory(selectedCategory);

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
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} p={p} className="product">
            <div className="image">
              <img src={p.image}/>
            </div>
            <p>{p.name}</p>
            <p>Starting at {p.price}</p>
          </div>
        ))}
      </div>
      {/*TODO: Replace with responsive products grid*/}

    </div>
  )
}

export default Products
