import React from "react";
import URL from "url-parse"

import API from "../backend/api"
import { moment } from "../util";
import { STORY } from "../backend/interface";

import Loader from "../components/loading"
import Button from "../components/button"
import "./screen.scss"

class Detail extends React.Component<{ global?: any, story: STORY }> {
    state = { loading: true, story: { fields: { body: "" } } as any, saveBookmark: false }
    article: any = React.createRef()

    render() {
        let { story, loading } = this.state
        return <div className="detail">
            {loading && <Loader detail="Loading" />}

            {!loading && story.id && <div className="content-wrapper">
                <div className="button-wrapper">
                    <Button primary bookmark text={!this.state.saveBookmark ? "ADD BOOKMARK" : "REMOVE BOOKMARK"} onClick={this.handleBookmarkSave.bind(this)} />
                </div>
                <div className="meta">
                    <span className="date">{moment(story.webPublicationDate).locale("en-TH")}</span>
                </div>
                <h1>{story.fields.headline}</h1>
                <h3>{story.fields.byline}</h3>
                <img alt="" src={story.fields.thumbnail} />
                <article ref={this.article}></article>
            </div>}
        </div>
    }

    componentDidMount() {
        let url = new URL(window.location.href, true)
        if (!url.query || !url.query.id) {
            return this.props.global.back()
        }

        this.getStory(url.query.id as any)
    }

    async getStory(id: string) {
        try {
            let story: any = {}
            let res: any = await API.get(id);
            if (res.error === false) {
                story = res.data.result
            } else {
                story = { fields: { body: "" } }
            }

            let oldBookmarks = localStorage.getItem("bookmarks")
            let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : [];
            let idx = bookmarks.findIndex((x: any) => x.id === id)

            this.fillArticle(story.fields.body)
            this.setState({ saveBookmark: idx !== -1 ? true : false, story, loading: false })
        } catch (error) {
            console.log(error)
        }
    }

    fillArticle(arg: any) {
        let div: any = document.createElement('div');
        div.innerHTML = arg;
        let intr = window.setInterval(() => {
            if (this.article.current) {
                this.article.current.innerHTML = arg;
                clearInterval(intr)
            }
        }, 100)
    }

    handleBookmarkSave() {
        let { saveBookmark } = this.state;
        let oldBookmarks = localStorage.getItem("bookmarks")
        let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : []
        if (saveBookmark === true) {
            let idx = bookmarks.findIndex((x: any) => x.id === (this.state.story as any).id)
            if (idx !== -1) {
                bookmarks.splice(idx, 1)
                this.props.global.notify("Bookmark Removed", "error", true)
            }
        } else {
            bookmarks.push(this.state.story)
            this.props.global.notify("Bookmark Saved", "success", true)
        }

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
        this.setState({ saveBookmark: !saveBookmark })
    }
}

export default Detail