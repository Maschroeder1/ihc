import React, { Component } from 'react'
import SimpleButton from './SimpleButton'
import ApiRequest from './ApiRequest'

class App extends Component {
  messagesEndRef = React.createRef()

  state = {
    lastSelected: 0,
    apiRequest: {},
    lastClickUpdatedSelected: false
  }

  fun = (innerIndex, selectedValue, filterName) => {
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

  componentDidUpdate () {
    if (this.state.lastClickUpdatedSelected) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    let buttons = [
      <SimpleButton text="Ready to live?" filterName="READY_TO_LIVE" id={0} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={1} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="Has a pool?" filterName="POOL" id={2} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
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