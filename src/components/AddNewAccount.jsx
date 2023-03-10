import { useState } from "react";
import { writeToLocalStorage } from "../functions/localStorage";
import Button from "./Button";
import { v4 as uuidv4 } from "uuid";

const AddNewAccount = ({ accounts, setAccounts, handlePopUp }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleAddAccount = (event) => {
    event.preventDefault();
    const newAccount = {
      id: uuidv4(),
      cash: 0,
      name,
      surname,
    };
    const updatedAccounts = [...accounts, newAccount];

    setAccounts(updatedAccounts);
    writeToLocalStorage("accounts", updatedAccounts);

    setName("");
    setSurname("");
    handlePopUp(true, "create");
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
