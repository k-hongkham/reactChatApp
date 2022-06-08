const usersRouter = require("express").Router();

const { createUser, getUserByUsername } = require("../db/models/user");
const jwt = require("jsonwebtoken");
const models = require("../db/models");
const { JWT_SECRET } = process.env;

usersRouter.use("/", (req, res, next) => {
  console.log("Request to /users is being made.");
  next();
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    console.log("USER:", user);

    if (user) {
      console.log("LOGIN SUCCESS");
      const token = jwt.sign(
        { id: user.id, username: username },
        porocess.env.JWT_SECRET,
        { expiresIn: "4w" }
      );
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

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      res.status(409);
      next({
        name: "UserAlreadyExistsError",
        message: "Username is already taken",
      });
    } else {
      const user = await createUser({
        username,
        password,
      });
      console.log(user)
      const token = jwt.sign({
          id: user.id,
          username
      }, process.env.JWT_SECRET, 
      {
          expiresIn: '4w'
      }
      )
      res,=.send({
          message: `Thanks for registering, ${username}.`, token
      })
    }
  } catch ({name, message}) {
      res.status(404);
      next({name, message})
  }
});

usersRouter.get('/me', requireUser, (req,res, next) => {
    res.send(req.user)
})
models.exports = usersRouter;
