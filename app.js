'use strict'

if (process.env.NODE_ENV === 'test') {
  const errorInfo = new Error('NODE_ENV doesn\'t use test mode.');
  console.error(errorInfo);
  process.exit();
}

if (process.env.NODE_ENV !== 'production') {
  require('./config/babelPlugins');
}

require('./config/bootstrap');
