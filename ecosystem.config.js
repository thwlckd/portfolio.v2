module.exports = {
  apps: [
    {
      name: 'portfolio.v2',
      cwd: '/home/ubuntu/portfolio.v2',
      script: 'pnpm',
      args: 'start',
      interpreter: 'none',
      watch: false,
      exec_mode: 'cluster',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
