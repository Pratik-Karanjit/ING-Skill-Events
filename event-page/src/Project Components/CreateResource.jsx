/* AdminPanel.jsx */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CreateResource = () => {
  const navigate = useNavigate();

  const initialValues = {
    item: "",
    quantity: 0,
  };

  const onSubmit = async (info) => {
    try {
      const result = await axios({
        url: "http://localhost:8000/entry/events/createResource",
        method: "post",
        data: info,
      });
      console.log("Resource created successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to create Resource:", error);
    }
  };

  const validationSchema = yup.object({
    item: yup.string().required("Item is required. "),
    quantity: yup.string().required("Quantity is required. "),
  });

  return (
    <div className="create-section">
      <div className="form-container">
        <h1>Create a New Resource</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="item">Item:</label>
              <Field type="text" name="item" id="item" />
              <ErrorMessage
                name="item"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <Field type="number" name="quantity" id="quantity" />
              <ErrorMessage
                name="quantity"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit">Create Resource</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateResource;