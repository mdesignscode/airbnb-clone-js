module.exports = {
  apps: [{
    script: 'npm start',
  }],

  deploy: {
    production: {
      key: 'hbnb-server-keys.pem',
      user: 'ubuntu',
      host: '13.53.139.81',
      ref: 'origin/main',
      repo: 'https://github.com/mdesignscode/airbnb-clone-js',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'sorce ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
