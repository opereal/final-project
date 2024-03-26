import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'


const Item = (props) => {
  return (

    <div className='col-12 col-sm-6 col-md-6 col-lg-3 mb-3'>
    <Link to={`/product/${props.id}`} onClick={window.scrollTo(0,0)} className='product-link'>
  <div className="card" style={{width: "100%"}}>
  <img src={props.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">${props.new_price}</h5>
    <h5 className="card-title old-price">${props.old_price}</h5>
    
  </div>
</div>

    </Link>
    </div>
  
  )
}

export default Item
