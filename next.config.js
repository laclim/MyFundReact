module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  // env: {
  //   baseURL: "http://localhost:3000/api/v1/",
  // },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
    baseURL: process.env.BASE_URL,
  },
};
