//  inside of this file, we are going to create helper functions, that will help us manage users , joigning in signing out, removing users,
// getting users, adding users , everything that has to do users

const users = [];

// id of the user or the id of the socket instance
const addUser = ({ id, name, room }) => {
  // if for example the use enter Javascript Mastery , it will be => javascriptmastery
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.name === name && user.room === room
  );
  if (existingUser) {
    return { error: "Usernameis taken" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
const getUser = (id) => users.find((user) => user.id === id);
// get users in a specific room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
