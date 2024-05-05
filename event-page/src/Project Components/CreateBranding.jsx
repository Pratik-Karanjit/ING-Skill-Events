import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as yup from "yup";
import NavBar from "./NavBar";
import Footer from "./FooterHome";
import FooterOtherPages from "./FooterOtherPages";

const CreateBranding = () => {
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedPlacements, setSelectedPlacements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialValues = {
    category: "",
    asset: "",
    quantity: "",
    placement: "",
    eventId: "",
  };

  const categoryOption = [
    { value: "Card", label: "Card" },
    { value: "Student", label: "Student" },
  ];

  const assetOption = [
    { value: "abc", label: "abc" },
    { value: "def", label: "def" },
  ];
  const placementOption = [
    { value: "Main Gate", label: "Main Gate" },
    { value: "Ground Floor", label: "Ground Floor" },
    { value: "Entrance Door", label: "Entrance Door" },
    { value: "Roof top", label: "Roof top" },
  ];

  const quantityOptions = Array.from({ length: 200 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }));

  const onSubmit = async (info) => {
    try {
      const quantityString = selectedOptions
        .map((option) => option.value)
        .join(",");
      info.quantities = quantityString;
      const result = await axios.post(
        "https://ing-skill-events.onrender.com/entry/events/createBranding",
        info
      );
      console.log("Branding created successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to create Branding:", error);
    }
  };

  const validationSchema = yup.object({
    // quantities: yup.array().min(1, "At least one quantity must be selected"),
    // placement: yup.string().required("Placement is required."),
  });

  return (
    <>
      <NavBar />
      <div className="create-section">
        <div className="form-container">
          <h1>Create a New Branding</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="quantities">Category:</label>

                  <Select
                    options={categoryOption}
                    value={selectedCategory}
                    onChange={(selectedOption) => {
                      setSelectedCategory(selectedOption);
                      setFieldValue("category", selectedOption.value);
                    }}
                    placeholder="Select category"
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantities">Asset:</label>

                  <Select
                    options={assetOption}
                    value={selectedAssets}
                    onChange={(selectedAsset) => {
                      setSelectedAssets(selectedAsset);
                      setFieldValue(
                        "asset",
                        selectedAsset.map((option) => option.value)
                      );
                    }}
                    isMulti={true}
                    placeholder="Select asset"
                  />
                  <ErrorMessage
                    name="asset"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantities">Quantity:</label>
                  <Select
                    options={quantityOptions}
                    value={selectedOptions}
                    onChange={(selectedOption) => {
                      setSelectedOptions(selectedOption);
                      setFieldValue(
                        "quantity",
                        selectedOption.map((option) => option.value)
                      );
                    }}
                    isMulti={true}
                    placeholder="Select quantities"
                  />
                  <ErrorMessage
                    name="quantities"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantities">Placement:</label>

                  <Select
                    options={placementOption}
                    value={selectedPlacements}
                    onChange={(selectedPlacement) => {
                      setSelectedPlacements(selectedPlacement);
                      setFieldValue(
                        "placement",
                        selectedPlacement.map((option) => option.value)
                      );
                    }}
                    isMulti={true}
                    placeholder="Select placement"
                  />
                  <ErrorMessage
                    name="placement"
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
                {/* <div className="form-group">
                <label htmlFor="placement">Placement:</label>
                <Field type="text" name="placement" id="placement" />
                <ErrorMessage
                  name="placement"
                  component="div"
                  className="error-message"
                />
              </div> */}

                <button type="submit">Create Branding</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <FooterOtherPages />
    </>
  );
};

export default CreateBranding;
