'use strict';
angular.module('main', [
  'ionic',
  'ionic-modal-select',
  'ngCordova',
  'ui.router',
  'LocalStorageModule',
  'ngMessages',
  'toastr',
  'uiGmapgoogle-maps',
  'angular.filter',
  'uz.mailto'
])
.config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider,
                  uiGmapGoogleMapApiProvider, $ionicConfigProvider) {
  localStorageServiceProvider
    .setPrefix('ml')
    .setNotify(true, true);

  $ionicConfigProvider.tabs.position('bottom');

  uiGmapGoogleMapApiProvider.configure({
    //    key: 'your api key',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'geometry,visualization'
  });

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/locations');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html',
    })

    .state('main.locations', {
      url: '/locations',
      cache: false,
      views: {
        'tab-locations': {
          templateUrl: 'main/templates/locations.html',
          controller: 'LocationsCtrl'
        }
      }
    })
    .state('main.newLocaion', {
      url: '/new/location',
      cache: false,
      views: {
        'tab-locations': {
          templateUrl: 'main/templates/location-form.html',
          controller: 'LocationFormCtrl as location',
          resolve: {
            title: function () {
              return 'New Location';
            },
            action: function () {
              return 'new';
            }
          }
        }
      }
    })
    .state('main.viewLocation', {
      url: '/location/:id',
      cache: false,
      views: {
        'tab-locations': {
          templateUrl: 'main/templates/location.html',
          controller: 'LocationCtrl as location',
        }
      }
    })
    .state('main.editLocation', {
      url: '/location/:id/edit',
      cache: false,
      views: {
        'tab-locations': {
          templateUrl: 'main/templates/location-form.html',
          controller: 'LocationFormCtrl as location',
          resolve: {
            title: function () {
              return 'Location Edit';
            },
            action: function () {
              return 'edit';
            }
          }
        }
      }
    })

    .state('main.categories', {
      url: '/categories',
      views: {
        'tab-categories': {
          templateUrl: 'main/templates/categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })
    .state('main.viewCategory', {
      url: '/categories/:id',
      cache: false,
      views: {
        'tab-categories': {
          templateUrl: 'main/templates/category.html',
          controller: 'CategoryCtrl as category',
        }
      }
    })
    .state('main.editCategory', {
      url: '/categories/:id/edit',
      views: {
        'tab-categories': {
          templateUrl: 'main/templates/category-form.html',
          controller: 'CategoryEditCtrl as category',
          resolve: {
            title: function () {
              return 'Category Edit';
            }
          }
        }
      }
    })
    .state('main.newCategory', {
      url: '/new/category',
      cache: false,
      views: {
        'tab-categories': {
          templateUrl: 'main/templates/category-form.html',
          controller: 'NewCategoryCtrl as category',
          resolve: {
            title: function () {
              return 'New Category';
            }
          }
        }
      }
    });
})
  .run(function ($rootScope, $window, Locations, Categories, $cordovaSocialSharing, $ionicPlatform, Mailto) {
    $rootScope.share = function () {
      var dataToSend = {
        locations: Locations.data,
        categories: Categories.data
      };
      dataToSend = JSON.stringify(dataToSend);
      $ionicPlatform.ready(function() {
        if ($window.plugins) {
          $cordovaSocialSharing
            .shareViaEmail('Here is the JSON data, enjoy', 'MyLocations JSON DATA', null, null, null, dataToSend)
            .then(function(result) {
              console.log(result)
              // Success!
            }, function(err) {
              console.log(err)
              // An error occurred. Show a message to the user
            });
        } else {
          var options = {
            subject: 'MyLocations JSON DATA',
            body: dataToSend
          };
          var mailToLink = Mailto.url(null, options);
          $window.location = mailToLink;
        };
      });
    };
  });
