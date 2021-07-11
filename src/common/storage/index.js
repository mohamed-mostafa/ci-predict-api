const _ = require("lodash");
const path = require("path");
const config = require("../../config");
const AWS = require("aws-sdk");
const uniqid = require("uniqid");
const mime = require("mime-types");
const owncloud = require("js-owncloud-client");

class Storage {
  constructor() {
    this.oc = new owncloud("localhost:8000");

    this.oc
      .login("admin", "admin")
      .then((status) => {
        console.log(status, "here");
      })
      .catch((error) => {
        console.log(error, "herewww");
      });
  }
}

module.exports = new Storage();
