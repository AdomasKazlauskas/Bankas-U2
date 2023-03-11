import oaklogo from "../assets/oaklogo.png";

const Header = ({ totalAccounts, totalAmount }) => {
  return (
    <header className="header-container">
      <div className="bank-name">
        <img src={oaklogo} alt="oaklogo" />
        <h1>OAK CAPITAL LTD</h1>
      </div>
      <div className="header-info">
        <div>Aktyvių klientų skaičius: {totalAccounts}</div>
        <div>Saugoma pinigų suma: {totalAmount.toFixed(2)} €</div>
      </div>
    </header>
  );
};

export default Header;
