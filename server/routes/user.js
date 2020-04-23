const router = require("express").Router();
const users = require("../controllers/users");

router.get("/", users.getUsers);
router.get("/single/:id", users.getUser);
router.put("/single/:id", users.updateUser);
router.delete("/single/:id", users.deleteUser);
router.post("/single/:id", users.signup);
router.login("/single/:id", users.login);
router.me("/single/:id", users.me);

module.exports = router;
