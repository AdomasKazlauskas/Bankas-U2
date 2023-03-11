const sortClients = (accounts) =>
  accounts.sort((a, b) => a.surname.localeCompare(b.surname));

export default sortClients;
