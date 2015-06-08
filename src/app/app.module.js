(function () {
  'use strict';

  angular
    .module('HyperionApp', [
      //////////////////////////////
      // Official angular modules //
      //////////////////////////////

      'ngSanitize',
      'ngTouch',

      ///////////////////////
      // Third party modules //
      ///////////////////////

      'ui.router',

      ////////////////////
      // Common modules //
      ////////////////////

      'common.greeter',
      'common.preloader',

      //////////////////////
      // Specific Modules //
      //////////////////////



      //////////////////////
      // State Components //
      //////////////////////

      'state.state-components'
    ]);
})();
