const baseService = require("../core/baseService");
const { Research } = require("../database/mongo/models");

class ResearchService extends baseService {
  async getAll(filters, params, pagination = false) {
    const nParams = params;
    const query = {};

    if (filters.app_status) {
      query.app_status = { $in: filters.app_status.split(",") };
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: "i" } },
        { _id: { $regex: filters.search, $options: "i" } },
      ];
    }

    if (filters.role) {
      query.roles = filters.role;
    }
    if (nParams.pagination) {
      pagination = this.utils.parseBoolean(nParams.pagination);
    }

    nParams.lean = true;
    return Research.getAll(query, nParams, pagination);
  }

  async getOne(id) {
    const research = await Research.getById(id, {
      fields: { commonParameters: 0 },
    });
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    return research;
  }

  async getInvestigators(id) {
    const research = await Research.getById(id, { lean: true });
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    const investigators = research.investigators;
    return investigators;
  }

  async update({ data, id, files }) {
    const research = await Research.getById(id);
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    if (files) {
      if (files.image && research.image) {
        await this.storage.delete(research.image);
      }
      if (files.image) data.image = (await this.storage.save(files.image))[0];
    }
    return Research.updateById(id, data, { new: true, lean: true });
  }

  async participate({ data, researchId }) {
    const research = await Research.getById(researchId);
    if (!research) {
      throw new this.NotFoundError(
        `there is no research with id ${researchId}`
      );
    }
    return Research.updateById(
      researchId,
      { $push: { investigators: data } },
      { new: true, lean: true }
    );
  }

  async create({ data, files }) {
    const existResearch = await Research.getOne({ name: data.name });
    if (existResearch) {
      throw new this.ValidationError("Research is already registered");
    }
    if (files && files.image) {
      data.image = (await this.storage.save(files.image))[0];
    }
    data.commonParameters = {};
    const research = await Research.create(data);
    return research;
  }

  async getParameters(researchId) {
    const research = Research.getById(researchId, {
      fields: { commonParameters: 1 },
    });
    if (!research) {
      throw new this.NotFoundError(
        `there is no research with id ${researchId}`
      );
    }
    return research;
  }
}

module.exports = new ResearchService();
