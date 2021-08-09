"use strict";

const logger = require("../utils/logger");
const userstore = require("../models/user-store");

const user = {
  index(request, response) {
    const userId = request.params.id;
    logger.debug(`Editing User ${userId}`);
    
    const viewData = {
      title: "Profile",
      user: userstore.getUserById(userId)
    };
    response.render("profile", viewData);
  },

  update(request, response) {
    const userId = request.params.id;
    const user = userstore.getUserById(userId);
    
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email
    };
    console.log(`Updating User ${userId}`);
    userstore.updateUser(user, newUser);
    response.redirect("/profile/");
  }
};

module.exports = user;