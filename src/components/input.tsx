import React, { MouseEventHandler } from "react";
import debounce from "lodash.debounce";
import search from "../assets/search-icon@2x.svg"

class Input extends React.Component<{ type?: string, value?: string, placeholder?: string, onChange?: Function, onSearch?: MouseEventHandler }> {
    input: any = React.createRef()
    debounce = debounce(this.handleChange.bind(this), 500, { trailing: true })
    render() {
        return <div className="input">
            <input ref={this.input} type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} onInput={this.debounce.bind(this)} />
            {this.props.type === "search" && <div className="search-icon" onClick={this.focus.bind(this)}><img src={search} alt="" /></div>}
        </div>
    }

    focus() {
        if (this.input && this.input.current) {
            this.input.current.focus()
        }
    }

    handleChange() {
        if (this.props.onChange) {
            if (this.input.current && this.input.current.value) {
                this.props.onChange(this.input.current.value)
            }
        }
    }
}

export default Input