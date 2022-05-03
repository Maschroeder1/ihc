import React, { Component } from "react"

export default class RentalItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: props.price,
            isPetFriendly: props.isPetFriendly,
            hasPool: props.hasPool,
            readyToLive: props.readyToLive,
            isSelected: false
        }
    }

    matches(expected, actual) {
        return expected === undefined || expected === actual
    }

    isVisible(isPetFriendly, hasPool, readyToLive) {
        let a = this.matches(isPetFriendly, this.state.isPetFriendly)
        let b = this.matches(hasPool, this.state.hasPool)
        let c = this.matches(readyToLive, this.state.readyToLive)
        let d = a && b && c

        return d
    }

    click() {
        this.setState({ isSelected: !this.state.isSelected })
        this.props.parentFlipFunction(this.state)
    }

    render() {
        return (this.isVisible(this.props.currentFilter.PET_FRIENDLY, this.props.currentFilter.POOL, this.props.currentFilter.READY_TO_LIVE) &&
            <section style={{ display: "flex", flexDirection: "column", height: '150px', "margin": "1%", "textAlign": "center" }} key={"aluifghsal"} >
                <a onClick={() => this.click()}
                    style={{ background: 'rgba(102, 102, 102, 0.1)', padding: '5px' }}
                    onMouseOver={event => event.target.style.cursor = 'pointer'}>
                    <div> price: R$ {this.state.price} </div>
                    <img src={require('./house.png')} width={100} height={100} />
                    <div>{
                        this.state.isSelected &&
                        <div style={{ background: 'green' }}>Selected</div>
                    }</div>
                </a>
            </section>)
    }
}