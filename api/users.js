const usersRouter = require("express").Router();

const {
  createUser,
  getUserByUsername,
  getUserByEmail,
  registerNewUser,
} = require("../db/models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { requireUser } = require("./utils");

usersRouter.use("/", (req, res, next) => {
  console.log("Request to /users is being made.");
  next();
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    console.log("USER:", user);

    if (user && password) {
      console.log("LOGIN SUCCESS");
      const token = jwt.sign(
        { id: user.id, username: username },
        process.env.JWT_SECRET,
        { expiresIn: "4w" }
      );
      res.send({ message: `Welcome Back, ${user.username}.`, token: token });
    } else {
      console.log("LOGIN FAILED");
      res.status(409);
      next({
        name: "Bad Login/Password",
        message: "Login error: you must supply a valid login/password",
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.post("/registerNewUser", async (req, res, next) => {
  console.log("REQUEST TO REGISTER", req.body);
  const { username, password, email } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(409);
      next({
        name: "UserAlreadyExistsError",
        message: "Username is already taken",
      });
    }
    const _email = await getUserByEmail(email);
    if (_email) {
      res.status(409);
      next({
        name: "EmailAlreadyInUseError",
        message: "Email is already registered",
      });
    } else {
      const user = await createUser({
        username,
        password,
        email,
      });
      console.log(user);
      const token = jwt.sign(
        {
          id: user.id,
          username,
          email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "4w",
        }
      );
      res.send({
        message: `Thanks for registering, ${username}.`,
        token,
      });
    }
  } catch ({ name, message }) {
    res.status(404);
    next({ name, message });
  }
});

usersRouter.get("/me", requireUser, (req, res, next) => {
  res.send(req.user);
});
module.exports = usersRouter;
