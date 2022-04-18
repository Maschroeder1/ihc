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
        // console.log("expected: " + expected + " actual: " + actual)
        if (expected === undefined) {
            return true
        }

        return expected === actual
    }

    isVisible(isPetFriendly, hasPool, readyToLive) {
        // console.log("props: " + JSON.stringify(this.props))
        let a = this.matches(isPetFriendly, this.state.isPetFriendly)
        let b = this.matches(hasPool, this.state.hasPool)
        let c = this.matches(readyToLive, this.state.readyToLive)
        let d = a && b && c

        // console.log("\n\npet friendly expected " + isPetFriendly + " actual " + this.state.isPetFriendly + 
        // "\nhas pool expected " + hasPool + " actual " + this.state.hasPool + 
        // "\nready to live expected " + readyToLive + " actual " + this.state.readyToLive + 
        // "\nis visible: " + d)

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