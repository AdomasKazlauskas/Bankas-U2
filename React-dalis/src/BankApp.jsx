import { useEffect, useState } from "react";
import "./BankApp.scss";
import AddNewAccount from "./components/AddNewAccount";
import AccountListItem from "./components/AccountListItem";
import Header from "./components/Header";
import getTotalCash from "./functions/getTotalCash";
import sortClients from "./functions/sortClients";
import PopUp from "./components/PopUp";
import { readFromLocalStorage } from "./functions/localStorage";
import Filter from "./components/Filter";
import TableTop from "./components/TableTop";

function Frame() {
  const [accounts, setAccounts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState();
  const [displayedAccounts, setDisplayedAccounts] = useState([]);

  useEffect(() => {
    const accountFromStorage = readFromLocalStorage("accounts");
    const sortedAccounts = sortClients(accountFromStorage);
    setAccounts(accountFromStorage);
    setDisplayedAccounts(sortedAccounts);
  }, []);

  useEffect(() => {
    const sortedAccounts = sortClients(accounts);
    setDisplayedAccounts(sortedAccounts);
  }, [accounts]);

  const handlePopUp = (isOpen, type) => {
    setShowPopUp(isOpen);
    setPopUpType(type);
  };

  return (
    <div>
      {showPopUp && <PopUp setShowPopUp={setShowPopUp} type={popUpType} />}
      <Header
        totalAccounts={accounts.length}
        totalAmount={getTotalCash(accounts)}
      />
      <div className="frame">
        <AddNewAccount
          setAccounts={setAccounts}
          accounts={accounts}
          handlePopUp={handlePopUp}
        />
        <Filter
          setDisplayedAccounts={setDisplayedAccounts}
          accounts={accounts}
        />
        <table>
          <thead>
            <TableTop />
          </thead>
          <tbody>
            {displayedAccounts.map((account) => (
              <AccountListItem
                key={account.id}
                accounts={accounts}
                account={account}
                setAccounts={setAccounts}
                handlePopUp={handlePopUp}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Frame;
