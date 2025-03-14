const { Router } = require("express");
const requireRoles = require("../middlewares/require-role");
const requireAuth = require("../middlewares/require-auth");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const jwt = require("jsonwebtoken");

/**
 * @param {Express.Application} app
 * @param {Router} router
 */
module.exports = function (app, router) {
  router.get("/user/:id", [requireAuth], async (req, res) => {
    const token = jwt.decode(req.headers.authorization);
    const userId = token.id;
    res.send(await Reservation.findAll({ where: { user_id: token.id } }));
  });
};
