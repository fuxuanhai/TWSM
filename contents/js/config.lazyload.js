// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['../contents/angular/vendor/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['../contents/angular/vendor/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['../contents/angular/vendor/jquery/charts/flot/jquery.flot.min.js', 
                          '../contents/angular/vendor/jquery/charts/flot/jquery.flot.resize.js',
                          '../contents/angular/vendor/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          '../contents/angular/vendor/jquery/charts/flot/jquery.flot.spline.js',
                          '../contents/angular/vendor/jquery/charts/flot/jquery.flot.orderBars.js',
                          '../contents/angular/vendor/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['../contents/angular/vendor/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['../contents/angular/vendor/jquery/sortable/jquery.sortable.js'],
      nestable:       ['../contents/angular/vendor/jquery/nestable/jquery.nestable.js',
                          '../contents/angular/vendor/jquery/nestable/nestable.css'],
      filestyle:      ['../contents/angular/vendor/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['../contents/angular/vendor/jquery/slider/bootstrap-slider.js',
                          '../contents/angular/vendor/jquery/slider/slider.css'],
      chosen:         ['../contents/angular/vendor/jquery/chosen/chosen.jquery.min.js',
                          '../contents/angular/vendor/jquery/chosen/chosen.css'],
      TouchSpin:      ['../contents/angular/vendor/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          '../contents/angular/vendor/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['../contents/angular/vendor/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          '../contents/angular/vendor/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['../contents/angular/vendor/jquery/datatables/jquery.dataTables.min.js',
                          '../contents/angular/vendor/jquery/datatables/dataTables.bootstrap.js',
                          '../contents/angular/vendor/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['../contents/angular/vendor/jquery/jvectormap/jquery-jvectormap.min.js', 
                          '../contents/angular/vendor/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../contents/angular/vendor/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../contents/angular/vendor/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['../contents/angular/vendor/jquery/footable/footable.all.min.js',
                          '../contents/angular/vendor/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      '../contents/angular/vendor/modules/ng-grid/ng-grid.min.js',
                      '../contents/angular/vendor/modules/ng-grid/ng-grid.min.css',
                      '../contents/angular/vendor/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      '../contents/angular/vendor/modules/angular-ui-select/select.min.js',
                      '../contents/angular/vendor/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    '../contents/angular/vendor/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['../contents/angular/vendor/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      '../contents/angular/vendor/modules/ngImgCrop/ng-img-crop.js',
                      '../contents/angular/vendor/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      '../contents/angular/vendor/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      '../contents/angular/vendor/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      '../contents/angular/vendor/modules/angularjs-toaster/toaster.js',
                      '../contents/angular/vendor/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      '../contents/angular/vendor/modules/textAngular/textAngular-sanitize.min.js',
                      '../contents/angular/vendor/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      '../contents/angular/vendor/modules/angular-slider/angular-slider.min.js',
                      '../contents/angular/vendor/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      '../contents/angular/vendor/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      '../contents/angular/vendor/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      '../contents/angular/vendor/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      '../contents/angular/vendor/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      '../contents/angular/vendor/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      '../contents/angular/vendor/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;