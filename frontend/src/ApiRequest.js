import React from "react"

export default class ApiRequest extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {apiRequest: props.apiRequest}
    }

    render() {
        return <div>{JSON.stringify(this.props.apiRequest)}</div>
    }
}