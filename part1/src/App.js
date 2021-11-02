import logo from './logo.svg';
import './App.css';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='george' />
      <Hello name="daisy" />
      <Hello />
    </div>
  )
}

export default App;
