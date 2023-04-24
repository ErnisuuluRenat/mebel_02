module.exports = {apps : [
  {
    name: "vite-project",
    script: "serve",
    args: "vite build && serve -s build -l 3000",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    cwd: "/Programmer/clientSide/mebel_02",
    env: {
      NODE_ENV: "production",
      HOST: "46.8.43.42",
      PORT: 3000
    }
  }
]}
    