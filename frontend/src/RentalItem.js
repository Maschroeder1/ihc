import React, { Component } from "react"

export default class RentalItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            price: props.price,
            isPetFriendly: props.isPetFriendly,
            hasPool: props.hasPool,
            readyToLive: props.readyToLive
        }
    }

    matches(expected, actual) {
        if (expected === undefined) {
            return true
        }

        return expected === actual
    }

    isVisible(isPetFriendly, hasPool, readyToLive) {
        let a = this.matches(isPetFriendly, this.state.isPetFriendly)
        let b = this.matches(hasPool, this.state.hasPool)
        let c = this.matches(readyToLive, this.state.readyToLive)
        let d = a && b && c

        return d
    }

    render() {
        return (
            <><div>{
                this.isVisible(this.props.currentFilter.PET_FRIENDLY, this.props.currentFilter.POOL, this.props.currentFilter.READY_TO_LIVE) && 
                <div> { JSON.stringify(this.state) } </div>
            }</div></>
        )
    }
}