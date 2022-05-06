import React, { Component } from 'react'
import SimpleButton from './SimpleButton'
import ApiRequest from './ApiRequest'
import TieredButtonController from './TieredButtonController'
import Slider from './SliderFunction'

class App extends Component {
  messagesEndRef = React.createRef()

  state = {
    lastSelected: 0,
    apiRequest: {},
    lastClickUpdatedSelected: false
  }

  simpleButtonFunction = (innerIndex, selectedValue, filterName) => {
    let lastSelected = this.state.lastSelected
    let lastClickUpdatedSelected = false
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
      lastClickUpdatedSelected = true
    }

    let apiRequest = this.state.apiRequest
    switch (selectedValue) {
      case 'YES': apiRequest[filterName] = true; break;
      case 'NO': apiRequest[filterName] = false; break;
      default: delete apiRequest[filterName]
    }

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequest, lastClickUpdatedSelected: lastClickUpdatedSelected })
  }

  tieredButtonFunction = (innerIndex, filterName, mustBeInFilters, mustNotBeInFilters) => {
    let lastSelected = this.state.lastSelected
    let lastClickUpdatedSelected = false
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
      lastClickUpdatedSelected = true
    }

    if (filterName === "") {
      this.setState({ lastSelected: lastSelected, lastClickUpdatedSelected: lastClickUpdatedSelected })
      return
    }

    let apiRequestCopy = { ...this.state.apiRequest }
    let enumFilters = apiRequestCopy[filterName]
    if (enumFilters === undefined) {
      enumFilters = []
    }

    enumFilters.push(...mustBeInFilters)
    enumFilters = [...new Set(enumFilters)].filter((a) => !mustNotBeInFilters.includes(a))

    if (enumFilters.length === 0) {
      delete apiRequestCopy[filterName]
    } else {
      apiRequestCopy[filterName] = enumFilters
    }

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequestCopy, lastClickUpdatedSelected: lastClickUpdatedSelected })
  }

  sliderFunction = (min, max, innerIndex, filter_name) => {
    let lastSelected = this.state.lastSelected
    let lastClickUpdatedSelected = false
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
      lastClickUpdatedSelected = true
    }

    let currentFilter = {}
    let apiRequestCopy = { ...this.state.apiRequest }
    if (min === -1 && max === -1) {
      delete apiRequestCopy[filter_name]
    } else {
      if (min !== -1) {
        currentFilter['min'] = min
      }
      if (max !== -1) {
        currentFilter['max'] = max
      }
      apiRequestCopy[filter_name] = currentFilter
    }
    this.setState({ lastSelected: lastSelected, lastClickUpdatedSelected: lastClickUpdatedSelected, apiRequest: apiRequestCopy })
  }

  componentDidUpdate() {
    if (this.state.lastClickUpdatedSelected) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    let housingTypes = [
      { text: "Apartamento", filterName: "ANY1", children: [
        { text: "Tradicional", filterName: "TRADITIONAL" },
        { text: "JK", filterName: "JK" }, 
        { text: "Kitnet", filterName: "KITNET" },
        { text: "Flat", filterName: "FLAT" },
        { text: "Loft", filterName: "LOFT" },
        { text: "Studio", filterName: "STUDIO" },
        { text: "Andar", filterName: "FLOOR" },
        { text: "Cobertura", filterName: "ROOFTOP" }] },
      { text: "Casa", filterName: "ANY2", children: [
        { text: "Casa residencial", filterName: "SINGLE_FAMILY" }, 
        { text: "Duplex", filterName: "DUPLEX" }, 
        { text: "Sítio", filterName: "CABIN" }, 
        { text: "Casa em condomínio", filterName: "HOA" }] }]
    let buttons = [
      <Slider text={'Faixa de preço?'} filterName={'TOTAL_PRICE_RANGE'} id={0} key={-5} min={1000} max={2000} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Mobiliado?" filterName="READY_TO_LIVE" id={1} key={-3} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <Slider text={'Faixa de preço do condomínio?'} filterName={'FEES_PRICE_RANGE'} id={2} key={-4} min={0} max={200} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <TieredButtonController text="Apartamento? Casa?" filterName="HOUSE_TYPE" id={3} key={1} parentStateFunction={this.tieredButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={housingTypes} />,
      <Slider text={'Número de quartos?'} filterName={'BEDROOM COUNT'} id={4} key={-2} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Com churrasqueira?" filterName="BARBECUE" id={5} key={0} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <Slider text={'Número de banheiros?'} filterName={'BATHROOM_COUNT'} id={6} key={-1} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={7} key={2} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <Slider text={'Número de vagas?'} filterName={'PARKING_SPOTS'} id={8} key={3} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Com piscina?" filterName="POOL" id={9} key={4} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
    ]

    let req = <ApiRequest apiRequest={this.state.apiRequest} />

    return (<>
      <div>{buttons}</div>
      <div ref={this.messagesEndRef} />
      <div>{req}</div>
    </>)
  }
}

export default App