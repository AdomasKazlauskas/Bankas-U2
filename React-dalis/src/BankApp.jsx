import { useEffect, useState } from "react";
import "./BankApp.scss";
import AddNewAccount from "./components/AddNewAccount";
import AccountListItem from "./components/AccountListItem";
import Header from "./components/Header";
import getTotalCash from "./functions/getTotalCash";
import sortClients from "./functions/sortClients";
import PopUp from "./components/PopUp";
import Filter from "./components/Filter";
import TableTop from "./components/TableTop";
import { fetchUsers } from "./services/userService";
// import userService from "./services/userService";

function Frame() {
  const [accounts, setAccounts] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState();
  const [displayedAccounts, setDisplayedAccounts] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchAccounts = async () => {
    const accounts = await fetchUsers();
    if (!accounts.length) {
      alert("No users found");
    }
    setAccounts(accounts);
  };

  useEffect(() => {
    if (status === "idle" || status === "success") {
      fetchAccounts();
    }
  }, [status]);

  useEffect(() => {
    const sortedAccounts = sortClients(accounts);
    setDisplayedAccounts(sortedAccounts);
  }, [accounts]);

  const handlePopUp = (isOpen, type) => {
    setShowPopUp(isOpen);
    setPopUpType(type);
  };

  // if (status === "loading") {
  //   return <div style={{ color: "white" }}>loading...</div>;
  // }

  return (
    <div>
      {showPopUp && <PopUp setShowPopUp={setShowPopUp} type={popUpType} />}
      <Header
        totalAccounts={accounts.length}
        totalAmount={getTotalCash(accounts)}
      />
      <div className="frame">
        <AddNewAccount
          accounts={accounts}
          handlePopUp={handlePopUp}
          setStatus={setStatus}
        />
        <Filter
          accounts={accounts}
          setDisplayedAccounts={setDisplayedAccounts}
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
                handlePopUp={handlePopUp}
                setStatus={setStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Frame;
