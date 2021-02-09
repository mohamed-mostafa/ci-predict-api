const { aclResources } = require("../core/authorization/accessList");
const BaseController = require("../core/baseController");
const { researchSchema } = require("../core/validation/schemas");
const ResearchService = require("../services/ResearchService");

const multipart = {
  fileSize: 1 * 1024 * 1024,
  fields: {
    image: { maxCount: 1, ext: ["jpg", "jpeg", "png"] },
  },
};

class ResearchController extends BaseController {
  constructor() {
    super({
      name: aclResources.RESEARCH,
      path: "/researches",
      service: ResearchService,
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
        {
          method: "GET",
          path: "/:id/parameters",
          handler: "getParameters",
        },
        {
          method: "PUT",
          path: "/:id/parameters",
          handler: "updateParameters",
        },
      ],
    });
  }

  async create(ctx) {
    await this.authorize(ctx, ["createAny"]);
    await this.validate(researchSchema, ctx.request.body);
    ctx.body = await this.service.create({
      data: ctx.request.body,
      files: ctx.request.files,
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
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.participate({
      data: ctx.request.body,
      researchId: ctx.params.id,
    });
  }

  async getParameters(ctx) {
    await this.authorize(ctx, ["readAny"]);
    ctx.body = await this.service.getParameters(ctx.params.id);
  }

  async update(ctx) {}

  async updateParameters(ctx) {
    await this.authorize(ctx, ["updateAny"]);
    ctx.body = await this.service.updateParameters({
      data: ctx.request.body,
      id: ctx.params.id,
    });
  }
}

module.exports = ResearchController;
