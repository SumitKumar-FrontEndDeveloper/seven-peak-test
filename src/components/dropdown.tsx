import React from "react";

const defaultState = {
    selected: "",
    open: false
}
class Dropdown extends React.Component<{ options: any[], placeholder?: string, value?: string, onChange?: Function }> {
    state = { ...defaultState }

    render() {
        let { selected, open } = this.state;
        selected = selected ? selected : this.props.value!;
        return <div>
            <div className={`dropdown${open ? " open" : ""}`} onClick={this.toggleDropdown.bind(this)}>
                {selected && selected.length > 0 && <div className="selected-value">{this.getSelected(selected)}</div>}
                {(!selected || selected.length === 0) && <div className="placeholder">{this.props.placeholder}</div>}
                {open && <div className="options">
                    {this.props.options && this.props.options.map((op, i) => {
                        return <span className="item" key={i} id={op.value} onFocus={this.handleClick.bind(this, op)} onClick={this.handleClick.bind(this, op)}>{op.text}</span>
                    })}
                </div>}
            </div>
        </div>
    }

    toggleDropdown() {
        this.setState((state: any) => ({ open: !state.open }))
    }

    handleClick(option: any) {
        this.setState({ selected: option.value })
        if (this.props.onChange) {
            this.props.onChange(option)
        }
    }

    getSelected(selected: string) {
        if (!this.props.options || !selected) {
            return
        }

        let idx = this.props.options.findIndex((x) => x.value === selected);
        this.props.options[idx].selected = true
        return this.props.options[idx].text
    }
}

export default Dropdown