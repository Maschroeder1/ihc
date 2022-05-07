import React, { Component } from "react"

export default class RentalItemVisibilityController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleRows: 0
        }
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

    buildOtherRows(items, itemsPerRow, rem, rowNumber) {
        if (items.length === 0 || rowNumber === this.state.visibleRows) {
            return
        }

        let rowItems = items.slice(0, itemsPerRow)
        let rowRems = rem.repeat(rowItems.length)
        let nextRows = this.buildOtherRows(items.slice(itemsPerRow+1), itemsPerRow, rem, rowNumber+1)

        return (<>
            <div key={rowNumber} style={{'display': 'grid', 'gridTemplateColumns': rowRems, 'gridGap': '1rem', 'gridAutoFlow': 'row', 'marginBottom': '2rem'}}>{rowItems}</div>
            {nextRows}
        </>)
    }

    render() {
        const rem = '15rem '
        const columnsPerRow = 7
        let visibleChildren = this.props.items.filter(item => this.isVisible(item.props, this.props.currentFilter))
        let firstRow = visibleChildren.slice(0,columnsPerRow)
        let firstRowRems = rem.repeat(firstRow.length)
        firstRow = <div key='first' style={{'display': 'grid', 'gridTemplateColumns': firstRowRems, 'gridGap': '1rem', 'gridAutoFlow': 'row', 'marginBottom': '2rem'}}>{firstRow}</div>

        
        return (<>
            { firstRow }
            <div key={'ref'} ref={this.props.scrollAnchor} />
            {this.buildOtherRows(visibleChildren.slice(columnsPerRow+1), columnsPerRow, rem, 0)}
            <nav style={{ flexDirection: "row", height: '100px', "margin": "1%", "textAlign": "center", justifyContent: 'left' }} key={-9}>
                <button key={'-'} onClick={() => {let a = this.state.visibleRows - 1; if(a>=0) this.setState({visibleRows: a})}} style={{marginRight: '93%'}}>Mostrar menos</button>
                <button key={'+'} onClick={() => {let a = this.state.visibleRows + 1; if(a*columnsPerRow<visibleChildren.length) this.setState({visibleRows: a})}} style={{marginLeft: '80%'}}>Mostrar mais</button>
            </nav>
        </>)
    }
}