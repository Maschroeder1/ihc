import React, { Component } from "react"

export default class SelectedRentalItemController extends React.Component {
    render() {
        return <div>{JSON.stringify(this.props.items)}</div>
    }
}