import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UpdateGoal from './pages/UpdateGoal'
import UpdateGoal1 from './pages/UpdateGoal1'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
            <Header />
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                {/* <Route path="/goal/:goalId" exact element={ <UpdateGoal1 /> } /> */} {/*This also works*/}
                <Route path="/goal/:goalId" exact element={ <UpdateGoal /> } />
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}
 
export default App;
