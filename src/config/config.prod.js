const API_NAME = "Authorship";

module.exports = {
  api: {
    name: API_NAME,
    version: "1.0",
    host: "localhost",
    port: process.env.PORT || 4200,
    contextStoreName: "api",
  },
  common: {
    pageSize: 10,
    maxPageSize: 100,
  },
  locales: {
    dataPath: `${__dirname}/locales`,
    dataExtension: ".json",
    supportedLocales: ["en", "ar", "_"],
  },
  storage: {
    accessKey: "4DBFU253xwQQMV2u",
    secretKey: "fr7MRU3RbxBtX5zP",
    baseUrl: "s3server:7000",
    bucket: "authorship",
    folder: "dev",
  },
  authentication: {
    key:
      "thisIsVerySecretKeyNoOneCanImagineThatThisIsTheKeyAndEvenIfHeImaginedThatThisIsTheKeyHeWillNotExpectThatIWroteThatHeImaginedThatIsTheKey",
  },
  mongo: {
    url: `mongodb://authorship:1klzbuneIKOHXrRGsR5Ed5FAvsqMsg@mongodb:27017/authorship`,
  },
};
