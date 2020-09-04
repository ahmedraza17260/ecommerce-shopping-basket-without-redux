import React, { Component } from 'react'
import util from '../util';

export default class Basket extends Component {
    render() {
        const { cartItems } = this.props;
        return (
            <div className="alert bg ">
                {cartItems.length === 0 ? "Basket is Empty" : <div style={{ textAlign: "center", fontWeight: "bolder" }}> You Have {cartItems.length} Products in the Basket </div>} <br />
                {cartItems.length > 0 &&
                    <div>
                        <ul>
                            {cartItems.map(item =>
                                <li key={item.id} >
                                    <b>{item.title} <br /> Price: {item.price} </b>  <br />
                                    Quantity: {item.count} <br /> Item Price: {item.price * item.count}
                                    <button className="btn-danger btn1"
                                        onClick={(e) => this.props.handleRemoveFromCart(e, item)}> Remove </button>
                                </li>
                            )}
                        </ul>
                        <h6 style={{ fontSize: "x-large", fontWeight: "bolder", textAlign: "center" }}>Total : {util.formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}</h6>
                        <button className="btn1" onClick={() => alert("Checkout Need To Be Implement...")}> CheckOut </button>
                    </div>
                }
            </div>
        )
    }
}
