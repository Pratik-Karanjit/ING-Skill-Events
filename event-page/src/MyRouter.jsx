import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import HomePageV1 from "./Project Components/HomePageV1.jsx";
import ErrorPage from "./Project Components/ErrorPage.jsx";
import HomePageV2 from "./Project Components/HomePageV2.jsx";
import Contact from "./Contact.jsx";
import EventDetailPage from "./Project Components/EventDetailPage.jsx";

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
        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default MyRouter;
