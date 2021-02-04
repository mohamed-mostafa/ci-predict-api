const { aclResources } = require("../core/authorization/accessList");
const BaseController = require("../core/baseController");
const { userSchema } = require("../core/validation/schemas");
const AuthenticationService = require("../services/AuthenticationService");

const multipart = {
  fileSize: 1 * 1024 * 1024,
  fields: {
    image: { maxCount: 1, ext: ["jpg", "jpeg", "png"] },
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
      ],
    });
  }

  async login(ctx) {
    await this.authorize(ctx, ["createAny"]);
    console.log(ctx.request.body);
    await this.validate(
      {
        type: "object",
        properties: {
          password: { type: "string", minLength: 6, maxLength: 64 },
          email: { type: "string", format: "email" },
        },
        required: ["email", "password"],
      },
      ctx.request.body
    );
    const user = await this.service.login(ctx.request.body);
    ctx.body = user;
  }

  async register(ctx) {
    await this.authorize(ctx, ["createAny"]);
    const data = ctx.request.body;
    await this.validate(userSchema, data);

    const user = await this.service.register(data, ctx.request.files);
    ctx.body = user;
  }
}

module.exports = AuthenticationController;
