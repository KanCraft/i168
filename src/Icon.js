import React, {Component} from "react";

const bundle = require("../assets/icons-bundle.json");

import {
  Svg, 
} from "expo";

export default class Icon extends Component {
  render() {
    const viewBox = `0 0 ${this.props.width} ${this.props.height}`;
    return (
      <Svg
        width={this.props.width}
        height={this.props.height}
        viewBox={viewBox}
        fill="red"
        >
        <Svg.Path
          fill={this.props.color}
          width={this.props.width}
          height={this.props.height}
          d={bundle[this.props.icon]}
        />
      </Svg>
    )
  }
}

Icon.defaultProps = {
  height: 100,
  width:  100,
  color: "black",
  icon:  "menu",
};
