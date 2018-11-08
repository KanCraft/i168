import React, {Component} from "react";

const bundle = require("../assets/icons-bundle.json");

import {
  Svg, 
} from "expo";

export default class Icon extends Component {
  render() {
    const icon = bundle[this.props.icon];
    return (
      <Svg
        width={this.props.width}
        height={this.props.height}
        viewBox={icon.viewBox}
        fill="red"
        >
        <Svg.Path
          fill={this.props.color}
          d={icon.d}
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
