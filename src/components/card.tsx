import React from "react";
import { STORY } from "../backend/interface";
import { moment } from "../util"

import "./component.scss"

class Card extends React.Component<{ story: STORY, idx?: number, bookmark?: boolean, onClick: Function }> {
    render() {
        return <div onClick={this.handleClick.bind(this)} className={`card ${this.props.bookmark ? "small" : this.props.idx === 0 ? "large" : this.props.idx! <= 4 ? "mini" : "small"}`} >
            <img alt="" src={this.props.story.fields.thumbnail} style={{ backgroundImage: `url(${this.props.story.fields.thumbnail})` }} />
            <div className="content">
                <div className="header">{this.props.story.fields.headline}</div>
                <div className="meta">
                    <span className="date">{moment(this.props.story.webPublicationDate).fromNow()}</span>
                </div>
                {this.props.story.fields.headline.length < 90 && <div className="description">{this.props.story.fields.byline}</div>}
            </div>
        </div>
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.story, this.props.idx)
        }
    }
}

export default Card