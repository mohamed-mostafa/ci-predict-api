const aclResources = {
  AUTHENTICATION: "authentication",
  RESEARCH: "research",
};

const roles = {
  admin: "admin",
  user: "user",
};

const rolesEnum = ["admin", "user"];

const aclRoles = {
  admin: {
    [aclResources.RESEARCH]: {
      "create:any": ["*"],
      "read:any": ["*"],
      "update:any": ["*"],
    },
  },
  user: {
    [aclResources.RESEARCH]: {
      "read:any": ["*"],
      "update:any": ["investigators", "commonParameters"],
    },
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
