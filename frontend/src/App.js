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

  fun = (innerIndex, selectedValue) => {
    let lastSelected = this.state.lastSelected
    let lastClickUpdatedSelected = false
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
      lastClickUpdatedSelected = true
    }

    let apiRequest = this.state.apiRequest
    apiRequest[innerIndex] = selectedValue

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequest, lastClickUpdatedSelected: lastClickUpdatedSelected })
  }

  componentDidUpdate () {
    if (this.state.lastClickUpdatedSelected) {
      this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  render() {
    let buttons = [
      <SimpleButton text="pergunta 1" id={0} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="pergunta 2" id={1} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <SimpleButton text="pergunta 3" id={2} fatherStateFunction={this.fun} fatherId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
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