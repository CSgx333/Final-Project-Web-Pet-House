import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import MainCRUD from './CRUD/MainCRUD';
import Admin from './CRUD/Admin';
import Login from './page/Login'
import Register from './page/Register'
import ForgotPassword from './page/ForgotPassword'
import ResetPassword from './page/ResetPassword'
import Profile from './page/Profile'
import CatAdopt from './page/CatAdopt'
import DogAdopt from './page/DogAdopt'
import CatProfile from './page/CatProfile'
import DogProfile from './page/DogProfile'
import UserAddPetAdopt from './page/UserAddPetAdopt'
import PetLost from './page/PetLost'
import PetLostProfile from './page/PetLostProfile'
import UserAddPetLost from './page/UserAddPetLost'
import Contribution from './page/Contribution'
import ContributionProfile from './page/ContributionProfile'
import AddContribution from './page/UserAddContribution'
import ContributionPayment from './page/ContributionPayment'
import ChatRoom from './chat/ChatRoom';
import Product from './page/Product';
import Cart from './page/Cart';
import Transport from './page/Transport';
import About from './footerPage/About';
import HowToOrder from './footerPage/HowToOrder';
import Query from './footerPage/Query';
import Help from './footerPage/Help';

function App() {

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<Home />}/>
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Dashboard" element={<MainCRUD />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/CatAdopt" element={<CatAdopt />} />
              <Route path="/CatProfile" element={<CatProfile />} />
              <Route path="/AddPetAdopt" element={<UserAddPetAdopt />} />
              <Route path="/DogAdopt" element={<DogAdopt />} />
              <Route path="/DogProfile" element={<DogProfile />} />
              <Route path="/PetLost" element={<PetLost />} />
              <Route path="/PetLostProfile" element={<PetLostProfile />} />
              <Route path="/AddPetLost" element={<UserAddPetLost />} />
              <Route path="/Contribution" element={<Contribution />} />
              <Route path="/ContributionProfile" element={<ContributionProfile />} />
              <Route path="/AddContribution" element={<AddContribution />} />
              <Route path="/ContributionPayment" element={<ContributionPayment />} />
              <Route path="/ChatRoom" element={<ChatRoom />} />
              <Route path="/Product" element={<Product />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Transport" element={<Transport />} />
              <Route path="/About" element={<About />} />
              <Route path="/HowToOrder" element={<HowToOrder />} />
              <Route path="/Questions" element={<Query />} />
              <Route path="/Help" element={<Help />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/ResetPassword" element={<ResetPassword />} />
            </Route>
          </Routes> 
        </BrowserRouter>
      </>
    )
}

export default App
