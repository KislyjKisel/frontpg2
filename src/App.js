import './App.css';

function App() {
  const h = () => alert("text");
  return (
    <div className="App">
      <input placeholder='login' type='text'></input>
      <input placeholder='password' type='password'></input>
      <button onClick={() => alert({ "smth": "here" })}>submit</button>
    </div>
  );
}

export default App;
