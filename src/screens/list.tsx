import React from "react";
import { STORY } from "../backend/interface";

import Card from "../components/card"
import Loader from "../components/loading"
import "./screen.scss"

class List extends React.Component<{ global?: any, loading: boolean, bookmark?: boolean, stories: any[], onSelect?: Function, update?: Function }> {

    render() {
        let main: any
        let group: any = []

        return <div className="list">
            {!this.props.loading && this.props.stories && this.props.stories.length > 0 && <div className="cards">
                {this.props.stories && this.props.stories.map((story: STORY, id) => {
                    if (this.props.global.screen.name !== "home" || this.props.global.screen.width <= 1200 || this.props.stories.length <= 4) {
                        return <Card bookmark={this.props.bookmark} onClick={this.handleClick.bind(this)} key={id} idx={id} story={story} />
                    } else {
                        if (id > 4) {
                            return <Card bookmark={this.props.bookmark} onClick={this.handleClick.bind(this)} key={id} idx={id} story={story} />
                        }

                        if (id === 0) {
                            main = <Card bookmark={this.props.bookmark} onClick={this.handleClick.bind(this)} key={id} idx={id} story={story} />
                            return undefined
                        }

                        if (id >= 1 || id < 4) {
                            group.push(<Card bookmark={this.props.bookmark} onClick={this.handleClick.bind(this)} key={id} idx={id} story={story} />)

                            if (group.length === 4) {
                                return <div key="first" className="first">{main} <div className="group">{group}</div></div>
                            }
                            return undefined
                        }
                    }
                    return undefined
                })}
            </div>}
            {!this.props.loading && (!this.props.stories || this.props.stories.length === 0) && <div className="no-stories">No Stories Found</div>}
            {this.props.loading && <Loader detail="Loading Stories" />}
        </div>
    }

    handleClick(story: STORY) {
        if (this.props.onSelect) {
            this.props.onSelect(story)
        }
    }
}

export default List