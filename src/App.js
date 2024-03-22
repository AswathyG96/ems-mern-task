
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Edit from './Pages/Edit/Edit';
import Login from './Pages/Login/Login';
import Emplist from './Pages/Emplist/Emplist';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
//  import './mdb-react-ui-kit';


function App() {
  return (
   <>
   {/* <h1 className='mt-5 text-center text-dark'><i className='fa-solid fa-users'></i> welcome to ems app</h1> */}
   
<Routes>
  <Route path='/' element={<Home/>}  />
  <Route path='/register' element={<Register/>} />
  <Route path='/login/' element={<Login/>}/>
 <Route path='/edit/:id' element={<Edit/>} />
 <Route path='/emplist' element={<Emplist/>}/>
</Routes>
     <Footer/>

   </>
  
  );
  }

export default App;
