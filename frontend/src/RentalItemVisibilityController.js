import React, { Component } from "react"

export default class RentalItemVisibilityController extends React.Component {
    constructor(props) {
        super(props)
    }

    enumValuesMatch(item, filter) {
        return this.matchesEnum(item.type, filter.HOUSE_TYPE)
    }

    matchesEnum(actual, expected) {
        return expected === undefined || expected.includes(actual)
    }

    boolValuesMatch(item, filter) {
        let a = this.matchesBool(item.readyToLive, filter.READY_TO_LIVE)
        let b = this.matchesBool(item.hasBarbecue, filter.BARBECUE)
        let c = this.matchesBool(item.isPetFriendly, filter.PET_FRIENDLY)
        let d = this.matchesBool(item.hasPool, filter.POOL)

        return a && b && c && d
    }

    matchesBool(actual, expected) {
        return expected === undefined || expected === actual
    }

    rangeValuesMatch(item, filter) {
        let a = this.matchesRange(item.price, filter.TOTAL_PRICE_RANGE)
        let b = this.matchesRange(item.fees, filter.FEES_PRICE_RANGE)
        let c = this.matchesRange(item.bedrooms, filter.BEDROOM_COUNT)
        let d = this.matchesRange(item.bathrooms, filter.BATHROOM_COUNT)
        let e = this.matchesRange(item.parkingSpots, filter.PARKING_SPOTS)

        return a && b && c && d && e
    }

    matchesRange(actual, expected) {
        if (expected === undefined) {
            return true
        }

        let matchesMax = expected['max'] === undefined || expected['max'] >= actual
        let matchesMin = expected['min'] === undefined || expected['min'] <= actual

        return matchesMax && matchesMin
    }

    isVisible(item, filter) {
        let boolValuesMatch = this.boolValuesMatch(item, filter)
        let rangeValuesMatch = this.rangeValuesMatch(item, filter)
        let enumValuesMatch = this.enumValuesMatch(item, filter)

        return boolValuesMatch && rangeValuesMatch && enumValuesMatch
    }

    gridItems(buttons) {
        const MAX_BUTTONS_PER_ROW = 5
        let sections = []

        for (let i = 0; i < buttons.length; i += MAX_BUTTONS_PER_ROW) {
            sections.push(<section style={{ flexDirection: "row"}} key={i}>
                {buttons.slice(i, i + MAX_BUTTONS_PER_ROW)}
            </section>)
        }


        return <section style={{ flexDirection: 'row', height: "100px", margin: "1%", justifyContent: 'space-around'}} key={1}>{buttons}</section>
    }

    format(rentalItems) {

        return this.gridItems(rentalItems)
    }

    render() {
        let visibleChildren = this.props.items.filter(item => this.isVisible(item.props, this.props.currentFilter))
        let rems = '15rem '.repeat(7)
        return <div style={{'display': 'grid', 'gridTemplateColumns': rems, 'gridGap': '1rem', 'gridAutoFlow': 'row'}}>{visibleChildren}</div>
    }
}