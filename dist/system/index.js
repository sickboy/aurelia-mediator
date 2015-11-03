System.register(['./mediator'], function (_export) {
  'use strict';

  return {
    setters: [function (_mediator) {
      for (var _key in _mediator) {
        if (_key !== 'default') _export(_key, _mediator[_key]);
      }
    }],
    execute: function () {}
  };
});