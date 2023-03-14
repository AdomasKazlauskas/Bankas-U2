import { useState } from "react";
// import { writeToLocalStorage } from "../functions/localStorage"; //
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";
import { addNewUser } from "../services/userService";

const AddNewAccount = ({ handlePopUp, setStatus }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleAddAccount = async (event) => {
    event.preventDefault();
    setStatus("loading");
    const newAccount = {
      id: uuidv4(),
      cash: 0,
      name,
      surname,
    };
    let response = await addNewUser(newAccount);
    if (response.ok) {
      handlePopUp(true, "create");
      setStatus("success");
    } else {
      alert("Error adding user");
      setStatus("error");
    }
    setName("");
    setSurname("");
  };

  return (
    <form className="addToList" onSubmit={handleAddAccount}>
      <input
        type="text"
        name="name"
        placeholder="Vardas"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        name="surname"
        placeholder="Pavardė"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <Button disabled={!name || !surname} label="Pridėti" type="submit" />
    </form>
  );
};

export default AddNewAccount;
