import './App.css';
import Navbar from './components/navbar/navbar';
import Login from './pages/login';
import Register from './pages/register';
import Adminpage from './pages/adminpage';
import Userpage from './pages/userpage';
import Productdetails from './pages/productdetails';
import Userproductdetails from './pages/userproductdetails';
import Cartpage from './pages/cartpage';
import Userprofile from './components/userprofile/userprofile';
import Userprofilepage from './pages/loginuserpage';
import Checkout from './pages/checkoutpage';
import Orderconfirm from './pages/orderconfirm';
import Listorder from './pages/listorder';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>  
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/adminpage' element={<Adminpage/>}/>
          <Route path='/userpage' element={<Userpage/>}/>
          <Route path='/userprofilepage' element={<Userprofilepage/>}/>
          <Route path='/productdetails/:productId' element={<Productdetails/>}/>
          <Route path='/userproductdetails/:productId' element={<Userproductdetails/>}/>
          <Route path='/cartpage' element={<Cartpage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/orderconfirm' element={<Orderconfirm/>}/>
          <Route path='/listorder' element={<Listorder/>}/>
        </Routes>
      </Router>    

    </div>
  );
}

export default App;
