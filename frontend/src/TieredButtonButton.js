import React from "react";

export default class TieredButtonButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            filterName: props.filterName,
            wasClicked: false,
            value: null,
            fatherStateFunction: props.fatherStateFunction,
            apiRequest: props.apiRequest,
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
        return this.state.children.length > 0
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
        let strong_color = "#0015ff"
        let light_color = "#9ea6ff"
        let currentColor
        let opositeColor

        if (this.state.value === null) {
            currentColor = light_color
            opositeColor = strong_color
        } else {
            currentColor = strong_color
            opositeColor = light_color
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
                    style={{ "background": currentColor, "height": "80%", width: "20%", "margin": "2%", "marginRight": "2%" }}>
                { this.state.text }
            </button>
    }
}