import {
  createHashRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { LayoutHome } from "../layouts/Layout_home";
import { Dashboard } from "../pages/Dashboard";
import { Registration } from "../pages/Registration";
import { ResetPass } from "../pages/Reset";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Contact } from "../pages/Contact";




export const WebRouter = createHashRouter(
  createRoutesFromElements(
      <>
          <Route element={<LayoutHome />}>
          <Route path="/" element={<Home />} />
              <Route path="/login"  element={<Login />} />
              <Route path="/contact"  element={<Contact />} />
              <Route path="/dashboard"  element={<Dashboard />} />
              <Route path="/reg"  element={<Registration/>} />
              <Route path="/reset" element={<ResetPass/>} />

          </Route>
{/* 
          <Route path="/app" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/dashboard"  element={<Dashboard />} />    
      </Route> */}
      </>
  ),
  {
      basename: import.meta.env.BASE_URL
  }
);


