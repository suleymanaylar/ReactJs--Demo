import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

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
  addToCart(product) {
    let newCart = this.state.cart;
    // var addedItem = newCart.find(c => c.product.id === product.id);
    newCart.push({ product: product, quantity: 1 });
    this.setState({ cart: newCart });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Navi cart={this.state.cart}></Navi>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                title="Category List"
              ></CategoryList>
            </Col>

            <Col xs="9">
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
