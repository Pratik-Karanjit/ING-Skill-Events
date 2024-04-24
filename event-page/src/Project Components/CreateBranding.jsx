/* AdminPanel.jsx */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";

const CreateBranding = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);

  const categoryOption = [
    { value: "Card", label: "Card" },
    { value: "Student", label: "Student" },
  ];

  const assetOption = [
    { value: "abc", label: "abc" },
    { value: "def", label: "def" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOptions(selectedOption);
  };
  const handleAsset = (selectedAsset) => {
    setSelectedAssets(selectedAsset);
  };

  const initialValues = {
    category: "",
    asset: "",
    quantity: 0,
    placement: "",
  };

  const onSubmit = async (info) => {
    try {
      const result = await axios({
        url: "http://localhost:8000/entry/events/createBranding",
        method: "post",
        data: info,
      });
      console.log("Manpower created successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to create Manpower:", error);
    }
  };

  const validationSchema = yup.object({
    // category: yup.string().required("Category is required. "),
    // asset: yup.string().required("Asset is required. "),
    quantity: yup.string().required("Quantity is required. "),
    placement: yup.string().required("Placement is required. "),
  });

  return (
    <div className="create-section">
      <div className="form-container">
        <h1>Create a New Branding</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="form-group">
              <Select
                options={categoryOption}
                value={selectedOptions}
                onChange={handleChange}
                isMulti={true}
                placeholder="Select category"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Select
                options={assetOption}
                value={selectedAssets}
                onChange={handleAsset}
                isMulti={true}
                placeholder="Select asset"
              />
              <ErrorMessage
                name="category"
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

            <div className="form-group">
              <label htmlFor="placement">Placement:</label>
              <Field type="text" name="placement" id="placement" />
              <ErrorMessage
                name="placement"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit">Create Manpower</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CreateBranding;
