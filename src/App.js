import Login from '../src/components/login'
import Signup from '../src/components/signup'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//HVHJSs23d

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/referal/:referalid' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
