const getTotalCash = (accounts) =>
  accounts.reduce((sum, account) => sum + account.cash, 0);

export default getTotalCash;
