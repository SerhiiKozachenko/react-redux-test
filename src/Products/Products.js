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
        {products.map(p => <Product {...p} />)}
        <div className="product-placeholder" />
        <div className="product-placeholder" />
        <div className="product-placeholder" />
      </div>
    </div>
  )
}

const Product = ({ id, image, name, price }) => (
  <div key={id} className="product">
    <div className="image">
      <div onClick={() => alert(`details: id${id} name${name} price${price}`)} className="details">
        Product details
      </div>
      <div onClick={() => alert(`picked: ${id} ${name}`)} className="pick">
        Pick this
      </div>
      <img src={image}/>
    </div>
    <p>{name}</p>
    <p>Starting at {price}</p>
  </div>
)

Product.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
}

export default Products
