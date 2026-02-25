import Header from './Header/Header';
import Home from './pages/Home/Home';


// CSS imports
import './App.css'

function App() {

  return (
    <>
      <Header color="light" light={true} expand="md" container="md" fixed="top" />

      <Home/>
    </>
  )
}

export default App;
