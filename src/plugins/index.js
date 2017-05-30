import {
  request
} from 'config/';

import {
  ajax
} from 'util/';

var api_methods = {};

for (var i = 0; i < request.length; i++) {
  if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
    for (var j = 0; j < request[i].list.length; j++) {
      api_methods['api_' + request[i].module + '_' + request[i].list[j].method] = (function (n, m) {
        return function (data, fn, opts) {
          this.$$ajax(request[n].list[m].type, request[n].list[m].path, data, fn, opts);
        };
      })(i, j);
    }
  }
}
Array.prototype.pushSortJson = function (s) {
  var repeat = false;
  var order;
  if (s.order === 'descending') {
    s['order'] = 'desc';
  } else if (s.order === 'ascending') {
    s['order'] = 'asc';
  }
  for (var i = 0; i < this.length; i++) {
    if (s['prop'] === this[i]['prop']) {
      this[i]['order'] = s['order'];
      repeat = true;
      break;
    }
  }
  if (!repeat) {
    this.push(s);
  }
  return this;
}

Array.prototype.pushFilterJson = function (f) {
  var repeat = false;
  for (var i = 0; i < this.length; i++) {
    for (var k1 in f) {
      for (var k2 in this[i]) {
        if (k1 === k2) {
          this[i][k2] = f[k1];
          repeat = true;
          break;
        }
      }
    }
  }
  if (!repeat) {
    this.push(f);
  }
  return this;
}

module.exports = {
  plugins: {
    api_methods,
    ajax
  }
};
