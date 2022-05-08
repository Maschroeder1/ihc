import React, { Component } from "react"

export default class RentalItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false
        }
    }

    click() {
        this.setState({ isSelected: !this.state.isSelected })
        this.props.parentFlipFunction(this.props)
    }

    render() {
        return (
            <>
            <section style={{ display: "flex", flexDirection: "column", height: '150px', width: '150px', "margin": "1%", "textAlign": "center" }} key={this.props.price} >
                <a onClick={() => this.click()}
                    style={{ background: 'rgba(102, 102, 102, 0.1)', padding: '20px' }}
                    onMouseOver={event => event.target.style.cursor = 'pointer'}>
                    <div> preço: R$ {this.props.price} </div>
                    <img src={require('./house.png')} width='100px' height='100px' />
                    <div>{
                        this.state.isSelected &&
                        <div style={{ background: 'green' }}>Selected</div>
                    }</div>
                </a>
            </section>
            </>)
    }
}