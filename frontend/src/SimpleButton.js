import React from "react"

export default class SimpleButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            id: props.id,
            filterName: props.filterName,
            selected: null,
            parentStateFunction: props.parentStateFunction,
            apiRequest: props.apiRequest
        }
    }

    isVisible() {
        return this.state.id <= this.props.parentId
    }

    button(light_color, strong_color, value) {
        let color = this.state.selected === value ? strong_color : light_color

        return <button
            onMouseOver={event => event.target.style.background = strong_color}
            onMouseOut={event => event.target.style.background = color}
            style={{ "background": color, "height": "25%", width: "100%", "marginBottom": "2%", "fontSize": "18px" }}
            onClick={() => this.click(value)}>
            {value}
        </button>
    }

    click(selectedValue) {
        this.setState({ selected: selectedValue })
        this.state.parentStateFunction(this.state.id, selectedValue, this.state.filterName)
    }

    render() {
        return (<div>
            {this.isVisible() &&
                <section style={{ height: '600px' }}>
                    <div style={{ "textAlign": "center", "marginBottom": "1%", "fontSize": "25px" }}> {this.state.text} </div>
                    {this.button("#b3ffc8", "#00ff46", 'SIM')}
                    {this.button("#ff7a8c", "#ff0023", 'NÃO')}
                    {this.button("#efadff", "#cd00ff", 'TANTO FAZ')}
                </section>
            }
        </div>)
    }

    toJSON() {
        return JSON.stringify({ id: this.state.id, text: this.state.text, selected: this.state.selected })
    }
}