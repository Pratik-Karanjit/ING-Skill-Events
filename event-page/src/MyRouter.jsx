import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePageV1 from "./Project Components/HomePageV1.jsx";
import ErrorPage from "./Project Components/ErrorPage.jsx";
import HomePageV2 from "./Project Components/HomePageV2.jsx";
import Contact from "./Contact.jsx";
import EventDetailPage from "./Project Components/EventDetailPage.jsx";
import AdminPanel from "./Project Components/AdminPanel.jsx";
import CreateManpower from "./Project Components/CreateManpower.jsx";
import CreateBranding from "./Project Components/CreateBranding.jsx";
import CreateResource from "./Project Components/CreateResource.jsx";
import Abc from "./Project Components/Abc.jsx";
import Calendar from "./Project Components/Calendar.jsx";

const MyRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            {/* <NavBar /> */}
            <Outlet />
          </div>
        }
      >
        {/* <Route index element={<HomePageV1 />} /> */}
        <Route index element={<HomePageV2 />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/events/calendar/:eventId" element={<Calendar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/createManpower" element={<CreateManpower />} />
        <Route path="/createResource" element={<CreateResource />} />
        <Route path="/createBranding" element={<CreateBranding />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MyRouter;
