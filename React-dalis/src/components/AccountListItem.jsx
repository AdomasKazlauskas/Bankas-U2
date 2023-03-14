import { useState } from "react";
import { addCash, destroyUser, removeCash } from "../services/userService";
import Button from "./Button";

const AccountListItem = ({ account, handlePopUp, setStatus }) => {
  const [amount, setAmount] = useState("");

  const handleAccountDelete = async (id) => {
    setStatus("loading");
    let response = await destroyUser(id);

    if (response.ok) {
      handlePopUp(true, "delete");
      setStatus("success");
    } else {
      setStatus("error");
      alert("Error deleting user");
    }
  };

  const handleCashDeposit = async (id, amount) => {
    setStatus("loading");
    if (amount < 0) {
      alert("neleisiu");
      return;
    }
    let response = await addCash(id, amount);
    if (response.ok) {
      // Refresh the user list
      setStatus("success");
    } else {
      //handle errors
      setStatus("error");
      alert("Error updating balance");
    }
    setAmount("");
  };

  const handleCashWithdrawal = async (id, amount) => {
    setStatus("loading");
    if (amount < 0 || amount > account.cash) {
      alert("I'm sorry Dave, I'm afraid I can't do that");
      return;
    }
    let response = await removeCash(id, amount);
    if (response.ok) {
      // Refresh the user list
      setStatus("success");
    } else {
      // Handle errors
      setStatus("error");
      alert("Error updating balance");
    }

    // const updatedAccounts = accounts.map((account) =>
    //   account.id === id ? { ...account, cash: account.cash - amount } : account
    // );
    // setAccounts(updatedAccounts);
    // writeToLocalStorage("accounts", updatedAccounts);
    setAmount("");
  };

  return (
    <tr>
      <td>{account.name}</td>
      <td>{account.surname}</td>
      <td>
        <div className="cashAlign">{account.cash.toFixed(2)} € </div>
      </td>
      <td>
        <input
          className="cashInput"
          min={0}
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
        <div className="itemButtonGap">
          <Button
            onClick={() => handleCashDeposit(account.id, amount)}
            label="pridėti lėšų"
          />
          <Button
            onClick={() => handleCashWithdrawal(account.id, amount)}
            label="nuskaičiuoti lėšas"
          />
        </div>
      </td>
      <td>
        <Button
          label="Ištrinti"
          onClick={() => handleAccountDelete(account.id)}
          disabled={account.cash > 0}
        />
      </td>
    </tr>
  );
};

export default AccountListItem;
