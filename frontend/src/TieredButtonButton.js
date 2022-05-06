import React from "react";

export default class TieredButtonButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            filterName: props.filterName,
            value: null,
            children: props.children,
            parentVisibleFunction: props.parentVisibleFunction
        }
    }

    click() {
        if (this.isParent()) {
            this.flipAllChildren()
        } else {
            this.flipChild()
        }
    }

    isParent() {
        return this.state.children.length > 0 || this.state.filterName === ""
    }

    flipAllChildren() {
        if (this.state.value === null) {
            this.setState({ value: this.state.filterName })
            this.state.parentVisibleFunction(this.state.children, [])
        } else {
            this.setState({ value: null })
            this.state.parentVisibleFunction([], this.state.children)
        }
    }

    flipChild() {
        let value = this.state.value === null ? this.state.filterName : null
        this.setState({ value: value })
        this.state.parentVisibleFunction(this.state.filterName, null)
    }

    render() {
        const STRONG_COLOR = "#fff500"
        const LIGHT_COLOR = "#fffb96"
        let currentColor
        let opositeColor

        if (this.state.value === null) {
            currentColor = LIGHT_COLOR
            opositeColor = STRONG_COLOR
        } else {
            currentColor = STRONG_COLOR
            opositeColor = LIGHT_COLOR
        }

        if (!this.isParent()) {
            let temp = currentColor
            currentColor = opositeColor
            opositeColor = temp
        }

        return <button 
                    onMouseOver={event => event.target.style.background = opositeColor} 
                    onMouseOut={event => event.target.style.background = currentColor}
                    onClick={() => this.click()} 
                    style={{ "background": currentColor, "height": "80%", width: "20%", "margin": "1%", "marginRight": "2%", "fontSize": "18px" }}>
                { this.state.text }
            </button>
    }
}