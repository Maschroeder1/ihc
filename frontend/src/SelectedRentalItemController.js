import React, { Component } from "react"

export default class SelectedRentalItemController extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'loading': false}
    }

    translateKey(key) {
        let type = 'type'
        let price = 'price'
        let fees = 'fees'
        let bedrooms = 'bedrooms'
        let bathrooms = 'bathrooms'
        let parkingSpots = 'parkingSpots'
        let hasPool = 'hasPool'
        let hasBarbecue = 'hasBarbecue'
        let isPetFriendly = 'isPetFriendly'
        let readyToLive = 'readyToLive'
        let longestLen = 'Ready to live:'.length
        switch(key) {
            case type: return 'Tipo:' + '\u00A0'.repeat(longestLen - type.length)
            case price: return 'Preço:' + '\u00A0'.repeat(longestLen - price.length)
            case fees: return 'Taxas:' + '\u00A0'.repeat(longestLen - fees.length)
            case bedrooms: return 'Quartos:' + '\u00A0'.repeat(longestLen - bedrooms.length)
            case bathrooms: return 'Banheiros:' + '\u00A0'.repeat(longestLen - bathrooms.length)
            case parkingSpots: return 'Vagas:' + '\u00A0'.repeat(longestLen - parkingSpots.length)
            case hasPool: return 'Tem piscina:' + '\u00A0'.repeat(longestLen - hasPool.length -1)
            case hasBarbecue: return 'Tem Churrasqueira:' + '\u00A0'.repeat(longestLen - hasBarbecue.length -1)
            case isPetFriendly: return 'Pet friendly:' + '\u00A0'.repeat(longestLen - isPetFriendly.length + 4)
            case readyToLive: return 'Pronto para morar:' + '\u00A0'.repeat(longestLen - readyToLive.length)
            default:
        }
    }

    toDiv(key) {
        return <div style={{'marginRight': '5%'}}> { this.translateKey(key) } </div>
    }

    translateNumber(key, item) {
        console.log("R$ " + item + ",00")
        return ['price', 'fees'].includes(key) ? 
            "R$\u00A0" + item + ",00" : 
            "" + item
    }

    numberDiv(key, value, price) {
        if (['price', 'fees'].includes(key)) {
            return (<div key={price} style={{'marginRight': '5%'}}> &nbsp;&nbsp;&nbsp;  R${value},00</div>)
        } else {
            return (<div key={price} style={{'marginRight': '5%'}}> &nbsp;&nbsp;&nbsp;  {value}</div>)
        }
    }

    booleanDiv(key, value, price) {
        let testColor = value ? 'green' : 'red'

        return (<div key={price} style={{'marginRight': '5%', backgroundColor: testColor, color: testColor}}>{ '\u00A0'.repeat(17) }</div>)
    }

    translateBoolean(key, value) {
        return value ? 'green' : 'red'
    }

    translateValue(key, item) {
        switch(typeof item) {
            case 'number': return this.translateNumber(key, item)
            case 'boolean': return this.translateBoolean(key, item)
            default: return item
        }
    }

    itemRowFor(key) {
        let row = this.props.items.map(prop => this.translateValue(key, prop[key]))
        row.unshift(key)

        return row
    }

    render() {
        let rowList = ['type', 'price', 'fees', 'bedrooms', 'bathrooms', 'parkingSpots', 'hasPool', 'hasBarbecue', 'isPetFriendly', 'readyToLive'].map(key => this.itemRowFor(key))

        let aux = []

        for (let row of rowList) {
            row = row.slice(0, 10)
            let rems = '2rem '.repeat(row.length+1)
            console.log(row)
            aux.push(
            <div style={{'display': 'grid', 'gridTemplateColumns': rems, 'gridGap': '2rem', 'gridAutoFlow': 'row', 'columnGap': '6rem'}}>
                <>{row.map(a => (a === 'red' || a === 'green') ? <div style={{backgroundColor: a, margin:'1px'}}></div> : <div>{a}</div>)}</>
            </div>)
        }

        return <div style={{'marginTop': '25px'}}> {aux} </div>
    }
}