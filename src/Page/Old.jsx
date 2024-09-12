import React, { useState, useEffect } from "react";

function Home() {
  // This is A Show And Hide State
  const [show, setShow] = useState(false);
  // This alldata Is Display All Boxes
  // THIS ALL DATA IS STORED IN ALL BOXES IN LOCALSTORAGE AND DISPLAY OF ALL BOXES DATA
  const [alldata, setAlldata] = useState([]); // multiple entries in the state
  // This Is A Form Data With Any One Is Enter Name And PlaceHolder
  // Name And Placeholder Is Always With Strings
  const [formData, setFormData] = useState({
    name: "",
    placeholder: "",
  });

  //This is Array to Stored new input value for each Box
  // New input To Store In This State
  const [inputvalue, setInputValues] = useState([]);

  //  Add & Close Functionality
  // Update The State With Setshow Value Is True OnClick Funtion On Handleadd
  const handleadd = () => setShow(true);

  //  OnChange Functionality
  const handlechange = (e) => {
    // Destructuring Input in Name and Value
    // This is Destructuring in Object With Event.Target
    // This is Use Input Attributes
    const { name, value } = e.target;
    // Set In State in Name and Value
    // This is A Update The Previous State To new State With Name And Value Using Object
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      //This Name is Key Of Objcet And Value is Value when Any Html Attributes Like Name PlaceHolder And ETC.
      // That is A Key and Value Is Set Of any Inputs and Other Value setted
    }));
  };

  // OnChange Adding New Data In Boxes
  // This Index And E Is A Arrow Function With Two Parameter
  // Index Is A Parameter Of The Arrow Function That Found The Input Value Index
  const handleaddnewdata = (index, e) => {
    // ITEM VALUES IS HOLD THE INPUT VALUES
    const itemValue = e.target.value;
    // item Value Is Enter Value New Input Boxes
    // This is a Update State With New Input
    // New  Input Is A Itemvalue Alll The Value Previous Values With Add New Value
    //📍 UPDATEVALUE IS NOW NEW ARRAY WITH HOLDED INPUTVALUES
    const updatevalue = [...inputvalue];
    // This UpdateValue Is Store All New Enterd Value In Array With Spred Operator To all Old Data With Combined With New Data
    //The UPDATE VALUE IS INSERTED AT THE CORRENT POISION IN THE COPIED ARRAY
    updatevalue[index] = itemValue;
    // This UpdateValues Is Update With New Index With Combined With ItemValuess
    // THIS IS UPDATE STATE WITH SETINPUTVALUES
    setInputValues(updatevalue);
    // This Update Variable With Stored In all array State
    // That Is Second Array To Stored AllData with state
    const updatedData = [...alldata];
    // This targets the specific item in the array at the position INDEX
    // THAT SPREAD WITH NEW ENTERD DATA WITH A NEW INPUT AND UPDATE WITH A NEW ITEMVAULES
    updatedData[index] = { ...updatedData[index], placeholder: itemValue };
    // Store The All Data In State
    // THAT UPDATE WITH STATE AND MERGE IN SETALLDATA STATE
    setAlldata(updatedData);
    // Storage New Data in localStorage
    // THAT STORED IN LOCALSTORAGE WITH IN JSON DATA WITH STRINGIY AND ADD NEW STATE
    localStorage.setItem("data", JSON.stringify(updatedData));
  };

  // Buttons
  // Close Button
  const handleclose = () => {
    // The CALL THE STATE
    setShow(false);
    // THAT SETFORMDATA ENTER DATA AND VALUE ARE REPLACE WITH BLANK
    setFormData({ name: "", placeholder: "" });
  };
  // Save Button & Add New Button
  // Submit Button
  const handlesubmit = (e) => {
    // Stop The Unnecessary Form Submition that not Use They Refresh The Page
    e.preventDefault();
    // Stored New Data on Spred Operator With new Array
    // This is Update With previous To New State
    // Is Form Data THAT USE ENTERD DATA TO STORED  WITH STATE
    setAlldata((prev) => [...prev, formData]);
    // Calling Handlclose Function When Close all The Box
    handleclose();
    // Stored NEW AND UPDATED DATA in LocalStorage
    localStorage.setItem("data", JSON.stringify([...alldata, formData]));
  };

  // Clear Button
  const handleclear = () => {
    // This Blank The State
    setFormData({ name: "", placeholder: "" });
  };

  // OnChange Clear Button
  const handleonchangeclear = (index) => {
    // Create a copy of the current input values
    // UPDATE STATE WITH NEW INPUT CLEAR VALUE WITH SPECIFIC INDEX
    const updatedValues = [...inputvalue];
    // Clear the value at the specified index
    updatedValues[index] = "";
    // Update the state with the new values
    // THIS IS MERGE THE NEW CLEAR IN SETNPUTVALUE STATE
    setInputValues(updatedValues);
  };

  // Remove All Button
  const handleRemoveAll = () => {
    // All State Value Replace With Blank Array
    setAlldata([]);
    // All New Input Replace With Blank Array
    setInputValues([]);
    // This is Remove the All Data
    localStorage.removeItem("data");
  };

  // Remove Particular Box Button
  const handleRemoveItem = (index) => {
    // Flter =  It creates a new array with all elements that pass the test implemented by the provided function.
    // THAT item IS Represents the index of the current element.
    const UpdatedData = alldata.filter((i, item) => item !== index);
    // New Function With Filterd New Item To Remove Particular Box
    const UpdatedValue = inputvalue.filter((i, item) => item !== index);
    // THAT IS MERGE WITH NEW VARIABLE ex. Updateddata
    setAlldata(UpdatedData);
    // This is update the state with input
    setInputValues(UpdatedValue);
    localStorage.setItem("data", JSON.stringify(UpdatedData));
  };
  //  The Hold The Data Of Display When State Is Update or Hold
  useEffect(() => {
    // JSON.PARSE IS
    // The StoredData is json to parse is javascript Object Notation to stored
    const storedData = JSON.parse(localStorage.getItem("data"));
    // This If Line Is Check To Stored data is not null or undefined, it means there is data stored in the local storage.
    if (storedData) {
      // THAT IS MERGE WITH ALLDATA STATE
      setAlldata(storedData);
    }
  });

  return (
    <>
      <div className="container">
        <h1>Dynamic Grid</h1>
        <button type="button" className="btn btn-primary" onClick={handleadd}>
          Add +
        </button>
        <button
          type="button"
          className="btn btn-danger ms-3"
          onClick={handleRemoveAll}
        >
          Remove All
        </button>
        {/* Main Display Data */}
        {show && (
          <div className="modal show">
            <div className="modal-dialog">
              <div
                className="modal-content data-item mx-auto"
                style={{ maxWidth: "300px" }}
              >
                <form onSubmit={handlesubmit}>
                  <div className="modal-header bg-primary">
                    <h1 className="modal-title  fs-5" id="exampleModalLabel">
                      Add Name & Placeholder
                    </h1>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="col-form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={handlechange}
                        value={formData.name}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        name="placeholder"
                        className="form-control"
                        onChange={handlechange}
                        value={formData.placeholder}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleclose}
                    >
                      Close
                    </button>
                    <button className="btn btn-secondary" onClick={handleclear}>
                      Clear
                    </button>
                    <button type="submit" className="btn btn-success">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Show The All User Data */}
        {/* Form Data State in Combine With The alldata State And Then Print The New Value */}
        {/* Same State Never Use  To Print The Data Becase Same State Never Up In Real Time */}
        <div className="d-flex justify-content-start me-2 mt-4">
          {alldata.map((item, index) => (
            <div
              className="border border-dark  rounded mb-3 me-3 p-3 shadow-lg"
              key={index}
              style={{
                backgroundColor: "#f8f9fa",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <form
                className="data-item text-center mx-auto"
                style={{
                  maxWidth: "220px",
                  padding: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <div className="mb-3">
                  <label
                    className="form-label"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    {item.name}
                  </label>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="newdata"
                    className="form-control"
                    value={inputvalue[index] || ""}
                    placeholder={item.placeholder}
                    onChange={(e) => handleaddnewdata(index, e)}
                    style={{
                      border: "1px solid #ced4da",
                      borderRadius: "5px",
                      padding: "8px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div>
                  <button
                    className="btn btn-danger me-2"
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    style={{ fontSize: "14px" }}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleonchangeclear(index)}
                    style={{ fontSize: "14px" }}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
