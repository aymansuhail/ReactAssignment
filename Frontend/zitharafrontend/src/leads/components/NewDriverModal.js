import React, { useState } from "react";

const NewDriverModal = ({ onClose, onCreate }) => {
  const [newDriverData, setNewDriverData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreate = () => {
   

    
    onCreate(newDriverData);

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Driver</h2>
        <form>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={newDriverData.firstname}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={newDriverData.lastname}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={newDriverData.email}
              onChange={handleChange}
            />
          </label>
          {/* Add other input fields for additional data */}
          <br />
          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewDriverModal;
