import React, { Component } from "react"
import RentalItem from "./RentalItem"
import RentalItemVisibilityController from "./RentalItemVisibilityController"
import SelectedRentalItemController from "./SelectedRentalItemController"

export default class ApiRequest extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedItems: [], items: this.requestApi(null) }
    }

    mockApiReturnItemWith(price, fees, bedrooms, bathrooms, parkingSpots, type, isPetFriendly, hasPool, readyToLive, hasBarbecue) {
        return <RentalItem
            price={price} 
            fees={fees}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            parkingSpots={parkingSpots}
            type={type}
            isPetFriendly={isPetFriendly}
            hasPool={hasPool}
            readyToLive={readyToLive}
            hasBarbecue={hasBarbecue}
            key={price}
            parentFlipFunction={this.flipItem}
        />
    }

    randomIntBetween(lo, hi) {
        let matchRandomMultiplier = 1
        let hiCopy = hi + 10
        while (hiCopy > 10) {
            hiCopy = hiCopy / 10
            matchRandomMultiplier*=10
        }
        
        while (true) {
            let candidate = Math.floor(Math.random() * matchRandomMultiplier)

            if (candidate >= lo && candidate <= hi) {
                return candidate
            }
        }
    }

    randomBool() {
        return Math.random() > 0.5
    }

    generateRandomApartments(num) {
        let prices = new Set()
        let apartments = []

        apartments.push(this.mockApiReturnItemWith(1000, 100, 1, 1, 0, "STUDIO", false, false, false, false))
        apartments.push(this.mockApiReturnItemWith(10000, 300, 4, 5, 2, "TRADITIONAL", true, true, true, true))

        prices.add(1000)
        prices.add(10000)

        for (let i of [...Array(num).keys()]) {
            let price = -1
            while (price < 0) { // Must be unique due to spaghetti
                let priceCandidate = this.randomIntBetween(1000, 10000)

                if (!prices.has(priceCandidate)) {
                    price = priceCandidate
                    prices.add(priceCandidate)
                }
            }

            let fees = this.randomIntBetween(0, 2000)
            let bedrooms = this.randomIntBetween(1, 6)
            let bathrooms = this.randomIntBetween(1, 6)
            let parkingSpots = this.randomIntBetween(0, 6)

            let type = ["TRADITIONAL", "STUDIO", "KITNET", "FLAT", "LOFT", "FLOOR", "ROOFTOP", "SINGLE_FAMILY", "DUPLEX", "CABIN", "HOA"][this.randomIntBetween(0, 10)]

            apartments.push(this.mockApiReturnItemWith(price, fees, bedrooms, bathrooms, parkingSpots, type, this.randomBool(), this.randomBool(), this.randomBool(), this.randomBool()))
        }
        
        return apartments
    }

    mockApiReturn(request) {
        return this.generateRandomApartments(200)
    }

    requestApi(request) {
        return this.mockApiReturn(request)
    }

    flipItem = (item) => {
        let newSelectedItems = this.state.selectedItems
        let i
        
        for (i = 0; i < this.state.selectedItems.length; i++) {
            if (newSelectedItems[i]['price'] === item['price']) {
                break;
            }
        }

        if (i >= newSelectedItems.length) {
            this.setState({selectedItems: [...newSelectedItems, item]})
        } else {
            newSelectedItems.splice(i, 1)
            this.setState({selectedItems: newSelectedItems})
        }
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        this.props.traceFun()
    }

    render() {
        return (<div>
            <div> <RentalItemVisibilityController items={this.state.items} currentFilter={this.props.apiRequest} traceFun={this.props.traceFun} /> </div>
            <div> <SelectedRentalItemController items={this.state.selectedItems} /></div>
        </div>)
    }
}