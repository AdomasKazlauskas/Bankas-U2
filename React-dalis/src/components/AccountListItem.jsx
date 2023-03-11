import { useState } from "react";
import { writeToLocalStorage } from "../functions/localStorage";
import Button from "./Button";

const AccountListItem = ({ account, accounts, setAccounts, handlePopUp }) => {
  const [amount, setAmount] = useState("");

  const handleAccountDelete = (id) => {
    const updatedAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(updatedAccounts);
    writeToLocalStorage("accounts", updatedAccounts);
    handlePopUp(true, "delete");
  };

  const handleCashDeposit = (id, amount) => {
    if (amount < 0) {
      alert("neleisiu");
      return;
    }
    const updatedAccounts = accounts.map((account) =>
      account.id === id ? { ...account, cash: account.cash + amount } : account
    );
    setAccounts(updatedAccounts);
    writeToLocalStorage("accounts", updatedAccounts);
    setAmount("");
  };

  const handleCashWithdrawal = (id, amount) => {
    if (amount < 0 || amount > account.cash) {
      alert("I'm sorry Dave, I'm afraid I can't do that");
      return;
    }
    const updatedAccounts = accounts.map((account) =>
      account.id === id ? { ...account, cash: account.cash - amount } : account
    );
    setAccounts(updatedAccounts);
    writeToLocalStorage("accounts", updatedAccounts);
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
