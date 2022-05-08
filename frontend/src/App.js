import React, { Component } from 'react'
import SimpleButton from './SimpleButton'
import ApiRequest from './ApiRequest'
import TieredButtonController from './TieredButtonController'
import Slider from './SliderFunction'

class App extends Component {
  messagesEndRef = React.createRef()
  pageBottom = React.createRef()

  state = {
    lastSelected: 0,
    apiRequest: {},
    lastClickUpdatedSelected: false,
    initialTimestamp: new Date(),
    trace: [],
    visibilityMode: 0
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

    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequest, lastClickUpdatedSelected: lastClickUpdatedSelected, trace: newTrace })
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

    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ lastSelected: lastSelected, apiRequest: apiRequestCopy, lastClickUpdatedSelected: lastClickUpdatedSelected, trace: newTrace })
  }

  sliderFunction = (min, max, innerIndex, filterName) => {
    let lastSelected = this.state.lastSelected
    let lastClickUpdatedSelected = false
    if (innerIndex >= lastSelected) {
      lastSelected = innerIndex + 1
      lastClickUpdatedSelected = true
    }

    let currentFilter = {}
    let apiRequestCopy = { ...this.state.apiRequest }
    if (min === -1 && max === -1) {
      delete apiRequestCopy[filterName]
    } else {
      if (min !== -1) {
        currentFilter['min'] = min
      }
      if (max !== -1) {
        currentFilter['max'] = max
      }
      apiRequestCopy[filterName] = currentFilter
    }
    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })
    this.setState({ lastSelected: lastSelected, lastClickUpdatedSelected: lastClickUpdatedSelected, apiRequest: apiRequestCopy, trace: newTrace })
  }

  apiRequestFun = () => {
    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": "API" })

    this.setState({ trace: newTrace })
  }

  scrollToPlace() {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
  }

  componentDidUpdate() {
    if (this.state.lastClickUpdatedSelected) {
      setTimeout(() => {
        this.scrollToPlace()
      }, 50)
    }
  }

  boolIsSelected(filterName) {
    // -1 sim e false, 0 não, 1 sim e true
    const value = this.state.apiRequest[filterName]
    if (value === undefined) {
      return 0
    }

    return value ? 1 : -1
  }

  boolModifyStateTo(filterName, selected) {
    let newApiRequest = this.state.apiRequest
    let currentSelected = newApiRequest[filterName]

    if (selected === currentSelected) {
      delete newApiRequest[filterName]
    } else {
      newApiRequest[filterName] = selected
    }
    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ apiRequest: newApiRequest, trace: newTrace })
  }

  boolButton(text, filterName) {
    let selectColor = this.boolIsSelected(filterName) === 1 ? '#00ff46' : '#b3ffc8'

    let selectButton = (<button
      onMouseOver={event => event.target.style.background = "#00ff46"}
      onMouseOut={event => event.target.style.background = selectColor}
      style={{ "background": selectColor, "height": "2rem", width: "90px", 'marginLeft': '20px', "marginBottom": "2%", "fontSize": "15px" }}
      onClick={() => this.boolModifyStateTo(filterName, true)}>
      {"SIM"}
    </button>)

    let deSelectColor = this.boolIsSelected(filterName) === -1 ? '#ff0023' : '#ff7a8c'

    let deSelectButton = (<button
      onMouseOver={event => event.target.style.background = "#ff0023"}
      onMouseOut={event => event.target.style.background = deSelectColor}
      style={{ "background": deSelectColor, "height": "2rem", width: "90px", 'marginLeft': '20px', "marginBottom": "2%", "fontSize": "15px" }}
      onClick={() => this.boolModifyStateTo(filterName, false)}>
      {"NÃO"}
    </button>)

    return (<div style={{ display: "flex", flexDirection: "column", height: '80px', width: '300px', "marginTop": "5%", "textAlign": "center", backgroundColor: '#d6d6d6' }}>
      <div style={{ 'marginTop': '10px', fontSize: '17px' }}>
        {text}
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: '80%', width: '100%', "marginLeft": "30px", "textAlign": "center" }}>
        {selectButton}
        {deSelectButton}
      </div>
    </div>)
  }

  filterValue(currentValue, otherValue, otherKey, minDefault) {
    if (otherKey === 'max' && (otherValue <= currentValue || currentValue < minDefault)) {
      return Math.max(minDefault, otherValue)
    }
    if (otherKey === 'min' && (otherValue > currentValue)) {
      return otherValue
    }
    return currentValue
  }

  handleFillableInputChange(filterName, event, innerFilterName, defaultLow) {
    let currentValue = event.target.value
    if (currentValue.includes('.')) {
      currentValue = "" + Math.floor(+currentValue * 100) / 100
    }
    let currentApiRequest = this.state.apiRequest
    let apiRequestFilterValue = currentApiRequest[filterName]
    if (apiRequestFilterValue === undefined) {
      apiRequestFilterValue = {}
    }

    if (currentValue === '') {
      delete apiRequestFilterValue[innerFilterName]
      if (Object.keys(apiRequestFilterValue).length === 0) {
        delete currentApiRequest[filterName]
      }
    } else {
      // não consegui fazer funfa, era pra fazer aquele controle pra user nao cosneguir baguncar os valores dos forms
      // let otherKey = Object.keys(apiRequestFilterValue).filter(key => key !== innerFilterName)[0]
      // console.log(otherKey)
      // if (otherKey !== undefined) {
      //   apiRequestFilterValue[innerFilterName] = this.filterValue(+currentValue, apiRequestFilterValue[otherKey], otherKey, defaultLow)
      // } else {
      //   apiRequestFilterValue[innerFilterName] = +currentValue
      // }

      apiRequestFilterValue[innerFilterName] = +currentValue
      currentApiRequest[filterName] = apiRequestFilterValue
    }
    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ apiRequest: currentApiRequest, trace: newTrace })
  }

  fillableInputRange(text, filterName, defaultLow) {
    let lowName = filterName + '_LOW'
    let highName = filterName + '_HIGH'
    let currentFilterValue = this.state.apiRequest[filterName]
    let low = currentFilterValue === undefined ? undefined : currentFilterValue['min']
    let high = currentFilterValue === undefined ? undefined : currentFilterValue['max']

    let lowInput = <input id={lowName} style={{height:'30px', width: '4rem', marginRight: '10px'}} type="number" onInput={event => this.handleFillableInputChange(filterName, event, 'min', defaultLow)} value={low} />
    let highInput = <input id={highName} style={{height:'30px', width: '4rem'}} type="number" onInput={event => this.handleFillableInputChange(filterName, event, 'max')} value={high} />

    return (<div style={{ display: "flex", flexDirection: "column", height: '80px', width: '300px', "marginTop": "5%", "textAlign": "center", backgroundColor: '#d6d6d6' }}>
      <div style={{ 'marginTop': '10px', fontSize: '17px' }}>
        {text}
      </div>
      <div style={{ display: "flex", flexDirection: "row", height: '80%', width: '100%', "marginLeft": "30px", "textAlign": "center" }}>
        <div style={{"textAlign": "center"}}>Min:</div>
        {lowInput}
        <div style={{"textAlign": "center"}}>Máx:</div>
        {highInput}
      </div>
    </div>)
  }

  singleToggle(filterName, innerFilterName) {
    let apiRequestCopy = this.state.apiRequest
    let currentFilter = apiRequestCopy[filterName]

    if (currentFilter === undefined) {
      currentFilter = [innerFilterName]
    } else {
      if (currentFilter.includes(innerFilterName)) {
        currentFilter = currentFilter.filter(filter => filter !== innerFilterName)
      } else {
        currentFilter.push(innerFilterName)
      }
    }

    if (currentFilter.length === 0) {
      delete apiRequestCopy[filterName]
    } else {
      apiRequestCopy[filterName] = currentFilter
    }

    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ apiRequest: apiRequestCopy, trace: newTrace })
  }

  linkedToggle(filterName, childrenKeys) {
    let apiRequestCopy = this.state.apiRequest
    let currentFilter = apiRequestCopy[filterName]

    if (currentFilter === undefined) {
      currentFilter = childrenKeys
    } else {
      let allChildrenSelected = childrenKeys.every(key => currentFilter.includes(key))

      if (allChildrenSelected) {
        currentFilter = currentFilter.filter(filter => !childrenKeys.includes(filter))
      } else {
        currentFilter = [...new Set(currentFilter.concat(childrenKeys))]
      }
    }

    if (currentFilter.length === 0) {
      delete apiRequestCopy[filterName]
    } else {
      apiRequestCopy[filterName] = currentFilter
    }

    let newTrace = this.state.trace
    newTrace.push({ "time": new Date() - this.state.initialTimestamp, "Filter": filterName })

    this.setState({ apiRequest: apiRequestCopy, trace: newTrace })
  }

  linkedButton(text, filterName, children) {
    const STRONG_COLOR = "#fff500"
    const LIGHT_COLOR = "#fffb96"

    let isParentSelected = this.state.apiRequest[filterName] !== undefined && 
      this.state.apiRequest[filterName].some(item => children.map(child => child.key).includes(item))
    let parentColor = isParentSelected ? STRONG_COLOR : LIGHT_COLOR

    let parent = (
      <div style={{marginTop:'1rem', "height": "4rem", 'backgroundColor': '#919191', 'width': '250px'}}>
        <button 
          key="parent"
          onMouseOver={event => event.target.style.background = STRONG_COLOR}
          onMouseOut={event => event.target.style.background = parentColor}
          style={{ "background": parentColor, "height": "2rem", width: "200px", 'marginLeft': '20px', "marginTop": "1rem", "fontSize": "15px" }}
          onClick={() => this.linkedToggle(filterName, children.map(child => child.key))}
          >
        {text}
      </button>
    </div>)
    
    let childrenButtons = []

    for (let child of children) {
      let isSelected = this.state.apiRequest[filterName] !== undefined && this.state.apiRequest[filterName].includes(child.key)
      let color = isSelected ? STRONG_COLOR : LIGHT_COLOR

      childrenButtons.push(
        <div style={{marginTop:'1rem', "height": "4rem", 'backgroundColor': '#d6d6d6', 'width': '250px'}}>
          <button
          key={child.key}
          onMouseOver={event => event.target.style.background = STRONG_COLOR}
          onMouseOut={event => event.target.style.background = color}
          style={{ "background": color, "height": "2rem", width: "160px", 'marginLeft': '10px', "marginTop": "1rem", "fontSize": "15px" }}
          onClick={() => this.singleToggle(filterName, child.key)}
          >
            {child.text}
          </button>
        </div>
      )
    }

    return(<div style={{display: "flex", flexDirection: "row"}}>
    {parent}
    {childrenButtons}
    </div>)
  }

  complexView() {
    return (
      <>
      <div style={{ 'display': 'grid', 'gridTemplateColumns': '14rem 14rem 14rem 14rem 14rem', 'gridGap': '2rem', 'gridAutoFlow': 'row', 'columnGap': '10rem' }}>
        {this.fillableInputRange("Faixa de preço do aluguel", 'TOTAL_PRICE_RANGE', 1000)} 
        {this.fillableInputRange("Outras taxas recorrentes", 'FEES_PRICE_RANGE', 200)} 
        {this.fillableInputRange("Número de quartos", 'BEDROOM COUNT', 0)}
        {this.fillableInputRange("Número de banheiros", 'BATHROOM_COUNT', 0)}
        {this.fillableInputRange("Número de vagas", 'PARKING_SPOTS', 0)}
      </div>
        <div style={{ 'display': 'grid', 'gridTemplateColumns': '4rem 4rem 4rem 4rem', 'gridGap': '4rem', 'gridAutoFlow': 'row', 'columnGap': '20rem' }}>
          {this.boolButton("Pet friendly?", 'PET_FRIENDLY')}
          {this.boolButton("Mobiliado?", 'READY_TO_LIVE')}
          {this.boolButton("Com churrasqueira?", 'BARBECUE')}
          {this.boolButton("Com piscina?", 'POOL')}
        </div>
        <div>
          { this.linkedButton('Apartamentos', 'HOUSE_TYPE', [
            {'text': 'Tradicional', 'key': 'TRADITIONAL'}, 
            {'text': 'JK/Studio', 'key': 'STUDIO'}, 
            {'text': 'Kitnet', 'key': 'KITNET'}, 
            {'text': 'Flat', 'key': 'FLAT'}, 
            {'text': 'Loft', 'key': 'LOFT'}, 
            {'text': 'Andar', 'key': 'FLOOR'}, 
            {'text': 'Cobertura', 'key': 'ROOFTOP'}
            ])}
        </div>
        <div>
            { this.linkedButton('Casa', 'HOUSE_TYPE', [
              {'text': 'Casa residencial', 'key': 'SINGLE_FAMILY'}, 
              {'text': 'Duplex', 'key': 'DUPLEX'}, 
              {'text': 'Sítio', 'key': 'CABIN'}, 
              {'text': 'Casa em condomínio', 'key': 'HOA'}
              ])}
        </div>
      </>
    )
  }

  simpleView() {
    let housingTypes = [
      {
        text: "Apartamento", filterName: "ANY1", children: [
          { text: "Tradicional", filterName: "TRADITIONAL" },
          { text: "JK/Studio", filterName: "STUDIO" },
          { text: "Kitnet", filterName: "KITNET" },
          { text: "Flat", filterName: "FLAT" },
          { text: "Loft", filterName: "LOFT" },
          { text: "Andar", filterName: "FLOOR" },
          { text: "Cobertura", filterName: "ROOFTOP" }]
      },
      {
        text: "Casa", filterName: "ANY2", children: [
          { text: "Casa residencial", filterName: "SINGLE_FAMILY" },
          { text: "Duplex", filterName: "DUPLEX" },
          { text: "Sítio", filterName: "CABIN" },
          { text: "Casa em condomínio", filterName: "HOA" }]
      }]
    return [
      <Slider text={'Faixa de preço do aluguel?'} filterName={'TOTAL_PRICE_RANGE'} id={0} key={-5} min={1000} max={10000} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Mobiliado?" filterName="READY_TO_LIVE" id={1} key={-3} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <Slider text={'Faixa de preço de taxas como condomínio, gás, etc.?'} filterName={'FEES_PRICE_RANGE'} id={2} key={-4} min={0} max={2000} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <TieredButtonController text="Apartamento? Casa?" filterName="HOUSE_TYPE" id={3} key={1} parentStateFunction={this.tieredButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={housingTypes} />,
      <Slider text={'Número de quartos?'} filterName={'BEDROOM COUNT'} id={4} key={-2} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Com churrasqueira?" filterName="BARBECUE" id={5} key={0} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} buttons={[1, 2]} />,
      <Slider text={'Número de banheiros?'} filterName={'BATHROOM_COUNT'} id={6} key={-1} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Pet friendly?" filterName="PET_FRIENDLY" id={7} key={2} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />,
      <Slider text={'Número de vagas?'} filterName={'PARKING_SPOTS'} id={8} key={3} min={0} max={5} parentId={this.state.lastSelected} renameAttempt={this.sliderFunction} />,
      <SimpleButton text="Com piscina?" filterName="POOL" id={9} key={4} parentStateFunction={this.simpleButtonFunction} parentId={this.state.lastSelected} updateStateJSON={this.updateStateJSON} />
    ]
  }

  screenSelect() {
    return (
      <> 
          <button onClick={() => this.setState({visibilityMode: -1, initialTimestamp: new Date(), trace: []})}>SIMPLIFICADO</button>
          <button onClick={() => this.setState({visibilityMode: 1, initialTimestamp: new Date(), trace: []})}>AVANÇADO</button>
      </>
    )
  }

  render() {

    return (<>
      <div>{this.state.visibilityMode === 0 && this.screenSelect()}</div>
      <div>{this.state.visibilityMode > 0 && this.complexView()}</div>
      <div>{this.state.visibilityMode < 0 && this.simpleView()}</div>
      { this.state.visibilityMode !== 0 &&
        <>
      <ApiRequest apiRequest={this.state.apiRequest} traceFun={this.apiRequestFun} scrollAnchor={this.messagesEndRef} pageBottom={this.pageBottom} />
      <button style={{ "background": '#9fe5e1', "height": "40px", width: "100%", "marginBottom": "2%", "fontSize": "18px", 'marginTop': '20px' }} onClick={() => this.scrollToPlace()}>Voltar para cima</button>
      <div key={'reff'} ref={this.pageBottom} />
      <button onClick={() => console.log(this.state.trace)}>Finalizar</button>
      </>
  }
    </>)
  }
}

export default App