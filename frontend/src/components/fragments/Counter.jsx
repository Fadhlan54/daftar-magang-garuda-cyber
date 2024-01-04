import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    this.setState({
      count: 10,
    });
  }

  componentDidUpdate() {
    if (this.state.count === 10) {
      this.setState({
        count: 0,
      });
    }
  }

  render() {
    return (
      <div className="flex mt-2">
        <h1>{this.state.count}</h1>
        <button
          className="bg-black text-white px-5 py-1 rounded ml-4"
          onClick={() => this.setState({ count: this.state.count + 1 })}
        >
          +
        </button>
      </div>
    );
  }
}

export default Counter;
