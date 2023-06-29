import Navbar from './components/navBar';
//import MainFunc from './components/main';
import TTX from './components/ttx'
import './App.css';

function App() {
  return (
    <div className="App bg-light p-4">
      <Navbar/>
      <header className="App-header p-4">
        <h1 className='mb-4'> TTX with GPT </h1>
      </header>
      <div>
        <TTX/>
      </div>
    </div>
  );
}

export default App;
