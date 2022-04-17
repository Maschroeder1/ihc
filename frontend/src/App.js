import React, { useState, useRef, useCallback, Component } from 'react'
import useBookSearch from './useBookSearch'
import SimpleButton from './SimpleButton'
import ApiRequest from './ApiRequest'
import * as ReactDOM from 'react-dom';

class App extends Component {
  state = {
    lastSelected: 0,
    apiRequest: {}
  }

  fun = (innerIndex, selectedValue) => {
    let lastSelected = this.state.lastSelected
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
    }

    let apiRequest = this.state.apiRequest
    apiRequest[innerIndex] = selectedValue

    
    this.setState({ lastSelected: lastSelected, apiRequest: apiRequest })
  }

  render() {
    let buttons = [
      <SimpleButton text="pergunta 1" id={0} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="pergunta 2" id={1} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="pergunta 3" id={2} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
    ]

    let req = <ApiRequest apiRequest={this.state.apiRequest} />
    return (<><div>{buttons}</div><div>{req}</div></>)
  }
}

export default App