module.exports = process.env.GLEAM_HELPER_COV ? require('./lib-cov/gleam-helper') : require('./lib/gleam-helper');
