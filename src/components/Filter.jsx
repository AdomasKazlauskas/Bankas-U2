import Button from "./Button";

const FilterButton = ({ accounts, setDisplayedAccounts }) => {
  const handleFilterWithCash = () => {
    const accountsWithCash = accounts.filter((account) => account.cash > 0);
    setDisplayedAccounts(accountsWithCash);
  };

  const handleFilterWithoutCash = () => {
    const accountsWithoutCash = accounts.filter(
      (account) => account.cash === 0
    );
    setDisplayedAccounts(accountsWithoutCash);
  };

  const handleFilterClearing = () => {
    setDisplayedAccounts(accounts);
  };

  return (
    <div className="filter-Options">
      <Button onClick={handleFilterWithCash} label="Pilnos sąskaitos" />
      <Button onClick={handleFilterWithoutCash} label="Tuščios sąskaitos" />
      <Button onClick={handleFilterClearing} label="Visos sąskaitos" />
    </div>
  );
};

export default FilterButton;
