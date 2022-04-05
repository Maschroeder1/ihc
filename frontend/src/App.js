import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './useBookSearch'

export default function App() {
  const [second, setSecond] = useState(false)
  const [third, setThird] = useState(false)
  const [fim, setFim] = useState(false)
  const [pergunta1, setPergunta1] = useState('')
  const [pergunta2, setPergunta2] = useState('')
  const [pergunta3, setPergunta3] = useState('')
  const [ohboy, setOhBoy] = useState('')


  function clickSim1() {
    setSecond(true)
    setPergunta1('sim')
    setOhBoy(JSON.stringify(['sim', pergunta2, pergunta3]))
  }
  function clickSim2() {
    setThird(true)
    setPergunta2('sim')
    setOhBoy(JSON.stringify([pergunta1, 'sim', pergunta3]))
  }
  function clickSim3() {
    setFim(true)
    setPergunta3('sim')
    setOhBoy(JSON.stringify([pergunta1, pergunta2, 'sim']))
  }
  function clickNao1() {
    setSecond(true)
    setPergunta1('nao')
    setOhBoy(JSON.stringify(['nao', pergunta2, pergunta3]))
  }
  function clickNao2() {
    setThird(true)
    setPergunta2('nao')
    setOhBoy(JSON.stringify([pergunta1, 'nao', pergunta3]))
  }
  function clickNao3() {
    setFim(true)
    setPergunta3('nao')
    setOhBoy(JSON.stringify([pergunta1, pergunta2, 'nao']))
  }
  function clickIdc1() {
    setSecond(true)
    setPergunta1('tanto faz')
    setOhBoy(JSON.stringify(['tanto faz', pergunta2, pergunta3]))
  }
  function clickIdc2() {
    setThird(true)
    setPergunta2('tanto faz')
    setOhBoy(JSON.stringify([pergunta1, 'tanto faz', pergunta3]))
  }
  function clickIdc3() {
    setFim(true)
    setPergunta3('tanto faz')
    setOhBoy(JSON.stringify([pergunta1, pergunta2, 'tanto faz']))
  }
  // const [query, setQuery] = useState('')
  // const [pageNumber, setPageNumber] = useState(1)

  // const {
  //   books,
  //   hasMore,
  //   loading,
  //   error
  // } = useBookSearch(query, pageNumber)

  // const observer = useRef()
  // const lastBookElementRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPageNumber(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])

  // function handleSearch(e) {
  //   setQuery(e.target.value)
  //   setPageNumber(1)
  // }

  return (
    <>
    <div>
      {true &&
       <>
        <div>'Pergunta 1'</div>
        <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickSim1}>SIM</button>
        <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickNao1}>NAO</button>
        <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickIdc1}>TANTO FAZ</button>
       </>
      }
      </div>
        <div>
          {second &&
           <>
            <div>'Pergunta 2'</div>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickSim2}>SIM</button>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickNao2}>NAO</button>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickIdc2}>TANTO FAZ</button>
           </>
          }
        </div>
        <div>
          {third &&
           <>
            <div>'Pergunta 3'</div>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickSim3}>SIM</button>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickNao3}>NAO</button>
            <button style={{"height": "100px", width: "100%", "margin-bottom": "30px"}} onClick={clickIdc3}>TANTO FAZ</button></>
          }
        </div>
        <div>
          {fim &&
           <><div>{ohboy}</div></>
          }
        </div>
      </>
  )
}
