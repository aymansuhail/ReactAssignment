import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from "../../common/headerSlice";
import { addNewLeadAsync } from "../leadSlice";
import axios from "axios";
const INITIAL_LEAD_OBJ = {
  firstname: "",
  lastname: "",
  email: ""
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = async () => {
    if (leadObj.firstname.trim() === "") return setErrorMessage("First Name is required!");
    else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!");
    else if (!isValidEmail(leadObj.email.trim())) return setErrorMessage("Invalid Email format!");
    else {
      try {
        setLoading(true);

        // Check if the email already exists in the database
        const emailExists = await checkEmailExists(leadObj.email);

        if (emailExists) {
          setErrorMessage("Email already exists in the database.");
          dispatch(showNotification({ message: "Email already exists.", status: 0 }));
        } else {
          // Email doesn't exist, proceed to add the new lead
          await dispatch(addNewLeadAsync(leadObj));
          dispatch(showNotification({ message: "New Driver Added!", status: 1 }));
          closeModal();
        }
      } catch (error) {
        console.error("Error adding new lead:", error);
        setErrorMessage("Failed to save new lead. Please try again.");
        dispatch(showNotification({ message: "There was trouble creating the new entry.", status: 0 }));
      } finally {
        setLoading(false);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  // Function to check if the email already exists in the database
 
  const checkEmailExists = async (email) => {
    // Construct the filter query to check if the email already exists
    const filterQuery = `?filter=(email='${email}')`;
  
    // Make a GET request to the API with the filter query
    const response = await axios.get(`http://127.0.0.1:8090/api/collections/Drivers/records${filterQuery}`);
    
    // Check if any records match the filter criteria
    return response.data.items.length > 0;
  };
  

  return (
    <>
      <InputText type="text" defaultValue={leadObj.firstname} updateType="firstname" containerStyle="mt-4" labelTitle="First Name" updateFormValue={updateFormValue} />
      <InputText type="text" defaultValue={leadObj.lastname} updateType="lastname" containerStyle="mt-4" labelTitle="Last Name" updateFormValue={updateFormValue} />
      <InputText type="email" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
