module.exports = {
      apps: [
        {
          name: "vite-project",
          script: "yarn",
          args: "vite build && serve -s build -l 3000",
          instances: 1,
          autorestart: true,
          watch: false,
          max_memory_restart: "1G",
          env: {
            NODE_ENV: "production",
          },
        },
      ],
    };
       