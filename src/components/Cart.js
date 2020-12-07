import React from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";

export default class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cart: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    return (
      <div>
        {this.props.cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is Empty</div>
        ) : (
          <div className="cart cart-header">
            You have {this.props.cartItems.length} items in the cart
          </div>
        )}
        <div>
          <div className="cart">
            <Fade left cascade={true}>
              <ul className="cart-items">
                {this.props.cartItems.map((cart) => {
                  return (
                    <li key={cart._id} className="list">
                      <div>
                        <img src={cart.image} alt={cart.title} />
                      </div>
                      <div>
                        <div>{cart.title}</div>
                        <div className="right">
                          {formatCurrency(cart.price)} x {cart.count}{" "}
                          <button
                            className="button"
                            onClick={() => this.props.removeFromCart(cart)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Fade>
          </div>
          {this.props.cartItems.length ? (
            <div className="cart">
              <div className="total">
                <div>
                  Total:{" "}
                  {formatCurrency(
                    this.props.cartItems.reduce(
                      (a, b) => a + b.price * b.count,
                      0
                    )
                  )}
                </div>
                <button
                  onClick={() => this.setState({ showCheckout: true })}
                  className="button primary"
                >
                  Proceed
                </button>
              </div>
            </div>
          ) : null}

          {this.state.showCheckout && (
            <Fade right cascade={true}>
              <div className="cart">
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        onChange={this.handleInput}
                      />
                    </li>
                    <li>
                      <button className="button primary" type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </div>
            </Fade>
          )}
        </div>
      </div>
    );
  }
}
