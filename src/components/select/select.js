import React, { Component } from "react";
import "./select.css";

import CircularProgress from '@material-ui/core/CircularProgress';

class SelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonState: false,
      fetching: true,
      selectedText: "Nothing selected",
      listItems: [],
      top: null,
      left: null,
      width: null,
      height: null,
    };
    this.buttonRef = React.createRef;
    this.onSelectClicked = this.onSelectClicked.bind(this);
  }
  onSelectClicked(event) {
    console.log(event);
    if (this.state.buttonState) {
      this.setState({
        ...this.state,
        buttonState: !this.state.buttonState,
        top: null,
        left: null,
        width: null,
        height: null,
      });
    } else {
      this.setState({
        ...this.state,
        buttonState: !this.state.buttonState,
        top: event.target.offsetTop,
        left: event.target.offsetLeft,
        width: event.target.offsetWidth,
        height: event.target.offsetHeight,
      });
    }
  }
  getPostionStyle() {
    return {
      top: this.state.top + this.state.height + 10 + "px",
      left: this.state.left + "px",
      width: this.state.width + "px",
      height: "200px",
    };
  }

  fetchListItems() {
    this.props.fetchResources().then(
      (result) => {
        this.setState(
          {
            ...this.state,
            listItems: result,
          },
          () => {
            this.stopLoading()
            return this.state.listItems.map((item) => {
              <li
                id={item.value}
                className={() =>
                  this.state.selectedText == item.label
                    ? "list-item selected"
                    : "list-item"
                }
              >
                {item.label}
              </li>;
            });
          }
        );
      },
      (error) => {
        this.stopLoading()
        return (
          <li id="no-value" className="list-item">
            No Items
          </li>
        );
      }
    );
  }
  
  startLoading() {
    return <div
      className="loading-panel"
    >
      <CircularProgress />
    </div>
  }

  stopLoading() {
    this.setState({ loading: false });
  }

  createList() {
    if (this.state.buttonState) {
      //console.log(this.buttonRef)
      return (
        <div className="select-panel" style={this.getPostionStyle()}>
          {this.state.fetching ? this.startLoading() : "" }
          <ul>
            {this.fetchListItems()}
          </ul>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <button className="field" onClick={this.onSelectClicked}>
          {this.state.selectedText}
        </button>
        {this.createList()}
      </div>
    );
  }
}

export default SelectComponent;
