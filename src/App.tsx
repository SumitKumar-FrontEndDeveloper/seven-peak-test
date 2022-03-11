import React from 'react';
import URL from "url-parse"
import API from "./backend/api"

//Components
import Loader from "./components/loading"
import Dropdown from "./components/dropdown"
import Input from "./components/input"
import Button from "./components/button"
import Notification from "./components/notification"

// Images
import BRAND from "./assets/Logo_White.png"
import { STORY } from './backend/interface';

import './App.scss';

const List = React.lazy(() => import("./screens/list"));
const Detail = React.lazy(() => import("./screens/detail"));

const defaultState = {
  loading: true,
  screen: {
    name: "home",
    height: window.innerHeight,
    width: window.innerWidth,
  },
  story: {},
  stories: [],
  bookmark: {},
  bookmarks: [],
  saveBookmark: false,
  category: "newest",
  search: ""
}
const category = [
  { text: "Newest first", value: "newest" },
  { text: "Oldest first", value: "oldest" },
  // { text: "Most popular", value: "relevance" },
]
class App extends React.Component {
  state = { ...defaultState, back: this.navigate.bind(this, "home"), notify: this.notify }

  render() {
    return (
      <div className="peaks">
        <nav className="navbar">
          <div className="wrapper">
            <div className="brand">
              <img alt="The Peaks" src={BRAND} onClick={this.navigate.bind(this, "home")} />
            </div>
            <div className="search-wrapper"><Input type="search" placeholder="Search all news" onChange={this.search.bind(this)} /></div>
          </div>
        </nav>

        <section className={!this.state.stories || !this.state.stories.length ? "empty" : "stories"}>
          {this.state.screen.name === "bookmark" && <div className="breadcrumb">
            <span className="previous" onClick={this.navigate.bind(this, "home")}>Stories</span> <span className="divider">/</span> <span className="current">Bookmarks</span>
          </div>}
          {this.state.screen.name === "detail" && <div className="breadcrumb">
            <span className="previous" onClick={this.navigate.bind(this, "home")}>Stories</span> <span className="divider">/</span> <span className="current">Details</span>
          </div>}
          {!this.state.loading && this.state.screen.name !== "detail" && <div className="page-title">
            {this.state.screen.name === "bookmark" ? <h1>All Bookmark</h1> : this.state.search ? <h1>Search results</h1> : <h1>Top Stories</h1>}
            <div className="actions">
              {this.state.screen.name !== "bookmark" && <Button primary bookmark stories={this.state.screen.name === "bookmark"} text={"VIEW BOOKMARK"} onClick={this.navigate.bind(this, "bookmark")} />}
              {(this.state.screen.name === "search" || this.state.screen.name === "home") && <Dropdown placeholder="Select Category" value={this.state.category} options={category} onChange={this.filterStories.bind(this)} />}
            </div>
          </div>}
          <React.Suspense fallback={<div className="loader-wrapper"><Loader detail="Loading Stories" /></div>}>
            {this.state.screen.name === "home" && <List global={this.state} loading={this.state.loading} stories={this.state.stories} onSelect={this.showDetail.bind(this)} />}
            {this.state.screen.name === "bookmark" && <List global={this.state} loading={this.state.loading} bookmark stories={this.state.bookmarks} onSelect={this.showDetail.bind(this)} />}
            {this.state.screen.name === "detail" && <Detail story={(this.state.story as STORY)} global={this.state} />}
          </React.Suspense>
        </section>
        <Notification />
        <footer className="footer"></footer>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.screenResize.bind(this));
    (window as any).getState = () => this.state
    this.router()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenResize.bind(this));
  }

  screenResize() {
    let screen = {
      name: this.state.screen.name,
      height: window.innerHeight,
      width: window.innerWidth,
    }
    this.setState({ screen })
  }

  router() {
    let url = new URL(window.location.href, true);
    let page = url.pathname.substr(1)
    if (page !== "detail" && page !== "bookmark" && page !== "home") {
      this.navigate("home");
    }

    this.setState({
      screen: {
        name: page,
        height: window.innerHeight,
        width: window.innerWidth
      },
      loading: page === "home" ? true : false
    }, () => {
      if (page === "home") {
        this.getStories();
      } else if (page === "bookmark") {
        this.getBookmarks()
      }
    })
  }

  navigate(page: string) {
    let href = `${window.location.origin}/${page}`
    window.location.assign(href)
  }

  back() {
    this.navigate("home")
  }

  notify(message: string, type: "error" | "success", bookmark?: boolean, showTime?: number) {
    window.dispatchEvent(new CustomEvent("notify", { detail: { type, message, showTime, bookmark } }))
  }

  async getStories(page?: number) {
    try {
      let stories: any = []
      let res: any = await API.list(page, this.state.search, this.state.category);
      if (res.error === false) {
        stories = res.data.results
      }
      this.setState({ stories, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  getBookmarks() {
    let oldBookmarks = localStorage.getItem("bookmarks")
    let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : [];
    this.setState({ bookmarks })
  }

  search(data: string) {
    this.setState({ search: data, loading: true }, this.getStories.bind(this))
  }

  handleBookmarkSave() {
    let { saveBookmark } = this.state;
    let oldBookmarks = localStorage.getItem("bookmarks")
    let bookmarks = oldBookmarks ? JSON.parse(oldBookmarks) : []
    if (saveBookmark === true) {
      let idx = bookmarks.findIndex((x: any) => x.id === (this.state.story as any).id)
      if (idx !== -1)
        bookmarks.splice(1, idx)
    } else {
      bookmarks.push(this.state.story)
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
    this.setState({ saveBookmark: !saveBookmark })
  }

  filterStories(option: any) {
    this.setState({ category: option.value, loading: true }, this.getStories.bind(this))
  }

  showDetail(story: STORY) {
    this.navigate(`detail?id=${story.id}`)
  }
}

export default App;
