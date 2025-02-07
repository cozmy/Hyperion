(function () {
  'use strict';
  angular
    .module('state.portfolio')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('root.sub-page-template.portfolio.webfaction', {
          data: {
            simpleSeoTitle: 'Webfaction - Hyperion',
            simpleSeoDescription: 'This is a case study of a redesign project we did for Webfaction, our hosting provider.',
            simpleSeoKeywords: 'hyperion, webfaction, hosting, host, interface, dashboard, front end, angular, angularjs, design, clean'
          },
          url: '/webfaction',
          views: {
            'sub-page-content@root.sub-page-template': {
              templateUrl: 'state-components/portfolio/webfaction/webfaction.html'
            }
          }
        });
    }]);
})();
