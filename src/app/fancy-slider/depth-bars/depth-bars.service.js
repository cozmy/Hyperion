(function () {
  'use strict';

  angular
    .module('app.fancy-slider.depth-bars', [
      'app.fancy-slider.assets-downloader',
      'app.fancy-slider.resizer',
      'common.pixi',
      'common.viewport-size'
    ])
    .service('FancyDepthBars', ['$q', 'PIXI', 'FancyAssetsDownloader', 'FancyConfiguration', 'FancyDepthBarsBlurSpritesUrl', 'FancyResizer', 'ViewportSize', function ($q, PIXI, AssetsDownloader, Configuration, DepthBarsUrl, SliderResizer, ViewportSize) {
      this.get = get;
      this.init = init;

      ///////////////////
      // Configuration //
      ///////////////////
      var COLOR = 0xFFFFFF;
      var LATERAL_BAR_WIDTH = 40;

      ///////////////
      // Variables //
      ///////////////
      var depthBars;

      ////////////
      // Public //
      ////////////
      function get() {
        if (angular.isUndefined(depthBars)) {
          throw 'FancyDepthBars module was not initialized correctly!';
        }

        return depthBars;
      }

      function init() {
        var deferred = $q.defer();

        AssetsDownloader.download(DepthBarsUrl.getAsArray(), function () {
          depthBars = getDepthBars();

          deferred.resolve();
        });

        return deferred.promise;
      }

      /////////////
      // Private //
      /////////////
      function getDepthBars() {
        var blurSpritesUrl = DepthBarsUrl.get();

        var topBar = drawRectangle(COLOR, Configuration.NATIVE_WIDTH, (function () {
          // Forgive me God for I have sinned!
          return document.querySelector('.header-index-container').clientHeight;
        })());
        var leftBar = drawRectangle(COLOR, LATERAL_BAR_WIDTH, Configuration.NATIVE_HEIGHT);
        var rightBar = drawRectangle(COLOR, LATERAL_BAR_WIDTH, Configuration.NATIVE_HEIGHT);

        // Sets the z-index;
        topBar.zIndex = 30;
        leftBar.zIndex = 1;
        rightBar.zIndex = 100;

        // This holds the same bars size as otherwise they would get scaled too.
        SliderResizer.onProportionChange(function (proportion) {
          // Sets the new scale
          topBar.scale.y = 1 / proportion;
          leftBar.scale.x = 1 / proportion;
          rightBar.scale.x = 1 / proportion;

          // Rounds the position width otherwise the bars may not properly align
          topBar.width = Math.round(topBar.width);
          leftBar.width = Math.round(leftBar.width);
          rightBar.width = Math.round(rightBar.width);
        });

        ViewportSize.onChange(function (size) {
          if (size.width >= 1920) {
            leftBar.visible = true;
            rightBar.visible = true;

            var proportion = SliderResizer.getProportion();

            var currentStageWidth = Configuration.NATIVE_WIDTH * proportion;
            var currentScreenSize = size.width < Configuration.GLOBAL_MIN_WIDTH ? Configuration.GLOBAL_MIN_WIDTH : size.width;

            var currentLateralOffset = Math.abs((currentScreenSize - currentStageWidth) / 2);

            leftBar.x = Math.floor(currentLateralOffset * (1 / proportion));
            rightBar.x = Math.ceil((Configuration.NATIVE_WIDTH - rightBar.width) - (currentLateralOffset * (1 / proportion)));

            if (size.width === 1920) {
              // Substracts 10px to make the bars 30px wide
              leftBar.x -= 10 * (1 / proportion);
              rightBar.x += 10 * (1 / proportion);
            }
          } else {
            leftBar.visible = false;
            rightBar.visible = false;
          }
        });

        return {
          top: topBar,
          left: leftBar,
          right: rightBar
        };
      }

      function drawRectangle(color, width, height) {
        var graphics = new PIXI.Graphics();

        graphics.beginFill(color);
        graphics.drawRect(0, 0, width, height);

        return graphics;
      }
    }]);
})();
