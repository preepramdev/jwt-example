const users = [
    { id: 1, username: 'john', password: 'password123', role: 'admin' },
    { id: 2, username: 'jane', password: 'mypassword', role: 'user' },
  ];
  
  const findUserByUsername = (username) => {
    return users.find(user => user.username === username);
  };
  
  module.exports = { users, findUserByUsername };