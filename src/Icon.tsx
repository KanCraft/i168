import React, {Component} from "react";

import * as bundle from "../assets/icons-bundle.json";

import {
  Svg, 
} from "expo";

export default class Icon extends Component<{icon:any, width:number, height:number, color:string}> {
  render() {
    const {icon, width, height, color} = this.props;
    const i = (bundle as {[key:string]:any})[icon];
    return (
      <Svg
        width={width}
        height={height}
        viewBox={i.viewBox}
        >
        <Svg.Path
          fill={color}
          d={i.d}
        />
      </Svg>
    )
  }
  static defaultProps = {
    height: 100,
    width:  100,
    color: "black",
    icon:  "menu",
  }
}
