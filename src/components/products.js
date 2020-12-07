import React from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({
      product,
    });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    return (
      <div>
        <Fade bottom cascade={true}>
          <ul className="products">
            {this.props.products.map((prod) => {
              return (
                <li key={prod.id}>
                  <div className="product">
                    <a
                      href={"#" + prod._id}
                      onClick={() => this.openModal(prod)}
                    >
                      <img src={prod.image} alt={prod.title} />
                      <p>{prod.title}</p>
                    </a>
                    <div className="product-price">
                      <div>{formatCurrency(prod.price)}</div>
                      <button
                        onClick={() => this.props.addToCart(prod)}
                        className="button primary"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fade>
        {this.state.product && (
          <Modal isOpen={true}>
            <button className="close-modal" onClick={this.closeModal}>
              {" "}
              x
            </button>
            <Zoom>
              <div className="product-details">
                <img src={this.state.product.image} alt={this.state.product.title}/>
                <div className="product-details-description">
                  <p>
                    {" "}
                    <strong>{this.state.product.title}</strong>
                  </p>
                  <p>{this.state.product.deccription}</p>
                  <p>
                    Available Sizes:{" "}
                    {this.state.product.availableSizes.map((size) => {
                      return (
                        <span>
                          {" "}
                          <button className="button">{size}</button>
                        </span>
                      );
                    })}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(this.state.product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(this.state.product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
