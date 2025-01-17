import React, { Component } from "react";
import { Table, ButtonToggle } from "reactstrap";

export default class ProductList extends Component {
  
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Unit In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <ButtonToggle
                    onClick={() => this.props.addToCart(product)}
                    color="info"
                  >
                    Add
                  </ButtonToggle>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
