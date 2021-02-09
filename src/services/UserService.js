const baseService = require("../core/baseService");
const { User } = require("../database/mongo/models");

class UserService extends baseService {
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
    return User.getAll(query, nParams, pagination);
  }

  async getOne(id) {
    const research = await User.getById(id);
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    return research;
  }

  async getInvestigators(id) {
    const research = await User.getById(id, { lean: true });
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    const investigators = research.investigators;
    return investigators;
  }

  async update({ data, id, files }) {
    const research = await User.getById(id);
    if (!research) {
      throw new this.NotFoundError(`there is no research with id ${id}`);
    }
    if (files) {
      if (files.image && research.image) {
        await this.storage.delete(research.image);
      }
      if (files.image) data.image = (await this.storage.save(files.image))[0];
    }
    return User.updateById(id, data, { new: true, lean: true });
  }

  async participate({ userId, researchId }) {
    const user = await User.getById(userId);
    if (!user) {
      throw new this.NotFoundError(`there is no user with id ${userId}`);
    }
    return User.updateById(
      userId,
      { $push: { researches: { id: researchId, parameters: {} } } },
      { new: true, lean: true }
    );
  }

  async create({ data, files }) {
    const existResearch = await User.getOne({ name: data.name });
    if (existResearch) {
      throw new this.ValidationError("Research is already registered");
    }
    if (files && files.image) {
      data.image = (await this.storage.save(files.image))[0];
    }
    const research = await User.create(data);
    return research;
  }

  async parameters(researchId, userId) {
    const user = await User.getById(userId);
    if (!user) {
      throw new this.NotFoundError(`there is no user with id ${userId}`);
    }
    const parameters = user.researches.find((research) => {
      return research.id.toString() === researchId;
    });
    if (!parameters) {
      throw new this.NotFoundError(
        `there is no research with id ${researchId}`
      );
    }
    return parameters.parameters;
  }

  async updateParameters(researchId, userId, data) {
    const user = await User.getById(userId);
    if (!user) {
      throw new this.NotFoundError(`there is no user with id ${userId}`);
    }
    user.researches.forEach((element) => {
      if (element.id.toString() === researchId) {
        element.parameters = data;
      }
    });

    return User.updateById(userId, user, { lean: true });
  }
}

module.exports = new UserService();
