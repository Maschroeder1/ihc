import React from "react"

export default class SimpleButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text, 
            id: props.id, 
            filterName: props.filterName,
            wasClicked: false, 
            selected: null, 
            fatherStateFunction: props.fatherStateFunction, 
            apiRequest: props.apiRequest
        }
    }

    isVisible() {
        return this.state.id <= this.props.fatherId
    }

    button(light_color, strong_color, value) {
        let color = this.state.selected === value ? strong_color : light_color

        return <button 
        onMouseOver={event => event.target.style.background = strong_color} 
        onMouseOut={event => event.target.style.background = color}
        style={{ "background":color, "height": "25%", width: "100%", "margin-bottom": "2%" }} 
        onClick={() => this.click(value)}>
            { value }
            </button>
    }

    click(selectedValue) {
        this.setState({
            wasClicked: true,
            selected: selectedValue
        })
        this.state.fatherStateFunction(this.state.id, selectedValue, this.state.filterName)
    }

    render() {
        return (
            <>
                <div>
                    {this.isVisible() &&
                        <section style={{ height: '600px' }}>
                            <div style={{ "text-align": "center", "margin-bottom": "1%" }}> {this.state.text} </div>
                            { this.button("#b3ffc8", "#00ff46", 'YES') }
                            { this.button("#ff7a8c", "#ff0023", 'NO') }
                            { this.button("#efadff", "#cd00ff", 'DOES NOT MATTER') }
                        </section>
                    }
                </div>
            </>
        )
    }

    toJSON() {
        return JSON.stringify({id: this.state.id, text: this.state.text, selected: this.state.selected})
    }
}