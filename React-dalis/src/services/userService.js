const baseURL = "http://localhost:3003";

const fetchUsers = async () => {
  let response = await fetch(baseURL + "/users");
  if (response.status === 200) {
    let data = await response.json();
    return data;
  }
  return [];
};
const addNewUser = async (newAccount) => {
  let response = await fetch(baseURL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAccount),
  });
  return response;
};

const destroyUser = async (id) => {
  let response = await fetch(`${baseURL}/users/${id}`, {
    method: "DELETE",
  });
  return response;
};

const addCash = async (id, cash) => {
  const encodedId = encodeURI(id);
  return await fetch(`${baseURL}/users/${encodedId}/cash`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cash: parseInt(cash) }),
  });
};
const removeCash = async (id, cash) => {
  const encodedId = encodeURI(id);
  return await fetch(`${baseURL}/users/${encodedId}/cash`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cash: -parseInt(cash) }),
  });
};
export default {
  fetchUsers,
  addNewUser,
  destroyUser,
  addCash,
  removeCash,
};
