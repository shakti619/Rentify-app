import bcrypt from "bcryptjs";

const users = [
  {
    name: "seller User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isSeller: true,
  },
  {
    name: "buyer user",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isSeller: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
