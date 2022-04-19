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

  tieredButtonFunction = (innerIndex, selectedValue, filterName) => {
    console.log("idk")
  }

  componentDidUpdate () {
    if (this.state.lastClickUpdatedSelected) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    let buttons = [
      <SimpleButton text="Ready to live?" filterName="READY_TO_LIVE" id={0} key={0} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={1} key={1} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Has a pool?" filterName="POOL" id={2} key={2} fatherStateFunction={this.simpleButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
    ]

    let req = <ApiRequest apiRequest={this.state.apiRequest} />
    
    return (<>
      <div><TieredButtonController text="Ready to live?" filterName="READY_TO_LIVE" id={-1} key={-1} fatherStateFunction={this.tieredButtonFunction} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON}/></div>
      <div>{buttons}</div>
      <div ref={this.messagesEndRef} />
      <div>{req}</div>
    </>)
  }
}

export default App