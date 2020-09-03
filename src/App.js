import React, { Component } from 'react';
import './App.css';
import Product from './components/Product';
import Filter from './components/Filter';
import Basket from './components/Basket';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [], filteredProducts: [], cartItems: [] }
    this.handleChangeSort = this.handleChangeSort.bind(this)
    this.handleChangeSize = this.handleChangeSize.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
  }
  componentWillMount() {
    fetch("http://localhost:8000/products/").then(res => res.json()).then(data => this.setState({
      products: data,
      filteredProducts: data
    }))
    if (localStorage.getItem('cartItems')) {
      this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) })
    }
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProduct();
  }

  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProduct();
  }

  listProduct() {
    this.setState(state => {
      if (state.sort !== '') {
        state.products.sort((a, b) => (state.sort === 'lowest') ?
          (a.price > b.price ? 1 : -1) :
          (a.price < b.price ? 1 : -1))
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }

      if (state.size !== '') {
        return {
          filteredProducts: state.products.filter(a =>
            a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        }
      }
      return ({ filteredProducts: state.products });
    })
  }

  handleAddToCart(e, product) {
    this.setState(state => {
      const cartItems = state.cartItems
      let productAlreadyInCart = false
      cartItems.forEach(item => {
        if (item.id === product.id) {
          productAlreadyInCart = true
          item.count++;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 })
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return cartItems

    })
  }

  handleRemoveFromCart(e, item) {
    this.setState(state => {
      const cartItems = state.cartItems.filter(element => element.id !== item.id)
      localStorage.setItem("cartItems", (cartItems))
      return { cartItems }
    })
  }
  render() {
    return (
      <>
        <div className="container">
          <h1 className="h1">Ecommerce Shopping Cart Application</h1>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <Filter size={this.state.size} sort={this.state.sort}
                handleChangeSize={this.handleChangeSize}
                handleChangeSort={this.handleChangeSort} count={this.state.filteredProducts.length} />
              <hr />
              <Product products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
            </div>
            <div className="col-md-4">
              <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
            </div>
          </div>
        </div>
        <div className="copyRight" >
          <h4 style={{ color: "black" }}> Powered by Ahmed Raza </h4>
          <a style={{ color: "black" }} href="https://github.com/ahmedraza17260" rel="noopener noreferrer" target="_blank">
            {" "}
            <h3 style={{ color: "black" }}> Copyright &copy; 2020 Ahmed Raza </h3>{" "}
          </a>
          <h3 style={{ color: "black" }}> All Right Reserved </h3>
        </div>
      </>
    );
  }
}

export default App;
