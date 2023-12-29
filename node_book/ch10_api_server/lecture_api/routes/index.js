const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../middlewares");
const { createDomain, renderLogin } = require("../controllers");

const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

// router.

module.exports = router;
