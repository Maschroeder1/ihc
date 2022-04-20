import React, { Component } from 'react'
import SimpleButton from './SimpleButton'
import ApiRequest from './ApiRequest'
import TieredButtonController from './TieredButtonController'

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

    let apiRequestCopy = {...this.state.apiRequest}
    let enumFilters = apiRequestCopy[filterName]
    if (enumFilters === undefined) {
      enumFilters = []
    }

    enumFilters.push(...mustBeInFilters)
    enumFilters = [...new Set(enumFilters)].filter((a) => !mustNotBeInFilters.includes(a))

    apiRequestCopy[filterName] = enumFilters

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequestCopy, lastClickUpdatedSelected: lastClickUpdatedSelected })
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
      <SimpleButton text="Ready to live?" filterName="READY_TO_LIVE" id={0} key={0} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <TieredButtonController text="Ready to live?" filterName="HOUSE_TYPE" id={1} key={1} fatherStateFunction={this.tieredButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={tieredButtons1} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={2} key={2} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Has a pool?" filterName="POOL" id={3} key={3} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      //<TieredButtonController text="Ready to live?" filterName="ENUM_2" id={4} key={4} fatherStateFunction={this.tieredButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[3, 4]} />
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