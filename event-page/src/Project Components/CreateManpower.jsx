/* AdminPanel.jsx */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import NavBar from "./NavBar";
import Footer from "./FooterHome";
import FooterOtherPages from "./FooterOtherPages";

const CreateManpower = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    responsibility: "",
    mobile_number: 0,
    eventId: "",
  };

  const onSubmit = async (info) => {
    try {
      const result = await axios({
        url: "http://localhost:8000/entry/events/createManpower",
        method: "post",
        data: info,
      });
      console.log("Manpower created successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to create manpower:", error);
    }
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is required. "),
    responsibility: yup.string().required("Responsibility is required. "),
    mobile_number: yup.string().required("Phone number is required. "),
    eventId: yup.string().required("Event Id is required. "),
  });

  return (
    <>
      <NavBar />
      <div className="create-section">
        <div className="form-container">
          <h1>Create a New Manpower</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <Field type="text" name="name" id="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-group">
                <label htmlFor="responsibility">Responsibility:</label>
                <Field type="text" name="responsibility" id="responsibility" />
                <ErrorMessage
                  name="responsibility"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile_number">Phone number:</label>
                <Field type="number" name="mobile_number" id="mobile_number" />
                <ErrorMessage
                  name="mobile_number"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventId">Event Id:</label>
                <Field type="text" name="eventId" id="eventId" />
                <ErrorMessage
                  name="eventId"
                  component="div"
                  className="error-message"
                />
              </div>

              <button type="submit">Create Manpower</button>
            </Form>
          </Formik>
        </div>
      </div>
      <FooterOtherPages />
    </>
  );
};

export default CreateManpower;
