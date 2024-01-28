

import './App.css'
import Login from './Pages/Login'
import UserPage from './Pages/UserPage'
import { BrowserRouter as Router,Route ,Routes } from 'react-router-dom'
// import Navbars from './Components/Navbars'
// import CardNews from './Components/CardNews'
// import Login from './Pages/Login'
 import Signup from './Pages/Signup'
import Navbars from './Components/Navbars'
import CardNews from './Components/CardNews'
import Admin from './Pages/Admin'
import Category from './Pages/Category'
import Editnews from './Pages/Editnews'
// import Navbar from './Components/Navbar'

function App() {
 

  return (
    <>
    <Router>
     
      <Routes>
      <Route path="/" element={<UserPage categoryname ={"all"} />} />
      <Route path="/sport" element={<UserPage categoryname ={"Sport"} />} />
  <Route path="/entertainment" element={<UserPage categoryname={"Entertainment"} />} />
  <Route path="/business" element={<UserPage categoryname ={"Business"} />} />
  <Route path="/health" element ={<UserPage categoryname={"Health"}/>}/>
  <Route path='/science' element ={<UserPage categoryname={"Science"}/>}/>
  <Route path="/technology" element={<UserPage categoryname ={"Technology"} />} />


      <Route path="/login" element={<Login  />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editnews/:id" element={<Editnews/>} />
        <Route path='/addcategory' element={<Category/>} />

        
      </Routes>

    </Router>
    
    </>
  )
}

export default App
