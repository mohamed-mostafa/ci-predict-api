const baseService = require("../core/baseService");
const { User } = require("../database/mongo/models");
const { roles } = require("../core/authorization/accessList");

class AuthenticationService extends baseService {
  async login(data) {
    const existUser = await User.getOne({ email: data.email }, { lean: true });
    if (!existUser) {
      throw new this.NotFoundError("wrongUsernameOrPassword");
    }
    if (!(await this.crypto.compareHash(data.password, existUser.password))) {
      throw new this.NotFoundError("wrongUsernameOrPassword");
    }
    delete existUser.password;
    const token = await this.crypto.createJwtToken({
      sub: existUser._id.toString(),
      roles: existUser.roles,
    });
    return { user: existUser, token };
  }

  async register(data, files) {
    let existUser = await User.exists({ email: data.email });
    if (existUser) {
      throw new this.ValidationError("userWithThisEmailExists");
    }
    existUser = await User.exists({ mobile: data.mobile });
    if (existUser) {
      throw new this.ValidationError("userWithThisMobileExists");
    }
    if (files && files.image) {
      const [image] = await this.storage.save(files.image);
      data.image = image;
    }
    data.password = await this.crypto.createHash(data.password);
    data.roles = [roles.user];
    const user = await User.create(data);
    const token = await this.crypto.createJwtToken({
      sub: user._id.toString(),
      roles: user.roles,
    });
    return { user: user.toObject(), token };
  }
}

module.exports = new AuthenticationService();
