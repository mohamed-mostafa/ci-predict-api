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
    baseUrl: "http://162.240.10.41:7000",
    bucket: "authorship",
    folder: "dev",
  },
  authentication: {
    key:
      "thisIsVerySecretKeyNoOneCanImagineThatThisIsTheKeyAndEvenIfHeImaginedThatThisIsTheKeyHeWillNotExpectThatIWroteThatHeImaginedThatIsTheKey",
  },
  mongo: {
    url: `mongodb://authorship:1klzbuneIKOHXrRGsR5Ed5FAvsqMsg@localhost:27017/authorship`,
  },
  // mongo: {
  //   url: `mongodb://authorship:bs9O6P82TXdXQEZ2RYfEruObogrNn1@163.172.122.112:5555/authorship`,
  // },
};
