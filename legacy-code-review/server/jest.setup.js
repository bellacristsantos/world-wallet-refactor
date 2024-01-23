const nock = require('nock');

nock.enableNetConnect(/localhost|127\.0\.0\.1:50826/);
