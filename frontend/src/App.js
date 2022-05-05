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

    let apiRequestCopy = {...this.state.apiRequest}
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
  let apiRequestCopy = {...this.state.apiRequest}
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

  componentDidUpdate () {
    if (this.state.lastClickUpdatedSelected) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    let tieredButtons1 = [
      {text:"button 1", filterName:"ANY1", children:[{text:"child 1", filterName:"CHILD_1"}, {text:"child 2", filterName:"CHILD_2"}]},
      {text:"button 2", filterName:"ANY2", children:[{text:"child 3", filterName:"CHILD_3"}, {text:"child 4", filterName:"CHILD_4"}]},
      {text:"button 3", filterName:"ANY3", children:[{text:"child 5", filterName:"CHILD_5"}, {text:"child 6", filterName:"CHILD_6"}]},
      {text:"button 4", filterName:"ANY4", children:[{text:"child 7", filterName:"CHILD_7"}, {text:"child 8", filterName:"CHILD_8"}]}]
    let buttons = [
      // <Slider min={0} max={1000} question={'Prince range?'} renameAttempt={({ min, max }) => {console.log(`min = ${min}, max = ${max}`)}} key={-1} />,
      <Slider text={'Prince range?'} filterName={'TOTAL_PRICE_RANGE'} id={0} key={-1} min={0} max={1000} renameAttempt={this.sliderFunction}  />,
      //<Slider min={0} max={1000} onChange={this.sliderFunction} key={-1} />,
      <SimpleButton text="Ready to live?" filterName="READY_TO_LIVE" id={1} key={0} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <TieredButtonController text="Ready to live?" filterName="HOUSE_TYPE" id={2} key={1} parentStateFunction={this.tieredButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={tieredButtons1} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={3} key={2} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Has a pool?" filterName="POOL" id={4} key={3} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      //<TieredButtonController text="Ready to live?" filterName="ENUM_2" id={4} key={4} parentStateFunction={this.tieredButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[3, 4]} />
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