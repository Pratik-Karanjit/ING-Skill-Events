import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePageV1 from "./Project Components/HomePageV1.jsx";
import ErrorPage from "./Project Components/ErrorPage.jsx";
import EventDetails from "./Project Components/EventDetails.jsx";
import HomePageV2 from "./Project Components/HomePageV2.jsx";
import Contact from "./Contact.jsx";

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
        <Route index element={<HomePageV1 />} />
        {/* <Route index element={<HomePageV2 />} /> */}
        <Route path="/events/:eventsId" element={<EventDetails />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MyRouter;
