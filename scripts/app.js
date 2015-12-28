'use strict';
angular.module('main', [
  'ionic',
  'ionic-modal-select',
  'ngCordova',
  'ui.router',
  'LocalStorageModule',
  'ngMessages',
  //'ngTouch',
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



      //.state('main.list', {
      //  url: '/list',
      //  views: {
      //    'tab-list': {
      //      templateUrl: 'main/templates/list.html',
      //      // controller: 'SomeCtrl as ctrl'
      //    }
      //  }
      //})
      //.state('main.listDetail', {
      //  url: '/list/detail',
      //  views: {
      //    'tab-list': {
      //      templateUrl: 'main/templates/list-detail.html',
      //      // controller: 'SomeCtrl as ctrl'
      //    }
      //  }
      //})
      //.state('main.debug', {
      //  url: '/debug',
      //  views: {
      //    'tab-debug': {
      //      templateUrl: 'main/templates/debug.html',
      //      controller: 'DebugCtrl as ctrl'
      //    }
      //  }
      //});
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

'use strict';
angular.module('main')
.service('Main', function ($log, $timeout) {

  $log.log('Hello from your Service: Main in module main');

  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah this was changed';

    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

});

'use strict';
angular.module('main')
.service('Locations', function (localStorageService) {
  this.init = function () {
    this.data = JSON.parse(localStorageService.get('locations')) || [];
  }
  this.updateLS = function () {
    localStorageService.set('locations',JSON.stringify(this.data));
  };

});

'use strict';
angular.module('main')
.service('Geocoder', function ($q) {
    this.getCoordinates = function(address){
        var def = $q.defer();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": address }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
              var location = results[0].geometry.location;
              def.resolve(location);
          }  else{
              def.reject(results);
          }
      });
      return def.promise;
  };

  this.getAddress = function(coordinates){
    var latlng = {lat: parseFloat(coordinates.latitude), lng: parseFloat(coordinates.longitude)};
    var def = $q.defer();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var addressText = results[1].formatted_address
          def.resolve(addressText);
        } else {
          def.reject(results);
        }
        ;
      }
    });
    return def.promise;
  };
});

'use strict';
angular.module('main')
.service('Categories', function (localStorageService) {
  this.init = function () {
    this.data = JSON.parse(localStorageService.get('categories')) || [];
  }
  this.updateLS = function () {
    localStorageService.set('categories',JSON.stringify(this.data));
  };
});

'use strict';
angular.module('main')
.controller('NewCategoryCtrl', function ($scope,$rootScope,localStorageService,$state,Categories, title) {
  var self = this;
  self.title = title;

  self.save = function (isValid) {
    if(isValid){
      Categories.data.push(self.name);
      Categories.updateLS();
      self.name = null;
      self.CategoryForm.$setUntouched();
      $state.go('main.categories',{},{ reload: true});
    };
  };
});

'use strict';
angular.module('main')
.controller('LocationsCtrl', function ($scope, $state, Locations, $cordovaVibration, $ionicPlatform) {

  $scope.list = Locations.data;
  $scope.enableGroup = false;
  $scope.toggleEnableGroup = function(){
    $scope.enableGroup = !$scope.enableGroup;
  }

  $scope.go = function(id){

    $ionicPlatform.ready(function() {
      if (navigator.notification){
        $cordovaVibration.vibrate(100);
      }
    });

    $state.go('main.viewLocation',{id:id},{reload: true});
  }

});

'use strict';
angular.module('main')
.controller('LocationFormCtrl', function ($scope, $state, $stateParams, title, action, Categories,
                                         Locations, uiGmapGoogleMapApi, Geocoder) {
  var coordiantesPattern = /(\d*\.?\d*),\s(\d*\.?\d*)/;
  var self = this;
  self.title = title;
  $scope.categories = Categories.data;
  var editing = (action == 'edit');
  if (editing){
    var loc = _.findWhere( Locations.data, { 'id': parseInt($stateParams.id) });
    self.id = loc.id;
    self.name = loc.name;
    self.address = loc.address;
    self.category = loc.category;
    self.coordinates = loc.coordinates;
    var cooridnate = self.coordinates.replace(' ','').split(',')
    self.editCooridnate = {
      latitude: cooridnate[0],
      longitude: cooridnate[1],
    }
  }

  uiGmapGoogleMapApi.then(function(maps) {
      $scope.map = {
          center: {
                latitude: 32.5,
                longitude: 34.9
            },
            zoom: 10 ,
            marker: null,
            events: {
                click: function(map, eventName, originalEventArgs) {
                  var e = originalEventArgs[0];
                  var coordinate = {
                    latitude: e.latLng.lat(),
                    longitude: e.latLng.lng()
                  };
                  placeMarker(coordinate);
                  setCoordinatesInput(coordinate);
                  setAddressInput(coordinate);
                  $scope.$apply();
                }
            }
        };
    if(editing){
      placeMarker(self.editCooridnate);
    }
  });

  function placeMarker(coordinate){
    var marker = {
      id: Date.now(),
      coordinate: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude
      }
    };
    $scope.map.marker = marker;
    $scope.map.center = coordinate;
  };

  function setCoordinatesInput(coordinate){
    self.coordinates = coordinate.latitude.toString() + ', ' + coordinate.longitude.toString();
  }

  function setAddressInput(coordinate){
    Geocoder.getAddress(coordinate)
      .then(function(address){
        self.address = address;
      });
  }




  self.coordinatesChange = function(){
      if(self.coordinates){
          var search = self.coordinates.match(coordiantesPattern);
          if (search!=null){
              var lat = search[1];
              var lon = search[2];
              var coordinate = {
                  latitude: lat,
                  longitude: lon
              }
              placeMarker(coordinate)
              setAddressInput(coordinate)
          };
      };
  };

  self.addressChange = function () {
    if (self.address){
      Geocoder.getCoordinates(self.address)
        .then(function (data) {
          var coordinate = {
            latitude: data.lat(),
            longitude: data.lng()
          }
          setCoordinatesInput(coordinate)
          placeMarker(coordinate)
        });
    };
  };

  $scope.save = function (isValid) {
      var lastIndex = Locations.data[Locations.data.length-1];
      if(_.has(lastIndex,'id')){
        lastIndex = parseInt(lastIndex.id);
      } else {
        lastIndex = 0;
      }
      if(isValid){
        var locationData = {
            id: (editing)?self.id : lastIndex + 1,
            name: self.name,
            address: self.address,
            coordinates: self.coordinates,
            category: self.category
        }
        if(editing==true) {
          var toUpdateLoc = _.findWhere(Locations.data, {'id': parseInt($stateParams.id)});
          var oldItem = _.remove(Locations.data, function (item) {
            return item.id == parseInt($stateParams.id);
          });
        }
        Locations.data.push(locationData);
        Locations.updateLS();

        self.name = null;
        self.address = null;
        self.coordinates = null;
        self.LocationForm.$setUntouched();

        $state.go('main.locations',{},{ reload: true});
        }
    }


});

'use strict';
angular.module('main')
.controller('LocationEditCtrl', function ($log) {

  $log.log('Hello from your Controller: LocationEditCtrl in module main:. This is your controller:', this);

});

'use strict';
angular.module('main')
.controller('LocationCtrl', function ($scope, $stateParams, $state,
                                      Locations,uiGmapGoogleMapApi, toastr) {
  var self = this;
  var loc = _.findWhere( Locations.data, { 'id': parseInt($stateParams.id) });
  self.name = loc.name;
  self.category = loc.category;
  self.address = loc.address;
  self.coordinates = loc.coordinates;
  var cooridnate = self.coordinates.replace(' ','').split(',')

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = {
      center: {
        latitude: cooridnate[0],
        longitude: cooridnate[1]
      },
      zoom: 10,
      marker: {
        id: Date.now(),
        coordinate: {
          latitude: cooridnate[0],
          longitude: cooridnate[1]
        }
      }
    }
  });

  $scope.trash = function () {
    var delItem = _.remove(Locations.data, function(item) {
      return item.id == parseInt($stateParams.id);
    });
    Locations.updateLS();
    toastr.success(delItem[0].name,'Deleted');
    $state.go('main.locations');
  }

  $scope.edit = function () {
    $state.go('main.editLocation',{id:$stateParams.id},{reload: true});
  };
});

'use strict';
angular.module('main')
.controller('DebugCtrl', function ($log, Main, Config, $cordovaDevice) {

  $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);

  // bind data from services
  this.someData = Main.someData;
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;
  // get device info
  ionic.Platform.ready(function () {
    if (ionic.Platform.isWebView()) {
      this.device = $cordovaDevice.getDevice();
    }
  }.bind(this));

  // PASSWORD EXAMPLE
  this.password = {
    input: '', // by user
    strength: ''
  };
  this.grade = function () {
    var size = this.password.input.length;
    if (size > 8) {
      this.password.strength = 'strong';
    } else if (size > 3) {
      this.password.strength = 'medium';
    } else {
      this.password.strength = 'weak';
    }
  };
  this.grade();

});

'use strict';
angular.module('main')
.controller('CategoryEditCtrl', function ($stateParams, Categories,$state,toastr, title) {
  this.title = title;
  this.name = Categories.data[$stateParams.id];

  this.save = function (isValid) {
    if(isValid){
      Categories.data[$stateParams.id] = this.name;
      Categories.updateLS();
      this.CategoryForm.$setUntouched();
      toastr.success(this.name,'Updated')
      $state.go('main.viewCategory',{id:$stateParams.id},{reload: true});
    }
  }
});

'use strict';
angular.module('main')
.controller('CategoryCtrl', function ($state,$stateParams,Categories, Locations, $scope,toastr) {
  var self = this;
  self.name = Categories.data[$stateParams.id];
  $scope.locations = _.filter(Locations.data, function(loc) {
    return loc.category == self.name;
  });


  $scope.trash = function () {
    var delItem = Categories.data.splice($stateParams.id,1);
    Categories.updateLS();
    toastr.success(delItem[0],'Deleted');
    $state.go('main.categories');
  }

  $scope.edit = function () {
    $state.go('main.editCategory',{id:$stateParams.id},{reload: true});
  };

  $scope.go = function(locationId){
    $state.go('main.viewLocation',{id:locationId},{reload: true});
  }

});

'use strict';
angular.module('main')
.controller('CategoriesCtrl', function (localStorageService,$scope, Categories,$state) {
  $scope.list = Categories.data

  $scope.go = function(id){
    $state.go('main.viewCategory',{id:id},{reload: true});
  }
});


'use strict';
angular.module('myLocations', [
  // load your modules here
  'main', // starting with the main module
])
  .run(function ($rootScope, $ionicHistory, $state, Categories, Locations) {
    $ionicHistory.clearHistory();
    Categories.init();
    Locations.init();
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      if (next === current) {
        event.preventDefault();
        $state.go('main.locations');
      }
    });
  });
