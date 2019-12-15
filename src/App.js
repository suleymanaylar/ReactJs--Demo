import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import {Switch,Route} from "react-router-dom"
import CartList from "./CartList";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  changeCategory = category => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(respose => respose.json())
      .then(data => this.setState({ products: data }));
  };
  componentDidMount() {
    this.getProducts();
  }
  addToCart = product => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
      alertify.success(product.productName + " Eklendi.")
    }
  };
  removeFromCart = product => {
    let newCart = this.state.cart.filter(x => x.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " Silindi.")
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart}></Navi>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                title="Category List"
              ></CategoryList>
            </Col>

            <Col xs="9">
              <Switch>
                <Route exact path="/cart" component={CartList}></Route>
                <Route></Route>
                <Route></Route>
              </Switch>
              <ProductList
                addToCart={this.addToCart}
                products={this.state.products}
                title="Product List"
              ></ProductList>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
