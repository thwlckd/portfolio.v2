module.exports = {
  apps: [
    {
      name: 'portfolio.v2',
      cwd: '/home/ubuntu/portfolio.v2',
      script: 'pnpm',
      args: 'start',
      watch: false,
      autorestart: true,
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
