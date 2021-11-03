import React, { useState } from 'react'

const Header = () => <h1>Give Feedback</h1>

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Display = props => <div>{props.text}: {props.value}</div>

const Statistics = props => {
  const [good, neutral, bad] = props.values
  //console.log(props.values)
  const sum = (good, neutral, bad) => (good + neutral + bad)
  const avg = (good, neutral, bad) => ((good - bad) 
                                            / sum(good, neutral, bad))
  const posi = (good, neutral, bad) => (good / sum(good, neutral, bad))
  
  return (
    <div>
      <h1>Statistics</h1>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <Display text='all' value={sum(good, neutral, bad)} />
      <Display text='average' value={avg(good, neutral, bad)} />
      <Display text='positive' value={posi(good, neutral, bad)} />
    </div>)
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseValue = (state, stateFunc) => () => {
    stateFunc(state + 1)
  }

  // const sumState = (...args) => [...args].reduce((a, b) => a + b, 0)


  return (
    <div>
      <Header />
      <Button handleClick={increaseValue(good, setGood)} text='good' />
      <Button handleClick={increaseValue(neutral, setNeutral)} text='neutral' />
      <Button handleClick={increaseValue(bad, setBad)} text='bad' />
      <Statistics values={[good, neutral, bad]} />

    </div>
  )
}

export default App