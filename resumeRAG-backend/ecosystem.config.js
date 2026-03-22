module.exports = {
  apps: [{
    name: "resumerag-backend",
    script: "./src/app.js",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}
