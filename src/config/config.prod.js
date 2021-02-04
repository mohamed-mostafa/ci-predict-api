const API_NAME = "Authorship";

module.exports = {
  api: {
    name: API_NAME,
    version: "1.0",
    host: "localhost",
    port: process.env.PORT || 8080,
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
    baseUrl: "http://163.172.122.112:5535",
    bucket: "authorship",
    folder: "dev",
  },
  authentication: {
    key:
      "thisIsVerySecretKeyNoOneCanImagineThatThisIsTheKeyAndEvenIfHeImaginedThatThisIsTheKeyHeWillNotExpectThatIWroteThatHeImaginedThatIsTheKey",
  },
  mongo: {
    url: `mongodb://cirank:bs9O6P82TXdXQEZ2RYfEruObogrNn1@mongodb:27017/authorship`,
  },
};
