const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get(
    "/users",
    [requireAuth, requireRoles(["USER"])],
    async (req, res) => {
      res.send(await User.findAll());
    }
  );

  router.get("/users/me", [requireAuth], async (req, res) => {
    res.send(req.user);
  });
};
