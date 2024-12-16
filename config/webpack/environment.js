const { environment } = require('@rails/webpacker');
const lessLoader = {
  test: /\.less$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            '@primary-color': '#dedede',
          },
        },
      },
    },
  ],
};

environment.loaders.append('less', lessLoader);
module.exports = environment;
