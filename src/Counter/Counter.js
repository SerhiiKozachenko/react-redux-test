import React from 'react'
import PropTypes from 'prop-types'

export const Counter = ({ counter, increase, decrease, reset }) => {

  let decButton
  if (counter === 0) {
    decButton = <button className='btn btn-primary disabled'>
                  Decrease
                </button>
  } else {
    decButton = <button className='btn btn-primary' onClick={decrease}>
                  Decrease
                </button>
  }

  return (
    <div style={{ margin: '0 auto' }} >
      <h2>Counter: {counter}</h2>
      <button className='btn btn-primary' onClick={increase}>
        Increase
      </button>
      {' '}
      { decButton }
      {' '}
      <button className='btn btn-danger' onClick={reset}>
        Reset
      </button>
    </div>
  )
}
Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
}

export default Counter
