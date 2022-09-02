import bcrypt from "bcrypt";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isadmin: true,
  },
  {
    name: "Manthan",
    email: "Manthan@gamil.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bipul",
    email: "Bipul@mac.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
