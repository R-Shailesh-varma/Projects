import NavbarWeb from "./Compo/NavbarWeb";
import HomeMain from "./Compo/HomeMain";
import LoginMain from "./LoginMain";
import SignUp from "./SignUp";
import FootBar from "./Compo/FootBar";
import Scan from "./Scan";
import {createBrowserRouter , RouterProvider } from 'react-router-dom'


function App() {

  const router = createBrowserRouter([
    {
      path : "/" , 
      element :<><NavbarWeb/><HomeMain/><FootBar/></> ,
    },
    {
      path : "/Login",
      element : <><NavbarWeb/><LoginMain/><FootBar/></>,
    },{
      path : "/Sign-up",
      element : <><NavbarWeb/><SignUp/><FootBar/></>,
    },{
      path : "/Scan",
      element : <><NavbarWeb/><Scan/><FootBar/></>,
    }
  ])

  return(
      <>

        <RouterProvider router={router}/>
        
      </>
  );

}

export default App
