const aclResources = {
  AUTHENTICATION: 'authentication'
};

const roles = {
  admin: "admin",
  user: "user",
};

const rolesEnum = ["admin", "user"];

const aclRoles = {
  admin: {

  },
  user: {

  },
  public: {
    [aclResources.AUTHENTICATION]: { "create:any": ["*"] },
  },
};

module.exports = {
  aclResources,
  aclRoles,
  rolesEnum,
  roles,
};
