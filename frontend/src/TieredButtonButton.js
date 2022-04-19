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
        let newValue = this.state.value === null ? this.state.filterName : null
        this.setState({ value: newValue })

        let visibleChildren = newValue === null ? [] : this.state.children
        this.state.parentVisibleFunction(this.state.filterName, visibleChildren)
    }

    render() {
        return <button 
            onClick={() => this.click()} 
            style={{ "height": "80%", width: "20%", "margin": "2%", "margin-right": "2%" }}>
                { this.state.text }</button>
    }
}