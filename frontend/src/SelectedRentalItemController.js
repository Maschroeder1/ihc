import React, { Component } from "react"

export default class SelectedRentalItemController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'loading': false}
    }

    translateKey(key) {
        let price = 'price'
        let hasPool = 'hasPool'
        let isPetFriendly = 'isPetFriendly'
        let readyToLive = 'readyToLive'
        let longestLen = 'Ready to live:'.length
        switch(key) {
            case price: return 'Price:' + '\u00A0'.repeat(longestLen - price.length)
            case hasPool: return 'Has a pool:' + '\u00A0'.repeat(longestLen - hasPool.length -1)
            case isPetFriendly: return 'Pet friendly:' + '\u00A0'.repeat(longestLen - isPetFriendly.length + 4)
            case readyToLive: return 'Ready to live:' + '\u00A0'.repeat(longestLen - readyToLive.length)
            default:
        }
    }

    toDiv(key) {
        return <div style={{'marginRight': '5%'}}> { this.translateKey(key) } </div>
    }

    numberDiv(key, value, price) {
        return (<div key={price} style={{'marginRight': '5%'}}> &nbsp;&nbsp;&nbsp;  R$ {value},00</div>)
    }

    booleanDiv(key, value, price) {
        let testColor = value ? 'green' : 'red'

        return (<div key={price} style={{'marginRight': '5%', backgroundColor: testColor, color: testColor}}>{ '\u00A0'.repeat(17) }</div>)
        // return (<div key={price} style={{'marginRight': '5%', backgroundColor: testColor, color: testColor}}>{'.'.repeat(3 * (key.length % 5))}</div>)
    }

    translateValue(key, value, price) {
        switch(typeof value) {
            case 'number': return this.numberDiv(key, value, price)
            case 'boolean': return this.booleanDiv(key, value, price)
            default: console.log(typeof value); return <div key={price} style={{'marginRight': '5%'}}>{value.toString()}</div>
        }
    }

    render_items_based_on(key) {
        return (
            <section style={{ display: "flex", flexDirection: "row", height: '10px', "margin": "2%", "textAlign": "left", 'alignItems':'left'}} key={key} >
            { this.toDiv(key) }
            { this.props.items.map(prop => this.translateValue(key, prop[key], prop['price'])) }
            {/* { this.props.items.map(prop => <div key={prop['price']} style={{'marginRight': '5%'}}>{prop[key].toString()}</div>) } */}
            </section>
        )
    }

    render() {
        return (<>{ this.props.items.length > 0 && ['price', 'hasPool', 'isPetFriendly', 'readyToLive'].map(key => this.render_items_based_on(key)) }</>)
    }
}