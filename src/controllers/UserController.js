const { aclResources } = require("../core/authorization/accessList");
const BaseController = require("../core/baseController");
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
      path: "/users",
      service: UserService,
      routes: [
        { method: "PUT", path: "/:id/participate", handler: "participate" },
        { method: "GET", path: "/:id/parameters", handler: "parameters" },
        {
          method: "PUT",
          path: "/:id/parameters",
          handler: "updateParameters",
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

  async participate(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.participate({
      userId: ctx._locals.user._id,
      researchId: ctx.request.body.researchId,
    });
  }

  async parameters(ctx) {
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.parameters(
      ctx.params.id,
      ctx._locals.user._id
    );
  }

  async update(ctx) {}

  async updateParameters(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.updateParameters(
      ctx.params.id,
      ctx._locals.user._id,
      ctx.request.body
    );
  }
}

module.exports = UserController;
