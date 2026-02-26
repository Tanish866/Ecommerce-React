import MainRoutes from './routes/MainRoutes';
import Header from './components/Header/Header'


// CSS imports
import './App.css'

function App() {

  return (
    <div className='app-wrapper'>
      <Header className="header" color="light" light={true} expand="md" container="md" />
      <MainRoutes/>
    </div>
  )
}

export default App;
