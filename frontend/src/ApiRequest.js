import React from "react"
import RentalItem from "./RentalItem"

export default class ApiRequest extends React.Component {
    constructor(props) {
        super(props)
    }

    mockApiReturnItemWith(price, isPetFriendly, hasPool, readyToLive, currentFilter) {
        return <RentalItem
            price={price} 
            isPetFriendly={isPetFriendly}
            hasPool={hasPool}
            readyToLive={readyToLive}
            currentFilter={currentFilter}
        />
    }

    mockApiReturn(request) {
        return [
            this.mockApiReturnItemWith(1, true, true, true, request),
            this.mockApiReturnItemWith(2, true, true, false, request),
            this.mockApiReturnItemWith(3, true, false, true, request),
            this.mockApiReturnItemWith(4, true, false, false, request),
            this.mockApiReturnItemWith(5, false, true, true, request),
            this.mockApiReturnItemWith(6, false, true, false, request),
            this.mockApiReturnItemWith(7, false, false, true, request),
            this.mockApiReturnItemWith(8, false, false, false, request)
        ]
    }

    requestApi(request) {
        return this.mockApiReturn(request)
    }

    render() {
        let items = this.requestApi(this.props.apiRequest)

        return (<>
            <div>{JSON.stringify(this.props.apiRequest)}</div>
            <div> --- results below ---</div>
            { [items] }
        </>)
    }
}