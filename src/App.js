import logo from './logo.svg';
import './App.css';
import News from './Components/News';
import ErrorBoundary from './Components/ErrorBoundary';


function App() {
  return (
    <div className="App">
     <ErrorBoundary>
      <News></News>
    </ErrorBoundary>
     
    </div>
  );
}

export default App;

//7bc0b42dd9ee46048d9f8762d9557c8f
//7bc0b42dd9ee46048d9f8762d9557c8f
