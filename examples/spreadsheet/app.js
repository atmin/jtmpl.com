(function() {
  'use strict';

  module.exports = {

    __on__: {
      'click': {
        '.sheet td': function() {
          this('_editing', true);
        }
      }
    },

    __init__: function() {

      this('headers',
        R.map(R.identity, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
      );

      this('rows',
        R.map(
          function(row) {
            return {
              _i: row,
              cols: R.map(
                function(el) {
                  return {
                    value: el
                  };
                },
                R.map(
                  function(el) {
                    return ~~(Math.random()*100 + 1);
                  },
                  R.range(0, 26)
                )
              )
            };
          },
          R.range(1, 100)
        )
      );
    }


  };

})();
