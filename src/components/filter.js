import React from "react";

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <div className="filter">
          <div className="filter-result">{this.props.count} Products found</div>
          <div className="filter-size">
            <label>
              Filter By :{" "}
              <select
                value={this.props.size}
                onChange={this.props.handleChangeSize}
              >
                <option value="">ALL</option>
                <option value="X">X</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </label>
          </div>
          <div className="filter-order">
            <label>
              Order By :{" "}
              <select
                value={this.props.sort}
                onChange={this.props.handleChangeOrder}
              >
                <option value="">Latest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }
}
