const _ = require("lodash");
const baseService = require("../core/baseService");
const { User } = require("../database/mongo/models");
const { roles } = require("../core/authorization/accessList");
const confirmMailService = require("./ConfirmMailService");
const delay = 30 * 1000;
const expiration = 5 * 60 * 1000;

class AuthenticationService extends baseService {
  async login(data) {
    const user = await User.getOne(
      { email: data.username },
      { lean: true, fields: { researches: 0 } }
    );
    if (!user) {
      throw new this.NotFoundError("wrongUsernameOrPassword");
    }
    if (!(await this.crypto.compareHash(data.password, user.password))) {
      throw new this.NotFoundError("wrongUsernameOrPassword");
    }
    return this._getUserResponse(user);
  }

  async register(data, files) {
    let existUser = await User.exists({ email: data.email });
    if (existUser) {
      throw new this.ValidationError("This email is used");
    }
    existUser = await User.exists({ mobile: data.mobile });
    if (existUser) {
      throw new this.ValidationError("This mobile is used");
    }
    if (files && files.image) {
      const [image] = await this.storage.save(files.image);
      data.image = image;
    }
    data.password = this.crypto.createHash(data.password);
    data.roles = [roles.user];
    const user = await User.create(data);

    const confirmToken = await this.crypto.createJwtTokenWithExpiration(
      {
        sub: user._id.toString(),
        roles: user.roles,
      },
      "confirmationKey",
      72000000
    );
    confirmMailService.sendMail({ to: user.email, token: confirmToken });
    return this._getUserResponse(user.toObject());
  }

  async verifyEmail({ token }) {
    const data = await this.crypto.verifyJwtToken(token, "confirmationKey");
    if (!data) {
      throw new this.ValidationError("Invalid Token");
    }
    const user = await User.getById(data.sub);
    if (!user) {
      throw this.NotFoundError("user not found");
    }
    user.is_email_verified = true;

    return user.save();
  }

  async resetPassword({ email }) {
    const user = await User.getOne({ email: email });
    if (!user) {
      throw new this.NotFoundError("User not found");
    }

    if (!user.is_email_verified) {
      throw new this.ValidationError("This email is not verified");
    }

    const elapsedTime = Date.now() - (user.verify_token.token_time || 0);
    if (elapsedTime < delay) {
      return;
    }
    const token = this.crypto.generateRandomNumber();
    const tokenTime = Date.now();
    const tokenExpiration = Date.now() + expiration;
    user.verify_token = {
      token,
      token_time: tokenTime,
      token_expiration: tokenExpiration,
    };
    await user.save();
    confirmMailService.sendResetPassword({
      to: user.email,
      token,
      id: user._id,
    });
    return { _id: user._id };
  }

  async verifyResetPassword({ id, token }) {
    const user = await User.getById(id);
    if (!user) {
      throw new this.ValidationError("There is no user this id");
    }
    if (user.verify_token.token !== token) {
      throw new this.ValidationError("Wrong Token");
    }
    user.verify_token = {};
    user.save();
    return this._getUserResponse(user.toObject());
  }

  async _getUserResponse(user) {
    return this.crypto
      .createJwtToken(
        {
          sub: user._id.toString(),
          roles: user.roles,
        },
        "key"
      )
      .then((token) => {
        return {
          token,
          user: _.omit(user, ["password", "__v", "updated_at", "created_at"]),
        };
      });
  }
}

module.exports = new AuthenticationService();
