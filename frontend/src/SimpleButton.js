import React from "react"

export default class SimpleButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: props.text, id: props.id, wasClicked: false, selected: null, fatherStateFunction: props.fatherStateFunction, apiRequest: props.apiRequest}
    }

    isVisible() {
        return this.state.id <= this.props.fatherId
    }

    click(selectedValue) {
        this.setState({
            wasClicked: true,
            selected: selectedValue
        })
        this.state.fatherStateFunction(this.state.id, selectedValue)
    }

    render() {
        return (
            <>
                <div>
                    {this.isVisible() &&
                        <>
                            <div> {this.state.text} </div>
                            <button style={{ "height": "100px", width: "100%", "margin-bottom": "30px" }} onClick={() => this.click('YES')}>SIM</button>
                            <button style={{ "height": "100px", width: "100%", "margin-bottom": "30px" }} onClick={() => this.click('NO')}>NAO</button>
                            <button style={{ "height": "100px", width: "100%", "margin-bottom": "30px" }} onClick={() => this.click('NOT MATTER')}>TANTO FAZ</button>
                        </>
                    }
                </div>
            </>
        )
    }

    toJSON() {
        return JSON.stringify({id: this.state.id, text: this.state.text, selected: this.state.selected})
    }
}