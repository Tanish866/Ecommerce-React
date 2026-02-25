import Header from './Header/Header';
import MainRoutes from './routes/MainRoutes';


// CSS imports
import './App.css'

function App() {

  return (
    <div className='app-wrapper'>
      <Header color="light" light={true} expand="md" container="md" />
      <MainRoutes/>
    </div>
  )
}

export default App;
