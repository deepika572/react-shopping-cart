import React from "react";
import Products from "./components/products";
import Filter from "./components/filter";
import Cart from "./components/Cart";
import data from "./data.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      sort: "",
      size: "",
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }
  // componentDidMount() {
  //   fetch("./data.json")
  //     .then((resp) => resp.json())
  //     .then((products) => this.setState({ products }));
  // }
  addToCart = (prod) => {
    const cartItems = this.state.cartItems;
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === prod._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) cartItems.push({ ...prod, count: 1 });
    this.setState({
      cartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  removeFromCart = (prod) => {
    const cartItems = this.state.cartItems;
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== prod._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== prod._id))
    );
  };

  handleChangeSize = (e) => {
    if (e.target.value === "") {
      this.setState({
        size: e.target.value,
        products: data.products,
      });
    } else {
      this.setState({
        size: e.target.value,
        products: this.state.products.filter(
          (prod) => prod.availableSizes.indexOf(e.target.value) >= 0
        ),
      });
    }
  };
  handleChangeOrder = (e) => {
    if (e.target.value === "") {
      this.setState({
        sort: e.target.value,
        products: data.products,
      });
    } else {
      const sort = e.target.value;
      this.setState({
        sort: e.target.value,
        products: this.state.products.slice().sort((a, b) => {
          return sort === "lowest" ? a.price - b.price : b.price - a.price;
        }),
      });
    }
  };
  createOrder = (order) => {
    alert("need to order" + order.name);
  };
  render() {
    return (
      <div className="grid-container">
        <header className="App-header">
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                sort={this.state.sort}
                size={this.state.size}
                handleChangeSize={this.handleChangeSize}
                handleChangeOrder={this.handleChangeOrder}
                count={this.state.products.length}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All Right reserved</footer>
      </div>
    );
  }
}

export default App;
