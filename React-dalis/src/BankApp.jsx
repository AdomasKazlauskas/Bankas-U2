import { useEffect, useState } from "react";
import "./BankApp.scss";
import AddNewAccount from "./components/AddNewAccount";
import AccountListItem from "./components/AccountListItem";
import Header from "./components/Header";
import getTotalCash from "./functions/getTotalCash";
import sortClients from "./functions/sortClients";
import PopUp from "./components/PopUp";
// import { readFromLocalStorage } from "./functions/localStorage";
import Filter from "./components/Filter";
import TableTop from "./components/TableTop";
import userService from "./services/userService";

function Frame() {
  const [accounts, setAccounts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState();
  const [displayedAccounts, setDisplayedAccounts] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    // const accountFromStorage = readFromLocalStorage("accounts");
    // setAccounts(accountFromStorage);

    const fetchUsers = async () => {
      const users = await userService.fetchUsers();
      const sortedAccounts = sortClients(users);
      if (!users) {
        alert("No users found");
      }
      updateAccountsLists(users);
      setDisplayedAccounts(sortedAccounts);
    };
    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    const sortedAccounts = sortClients(accounts);
    setDisplayedAccounts(sortedAccounts);
  }, [accounts]);

  const updateAccountsLists = (accounts) => {
    setAccounts(accounts);
    setDisplayedAccounts(accounts);
  };

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
                setRefresh={setRefresh}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Frame;
