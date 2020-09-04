import React, { Component } from 'react'
import util from '../util'

export default class Product extends Component {
    render() {
        const productItems = this.props.products.map(product => (
            <div className="col-md-4 " key={product.id}>
                <div className="bg text-center ">
                    <a href={`#${product.id}`} onClick={(e) => this.props.handleAddToCart(e, product)}>
                        <img src={`products/${product.sku}_2.jpg`} alt={product.title}></img>
                        {/* <img src={`${product.sku}_2.jpg`} alt={product.title}></img> */}
                        <p style={{ color: "black" }}>
                            {product.title}
                        </p>
                    </a>
                    <div>
                        <b style={{ fontWeight: "bolder" }}>Price: {util.formatCurrency(product.price)}</b>
                        <button className="btn1 btn-default"
                            onClick={(e) => this.props.handleAddToCart(e, product)}>Add To Cart</button>
                    </div>
                </div>
            </div>
        )

        )
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
