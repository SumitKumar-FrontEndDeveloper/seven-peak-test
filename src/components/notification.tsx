import React from "react";
import bookmark from "../assets/bookmarkon-icon@2x.svg"

class Notification extends React.Component {
    state = { show: false, notifications: [] }
    render() {
        return <div className="notification">
            {this.state.notifications.map((el: any, i) => {
                return <div className="notify" key={i}>
                    {el.show === true && <div className={`${el.type}`}>
                        {el.bookmark && <span><img src={bookmark} /></span>} <span>{el.message}</span>
                    </div>}
                </div>
            })}
        </div>
    }

    componentDidMount() {
        window.addEventListener("notify", this.toggleNotification.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener("notify", this.toggleNotification.bind(this))
    }

    toggleNotification(e: any) {
        let detail = e.detail
        let { notifications }: any = this.state;
        let idx = notifications.length
        notifications.push({ type: detail.type, message: detail.message, bookmark: detail.bookmark, show: true })
        this.setState({ notifications },
            () => setTimeout(() => {
                notifications.splice(idx, 1)
                this.setState({ notifications })
            }, detail.showTime ? detail.showTime : 2000)
        )
    }
}

export default Notification