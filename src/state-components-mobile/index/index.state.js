(function () {
  'use strict';

  var playAnimation = true;

  angular
    .module('state.index', [
      'app.simple-footer'
    ])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('index', {
          data: {
            simpleSeoTitle: 'Hyperion - Product Design Team in Birmingham, UK',
            simpleSeoDescription: 'A Birmingham based product design team specialising in UI/UX, Web Design and Development',
            simpleSeoKeywords: 'interface design agency birmingham uk, ui design agency birmingham uk, website design agency birmingham uk, design agency birmingham uk, interface design studio birmingham uk, ui design studio birmingham uk, design studio birmingham uk, interface design firm birmingham uk, design firm birmingham uk, website design firm birmingham uk, ui consulting firm birmingham uk, website product design team birmingham uk, product design team birmingham uk, website design team birmingham uk, startup ui design birmingham uk, startup website design birmingham uk, web design studio birmingham, product design team birmingham, web design birmingham, website design birmingham, design studio birmingham, web development birmingham, product design team, design agency birmingham, birmingham web design agency, wordpress'
          },
          url: '/',
          views: {
            '@': {
              controller: ['$document', function ($document) {
                if (playAnimation) {
                  playAnimation = false;

                  var animContainer = $document[0].querySelector('.introduction .animation-container');
                  animContainer = angular.element(animContainer);

                  animContainer.addClass('animation-init');
                  setTimeout(function(){
                    animContainer.addClass('animation-start');
                  }, 250);
                }
              }],
              templateUrl: 'state-components-mobile/index/index.html'
            }
          }
        });
    }]);
})();
