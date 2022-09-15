import Login from '../src/components/login'
import Signup from '../src/components/signup'
import ProductFeed from '../src/components/productFeed'
import Protected from '../src/components/protected'
import UnProtected from '../src/components/unprotected'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" /> }/>
          <Route path="/login" element={
            <UnProtected>
              <Login />
            </UnProtected>
          } />
          <Route path="/signup" element={
            <UnProtected>
              <Signup />
            </UnProtected>
          } />
          <Route path="/productfeed" element={
            <Protected>
              <ProductFeed />
            </Protected>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
