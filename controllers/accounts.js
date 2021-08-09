'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/start');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  profile(request, response) {
    const user = accounts.getCurrentUser(request);
    const viewData = {
      title: 'User Profile',
      user : user
    };
    response.render('profile', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/profile');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie('station', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

    getCurrentUser(request) {
    const userEmail = request.cookies.station;
     if(userEmail) {
      return userstore.getUserByEmail(userEmail);
      } else {
      return null;
      }
     },
  
  editUser(request, response) {
    const userId = request.params.id; 
    const user = userstore.getUserById(userId);
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email
    };
    userstore.updateUser(user, newUser);
    response.redirect('/profile');
    }
  
};

  module.exports = accounts;
