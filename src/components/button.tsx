import React, { MouseEventHandler } from "react";

import bookmark from "../assets/bookmarkon-icon@2x.svg"
import stories from "../assets/arrow-back-circle.svg"

const defaultState = {}
class Button extends React.Component<{ bookmark?: boolean, stories?: boolean, primary?: boolean, secondary?: boolean, text: string, onClick?: MouseEventHandler }> {
    state = { ...defaultState }

    render() {
        return <div className={`button${this.props.primary ? " primary" : ""}`}>
            {this.props.bookmark && <img src={bookmark} alt="bookmark" />}
            {this.props.stories && <img src={stories} alt="stories" />}
            <div onClick={this.props.onClick}>{this.props.text}</div>
        </div>
    }
}

export default Button