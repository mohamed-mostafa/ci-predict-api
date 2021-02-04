const API_NAME = "Bl-Wahda";

module.exports = {
  api: {
    name: API_NAME,
    version: "1.0",
    host: "localhost",
    port: process.env.PORT || 8081,
    contextStoreName: "api",
  },
  common: {
    pageSize: 10,
    maxPageSize: 100,
  },
  locales: {
    dataPath: `${__dirname}/locales`,
    dataExtension: ".json",
    supportedLocales: ["en", "ar", "all", "_"],
  },
  storage: {
    accessKey: "6QPE347OHBBGIMG6XPAY",
    secretKey: "1lj2OhahQFhBG0AqpeKCSIsiwSiVo9o4CWb+/y00ODA",
    baseUrl: "digitaloceanspaces.com",
    bucket: "bl-wahda",
    region: "fra1",
    folder: "dev",
  },
  authentication: {
    key:
      "thisIsVerySecretKeyNoOneCanImagineThatThisIsTheKeyAndEvenIfHeImaginedThatThisIsTheKeyHeWillNotExpectThatIWroteThatHeImaginedThatIsTheKey",
  },
  mongo: {
    url: `mongodb://pet:MkK8p778qY3zLs5W@165.22.69.43:27018/petdev?authSource=petdev&readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
  },
};
