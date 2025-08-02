module.exports = {
  apps: [
    {
      name: 'portfolio.v2',
      cwd: '/home/ubuntu/portfolio.v2',
      script: 'pnpm',
      args: 'start',
      interpreter: 'none',
      exec_mode: 'cluster',
      watch: true,
      instances: 0,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
