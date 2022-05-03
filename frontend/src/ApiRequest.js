import React, { Component } from "react"
import RentalItem from "./RentalItem"
import SelectedRentalItemController from "./SelectedRentalItem"

export default class ApiRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedItems: [] }
    }

    mockApiReturnItemWith(price, isPetFriendly, hasPool, readyToLive, currentFilter) {
        return <RentalItem
            price={price} 
            isPetFriendly={isPetFriendly}
            hasPool={hasPool}
            readyToLive={readyToLive}
            currentFilter={currentFilter}
            key={price}
            parentFlipFunction={this.flipItem}
        />
    }

    mockApiReturn(request) {
        return (
            <section style={{ display: "flex", flexDirection: "row", height: '100px', "margin": "2%", "textAlign": "center"}} key={"aluifghsal"} >
            { [this.mockApiReturnItemWith(1, true, true, true, request), 
                this.mockApiReturnItemWith(2, true, true, false, request), 
                this.mockApiReturnItemWith(3, true, false, true, request), 
                this.mockApiReturnItemWith(4, true, false, false, request), 
                this.mockApiReturnItemWith(5, false, true, true, request), 
                this.mockApiReturnItemWith(6, false, true, false, request), 
                this.mockApiReturnItemWith(7, false, false, true, request), 
                this.mockApiReturnItemWith(8, false, false, false, request)] }
            </section>
        )
    }

    requestApi(request) {
        return this.mockApiReturn(request)
    }

    flipItem = (item) => {
        console.log(item)
        console.log(this.state)
        let newSelectedItems = this.state.selectedItems
        let i
        
        for (i = 0; i < this.state.selectedItems.length; i++) {
            if (newSelectedItems[i]['price'] === item['price']) {
                break;
            }
        }

        if (i >= newSelectedItems.length) {
            console.log("add")
            this.setState({selectedItems: [...newSelectedItems, item]})
        } else {
            console.log("remove")
            newSelectedItems.splice(i, 1)
            this.setState({selectedItems: newSelectedItems})
        }
    }

    render() {
        let items = this.requestApi(this.props.apiRequest)

        return (<>
            <div>{JSON.stringify(this.props.apiRequest)}</div>
            <div> --- results below ---</div>
            { [items] }
            <div> --- selected items below ---</div>
            <div> <SelectedRentalItemController items={this.state.selectedItems} /></div>
        </>)
    }
}