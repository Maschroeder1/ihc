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
            case type: return 'Tipo:'
            case price: return 'Preço:'
            case fees: return 'Taxas:'
            case bedrooms: return 'Quartos:'
            case bathrooms: return 'Banheiros:'
            case parkingSpots: return 'Vagas:'
            case hasPool: return 'Tem piscina:'
            case hasBarbecue: return 'Tem Churrasqueira:'
            case isPetFriendly: return 'Pet friendly:'
            case readyToLive: return 'Pronto para morar:'
            default: return key
        }
    }

    translateNumber(key, item) {
        return ['price', 'fees'].includes(key) ? 
            "R$\u00A0" + item + ",00" : 
            "" + item
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
        row.unshift(this.translateKey(key))

        return row
    }

    coloredDivFor(color) {
        return <div style={{backgroundColor: color, width: '100%', margin:'5px'}}></div>
    }

    translateString(type) {
        switch(type) {
            case "TRADITIONAL": return 'Tradicional'
            case "STUDIO": return 'JK/Studio'
            case "KITNET": return 'Kitnet'
            case "FLAT": return 'Flat'
            case "LOFT": return 'Loft'
            case "FLOOR": return 'Andar'
            case "ROOFTOP": return 'Cobertura'
            case "SINGLE_FAMILY": return 'Casa residencial'
            case "DUPLEX": return 'Duplex'
            case "CABIN": return 'Sítio'
            case "HOA": return 'Casa em condominínio'
            default: return type
        }
    }

    textDivFor(value) {
        return <div style={{height:'45px'}}>{this.translateString(value)}</div>
    }

    render() {
        let rowList = ['type', 'price', 'fees', 'bedrooms', 'bathrooms', 'parkingSpots', 'hasPool', 'hasBarbecue', 'isPetFriendly', 'readyToLive'].map(key => this.itemRowFor(key))

        let aux = []

        for (let row of rowList) {
            row = row.slice(0, 15)
            let rems = '2rem '.repeat(row.length+1)
            aux.push(
            <div style={{'display': 'grid', 'gridTemplateColumns': rems, 'gridGap': '2rem', 'gridAutoFlow': 'row', 'columnGap': '6rem'}}>
                <>{row.map(a => (a === 'red' || a === 'green') ? this.coloredDivFor(a) : this.textDivFor(a))}</>
            </div>)
        }

        return <div style={{'marginTop': '25px'}}> {aux} </div>
    }
}