const { aclResources } = require("../core/authorization/accessList");
const BaseController = require("../core/baseController");
const { authSchema } = require("../core/validation/schemas");
const AuthenticationService = require("../services/AuthenticationService");

const multipart = {
  fileSize: 1 * 1024 * 1024,
  fields: {
    image: { maxCount: 1, ext: ["jpg", "jpeg", "png", "PNG"] },
  },
};

class AuthenticationController extends BaseController {
  constructor() {
    super({
      name: aclResources.AUTHENTICATION,
      path: "/auth/local",
      service: AuthenticationService,
      routes: [
        { method: "POST", path: "/login", handler: "login" },
        { method: "POST", path: "/register", handler: "register", multipart },
        { method: "POST", path: "/verify", handler: "verifyEmail" },
        { method: "POST", path: "/reset-password", handler: "resetPassword" },
        {
          method: "POST",
          path: "/verify-reset-password",
          handler: "verifyResetPassword",
        },
      ],
    });
  }

  async login(ctx) {
    await this.authorize(ctx, ["createAny"]);
    const data = ctx.request.body;
    await this.validate(authSchema.login, data);
    ctx.body = await this.service.login(ctx.request.body);
  }

  async register(ctx) {
    await this.authorize(ctx, ["createAny"]);
    const data = ctx.request.body;
    await this.validate(authSchema.register, data);
    ctx.body = await this.service.register(data, ctx.request.files);
  }

  async verifyEmail(ctx) {
    ctx.body = await this.service.verifyEmail(ctx.request.body);
  }

  async resetPassword(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.resetPassword(ctx.request.body);
  }

  async verifyResetPassword(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.verifyResetPassword(ctx.request.body);
  }
}

module.exports = AuthenticationController;
