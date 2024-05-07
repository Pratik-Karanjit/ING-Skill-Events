/* AdminPanel.jsx */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import NavBar from "./NavBar";
import Footer from "./FooterHome";
import FooterOtherPages from "./FooterOtherPages";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const initialValues = {
    title: "",
    owner: "",
    scope: "",
    description: "",
    college: "",
    start_date: "",
    end_date: "",
    status: "",
    budget: 0,
    tag: "",
    eventId: "",
    eventImage: null,
  };

  const tagOption = [
    { value: "Center", label: "Center" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "North", label: "North" },
    { value: "South", label: "South" },
  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmit = async (info) => {
    try {
      const formData = new FormData();
      formData.append("img", file);
      formData.append("title", info.title);
      formData.append("owner", info.owner);
      formData.append("scope", info.scope);
      formData.append("description", info.description);
      formData.append("college", info.college);
      formData.append("start_date", info.start_date);
      formData.append("end_date", info.end_date);
      formData.append("status", info.status);
      formData.append("budget", info.budget);
      formData.append("eventId", info.eventId);
      const tagsToSend = selectedTags.map((tag) => tag.value);
      formData.append("tag", tagsToSend);

      // Log the FormData object before sending
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const result = await axios.post(
        "http://localhost:8000/entry/events/create",
        formData
      );
      console.log("Event created successfully");
      navigate("/");
    } catch (error) {
      console.log("Unable to create product:", error);
    }
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required. "),
    owner: yup.string().required("Owner is required. "),
    scope: yup.string().required("Scope is required. "),
    description: yup.string().required("Description is required. "),
    college: yup.string().required("College is required. "),
    start_date: yup.string().required("Start Date is required. "),
    end_date: yup.string().required("End Date is required. "),
    status: yup.string().required("Status is required. "),
    budget: yup.string().required("Budget is required. "),
    eventId: yup.string().required("Event ID is required. "),
  });

  return (
    <>
      <NavBar />
      <div className="create-section">
        <div className="form-container">
          <h1>Create a New Event</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <Field type="text" name="title" id="title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error-message"
                  />
                  <label htmlFor="owner">Owner:</label>
                  <Field type="text" name="owner" id="owner" />
                  <ErrorMessage
                    name="owner"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="scope">Scope:</label>
                  <Field type="text" name="scope" id="scope" />
                  <ErrorMessage
                    name="scope"
                    component="div"
                    className="error-message"
                  />
                  <label htmlFor="description">Description:</label>
                  <Field type="text" name="description" id="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="start_date">Start Date:</label>
                  <Field type="date" name="start_date" id="start_date" />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    className="error-message"
                  />
                  <label htmlFor="end_date">End Date:</label>
                  <Field type="date" name="end_date" id="end_date" />
                  <ErrorMessage
                    name="end_date"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="college">College:</label>
                  <Field type="text" name="college" id="college" />
                  <ErrorMessage
                    name="college"
                    component="div"
                    className="error-message"
                  />
                  <label htmlFor="status">Status:</label>
                  <Field as="select" name="status" id="status">
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Budget:</label>
                  <Field type="number" name="budget" id="budget" />
                  <ErrorMessage
                    name="budget"
                    component="div"
                    className="error-message"
                  />
                  <label htmlFor="tag">Tag:</label>

                  <Select
                    className="admin-select-tag"
                    options={tagOption}
                    value={selectedTags}
                    onChange={(selectedTag) => {
                      setSelectedTags(selectedTag);
                      setFieldValue(
                        "tag",
                        selectedTag.map((tag) => tag.value)
                      );
                    }}
                    isMulti={true}
                    placeholder="Select tag"
                  />
                  <ErrorMessage
                    name="tag"
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
                  <label htmlFor="eventImage">Event Image:</label>
                  <Field
                    type="file"
                    name="eventImage"
                    id="eventImage"
                    onChange={handleFileChange}
                  />
                  <ErrorMessage
                    name="eventImage"
                    component="div"
                    className="error-message"
                  />
                </div>

                <button type="submit">Create Event</button>
                <button
                  style={{ marginTop: "20px" }}
                  onClick={(e) => {
                    navigate("/createManpower");
                  }}
                >
                  Create Manpower
                </button>
                <button
                  style={{ marginTop: "20px" }}
                  onClick={(e) => {
                    navigate("/createResource");
                  }}
                >
                  Create Resource
                </button>
                <button
                  style={{ marginTop: "20px" }}
                  onClick={(e) => {
                    navigate("/createBranding");
                  }}
                >
                  Create Branding
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <FooterOtherPages />
    </>
  );
};

export default AdminPanel;
