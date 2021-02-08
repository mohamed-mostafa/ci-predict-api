const { aclResources } = require("../core/authorization/accessList");
const BaseController = require("../core/baseController");
const { researchSchema } = require("../core/validation/schemas");
const UserService = require("../services/UserService");

const multipart = {
  fileSize: 1 * 1024 * 1024,
  fields: {
    image: { maxCount: 1, ext: ["jpg", "jpeg", "png"] },
  },
};

class UserController extends BaseController {
  constructor() {
    super({
      name: aclResources.USER,
      path: "/researches",
      service: UserService,
      routes: [
        { method: "POST", path: "/", handler: "create", multipart },
        { method: "GET", path: "/", handler: "get" },
        { method: "PUT", path: "/:id", handler: "update", multipart },
        { method: "GET", path: "/:id", handler: "getOne" },
        { method: "PUT", path: "/:id/participate", handler: "participate" },
        {
          method: "GET",
          path: "/:id/investigators",
          handler: "getInvestigators",
        },
      ],
    });
  }

  async get(ctx) {
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.getAll(ctx.request.query, ctx.request.query);
  }

  async getOne(ctx) {
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.getOne(ctx.params.id);
  }

  async getInvestigators(ctx) {
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.getInvestigators(ctx.params.id);
  }

  async participate(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.participate({
      userId: ctx._locals.user._id,
      researchId: ctx.request.body.id,
    });
  }

  async update(ctx) {}
}

module.exports = UserController;
