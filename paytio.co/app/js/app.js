'use strict';

Array.prototype.sum = function (prop) {
	var total = 0
	for (var i = 0, _len = this.length; i < _len; i++) {
		total += parseFloat(this[i][prop])
	}
	return total
}

var paytion = angular.module('paytion', [
	'ionic',
	'ngSanitize',
	'ngLocale',
	'timer',
	'angularMoment',
	'pathgather.popeye',
	'ngFileUpload',
	//  'jett.ionic.content.banner',
]);

paytion.factory('$global', function ($rootScope, $state, $location, $http, $timeout, $ionicLoading, $ionicPopup,/*$ionicContentBanner,*/$ionicBackdrop, $window) {
	var self = this;
	self.notifies = {
		thread: null,
		msg: [],
	};

	self.setDropdownItemAnimation = function () {
		$('.dropdown-item').click(function () {
			var img = $(this).data('img');
			var txt = $(this).data('txt');
			$(this).parent().parent().find('.dropdown-toggle').find('img').attr('src', img);
			$(this).parent().parent().find('.dropdown-toggle').find('.tit').html(txt);
		});
	}

	self.setUInfo = function (info) {
		if (info.phones.length) info.phone = info.phones[0].phone;
		$rootScope.info = info;
		var inf = {};
		inf.email = info.email;
		inf.first_name = info.first_name;
		inf.id = info.id;
		inf.last_name = info.last_name;
		inf.avatar = info.avatar;
		inf = JSON.stringify(inf);
		localStorage.setItem('_info_', inf);
		return $rootScope.info;
	};

	self.firstEnter = function () {
		if ($rootScope.firstEnter) {
			return 0;
		}
		else {
			$rootScope.firstEnter = true;
			$state.go('account_filled');
		}
	}

	self.getUInfo = function (param) {
		if (!$rootScope.info) { $rootScope.info = JSON.parse(localStorage.getItem('_info_')); }

		return $rootScope.info;
	};

	self.setUTransactionInfo = function (transactionInfo) {
		return $rootScope.transactionInfo = transactionInfo;
	};
	self.getUTransactionInfo = function (param) {
		var rez = $rootScope.transactionInfo;
		if (param && $rootScope.transactionInfo) { rez = $rootScope.transactionInfo[param]; }
		return rez || {};
	};

	self.setUAccounts = function (accounts) {
		return $rootScope.accounts = accounts;
	};

	self.getUAccounts = function (param) {
		var rez = $rootScope.accounts;
		if (param && $rootScope.accounts) { rez = $rootScope.accounts[param]; }
		return rez || {};
	};

	self.refresh = function (callback) {
		if ($rootScope.reloaded) {
			$rootScope.reloaded = false;
			window.location.reload();
		} else {
			$timeout(function () {
				$rootScope.reloaded = false;
			}, 5000);
			$rootScope.reloaded = true;
			if (typeof callback == 'function') { callback(); }
			return $state.transitionTo($state.current, null, { reload: true, notify: true });
			//return $state.reload();
		}
		return true;
	};
	self.loading = function () {
		//$('.accaount-page').remove();
		//$('.page-loader div').show();
		//$('.page-loader').show();    
		$ionicLoading.show({ template: '<div class="overlaybl"></div><div class="page-loader"><div class="loader">Loading...</div></div>' });
	};
	self.loaded = function () {
		//$('.page-loader div').fadeOut();
		//$('.page-loader').delay(200).fadeOut('slow');
		$ionicLoading.hide();
	};

	self.errorCallback = function (response) {
		$ionicLoading.hide();
		self.notify("error response", 'info', true);
		$window.location.reload();
	};

	self.confirm = function (M_Template, M_Title, callback) {
		var M_Title = M_Title || '';
		$ionicPopup.show({
			title: M_Title,
			template: M_Template,
			buttons: [
				{ text: "no" },
				{
					text: '<b>' + "yes" + '</b>',
					type: 'button-positive',
					onTap: function (e) { if (typeof callback === "function") { callback(e); } }
				}]
		});
	};

	self.alert = function (M_Template, M_Title, callback) {
		var M_Title = M_Title || '';
		$ionicPopup.alert({
			title: M_Title,
			template: M_Template
		}).then(function (res) {
			if (typeof callback === "function") { callback(res); }
		});
	};

	self.notify = function (M_Text, M_Type, cancelOnStateChange, M_clear) {
		var M_Type = M_Type || 'info';
		var M_clear = M_clear || true;
		var cancelOnStateChange = (cancelOnStateChange) ? true : false;

		if (M_clear) { self.notifyClear(); }
		self.notifies.msg.push(M_Text);
		$timeout(function () {
			if (self.notifies.thread) { self.notifies.thread(); }
			/*
			self.notifies.thread = $ionicContentBanner.show({
				text: self.notifies.msg,
				type: M_Type,
				cancelOnStateChange: cancelOnStateChange,
			});
			*/
			self.notifies.thread = false;
		}, 400);
		return false;
	};

	self.notifyClear = function () {
		if (self.notifies.thread) { self.notifies.thread(); }
		self.notifies.msg = [];
		return true;
	}

	return self;
})
	.factory('authInterceptor', function ($q, auth) {
		return {
			request: function (config) {
				if (auth.isAuthed) {
					config.headers['Authorization'] = 'Bearer ' + auth.getToken();
				}
				return config;
			},
			responseError: function (response) {
				return $q.reject(response);
			}
		};
	})
	.service('auth', function ($rootScope, $window) {
		var srvc = this;
		var UID = null;

		srvc.parseJwt = function (token) {
			if (!token || token == '') { return null; }
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace('-', '+').replace('_', '/');
			return JSON.parse($window.atob(base64));
		};

		srvc.saveToken = function (token) {
			$rootScope.token = token;
			localStorage.setItem('_token_', token);
			return $rootScope.token;
		};

		srvc.logout = function () {
			localStorage.clear();
			srvc.UID = null;
			srvc.UInfo = {};
			srvc.saveToken('');
		};

		srvc.getToken = function () {
			if (!$rootScope.token) { $rootScope.token = localStorage.getItem('_token_'); }
			return $rootScope.token;
		};

		srvc.setUID = function (id) {
			return srvc.UID = id;
		};

		srvc.getUID = function () {
			return srvc.UID || false;
		};

		srvc.isAuthed = function () {
			var token = srvc.getToken();
			if (token) {
				return true;
			} else {
				return false;
			}
		}

	})

	.service('getRes', function ($rootScope, $window, $global, $http, $timeout, $filter) {
		var _srv = this;
		function dateNow() {
			var d = new Date();
			var dateNow = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
			return dateNow;
		}

		function dateManage() {
			var data = {};
			function cheking(type, par) {
				if (par == "get") {
					return data[type];
				}
				if (par == "put") {
					data[type] = dateNow();
					return data[type];
				}
			}
			return cheking;
		}

		function getResManage(type) {
			var data = {
				'info': true,
				'accs': true,
				'balance': true,
				'trades': true,
			};

			function gRM(type) {
				if (data[type]) {
					data[type] = false;
					$timeout(function () { data[type] = true; }, 1000);
					return true;
				} else {
					return false;
				}
			}
			return gRM;
		}

		var dateManage = dateManage();
		var getResManage = getResManage();
		_srv.info = function () {
			if ($rootScope.info && (dateManage("info", "get") + 20000) > dateNow()) {
				return true;
			} else {
				if (getResManage("info")) {
					dateManage("info", "put");

					$http
						.get(conf.auth.info)
						.then(function successCallback(response) {
							if (response.data.profile) {
								$rootScope.info = response.data.profile;
								//	$global.setUInfo($rootScope.result);
							}
						}, $global.errorCallback);
				}
			}
		}

		_srv.accs = function () {
			if ($rootScope.accounts && (dateManage("accs", "get") + 20000) > dateNow()) {
				return true;
			} else {
				if (getResManage("accs")) {
					dateManage("accs", "put");
					$http
						.get(conf.auth.accounts)
						.then(function successCallback(response) {
							if (response.data.accounts) {
								$rootScope.accounts = response.data.accounts;
							}
						}, $global.errorCallback);
				}
			}
		}
		_srv.balance = function () {
			$rootScope.currencies = { 'BTC': 0, 'ETH': 0, 'USD': 0 };
			if (getResManage("balance")) {
				$http
					.get(conf.auth.balance)
					.then(function successCallback(response) {
						if (response.data) {
							$rootScope.balance = response.data.balance.amount;
							for (var i = 0; i < $rootScope.balance.length; i++) {
								if ($rootScope.balance[i].currency == 'USD') {
									$rootScope.balance[i].amount = $filter('comma2decimal')($filter('number')($rootScope.balance[i].amount, 2));
								} else {
									$rootScope.balance[i].amount = $filter('comma2decimal')($filter('number')($rootScope.balance[i].amount, 8));
								}
							}
							$rootScope.SelectedAcc = $rootScope.balance[0];
							for (var i = 0; i < response.data.balance.amount.length; i++) {
								for (var key in $rootScope.currencies) {
									if (response.data.balance.amount[i].currency == key) {
										$rootScope.currencies[key] = response.data.balance.amount[i].amount;
									}
								}
							}

						}
					}, $global.errorCallback);
			}

		}
		_srv.trades = function () {
			$rootScope.trades = {};
			if (getResManage("trades")) {
				$http
					.get(conf.auth.trades)
					.then(function successCallback(response) {
						if (response.data) {
							for (var i = 0; i < response.data.length; i++) {
								$rootScope.trades[response.data[i].pair] = response.data[i].mid;
							}
						}

					}, $global.errorCallback);
			}
		}
		/* 
		$scope.trades = {};
		$http
			.get(conf.auth.trades)
			.then(function successCallback(response) {
				if (response.data) {
					for (var i = 0; i < response.data.length; i++) {
						$scope.trades[response.data[i].pair] = response.data[i].mid;
					}
				}

			}, $global.errorCallback);
		*/

	})

	.run(function ($ionicPlatform, $rootScope, $injector, auth, $global, $http, $location, $state, $ionicLoading, Popeye) {
		$rootScope.parseFloat = function (value) {
			return parseFloat(value);
		}
		$rootScope.showQR = function (currency) {
			var modal = Popeye.openModal({
				modalClass: 'modal-qr',
				template: "<div ng-bind-html='qrcode'></div>",
				controller: function ($http, $sce) {
					$http
						.get(conf.auth.qr + currency)
						.then(function successCallback(response) {
							if (response.data) {
								modal.scope.qrcode = $sce.trustAsHtml(response.data);
							}
						});
				}
			});
		};

		$ionicPlatform.registerBackButtonAction(function (e) {
			if ($ionicHistory.backView()) {
				$ionicHistory.goBack();
			} else {
				$state.go($rootScope.previousState);
			}
			e.preventDefault();
			return false;
		}, 101);
		$ionicPlatform.ready(function ($urlRouter) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
				//$global.loaded();
				var requireLogin = (toState.data && toState.data.requireLogin == false) ? false : true;
				if (requireLogin && !(auth.isAuthed && auth.isAuthed())) {
					event.preventDefault();
					//$state.go('login');
				}
			});

			$rootScope.doRefresh = $global.refresh;
			$rootScope.isAuth = auth.isAuthed;
			$rootScope.$on("$ionicView.enter", function (event, data) {

				// handle event
				if ($rootScope.refreshToken) { $state.go('authRefresh'); }
				$rootScope.refreshToken = false;
			});
			$rootScope.$on('$ionicView.beforeEnter', function () {

				$global.loading();
			});
			$rootScope.$on('$ionicView.afterEnter', function () {
				$('span.selectbox').remove();
				selectbox(jQuery);

				$ionicLoading.hide();
			});

			if (auth.isAuthed()) { $rootScope.refreshToken = true; } else { $state.go('login'); }

			$rootScope.isGroupShown = function (group) {
				return $rootScope.shownGroup === group;
			};

			$rootScope.toggleGroup = function (group) {
				if ($rootScope.isGroupShown(group)) {
					$rootScope.shownGroup = null;
				} else {
					$rootScope.shownGroup = group;
				}
			};
			$rootScope.modHeaderBg = $('.mob__header_bg');
			$rootScope.openMenu = function () {
				$('.burger__line').toggleClass('active-b');
				$('.mob__header-sidebar').toggleClass('active');
				$('.burger').toggleClass('active');
				$('.burger').parent().toggleClass('active');
				$('.burger').hasClass('active') ? $rootScope.modHeaderBg.fadeIn() : $rootScope.modHeaderBg.fadeOut();
			}
			$rootScope.closeMenu = function () {
				$('.mob__header_bg').fadeOut();
				$('.burger').removeClass('active');
				$('.mob__header').removeClass('active');
				$('.burger__line').removeClass('active-b');
				$('.mob__header-sidebar').removeClass('active');
			}
			$rootScope.closePopup = function () {
				$('.mob__header-notification_block').fadeOut();
			}
			$rootScope.showPopup = function () {
				$('.mob__header-notification_block').fadeIn();
			}
		});
	})
	.filter('comma2decimal', [
		function () {
			return function (value) {
				return value.toString().replace(/\,/g, '.');
			};
		}
	])

	.controller('LoginCtrl', function ($scope, $state, $http, auth, $global) {

		if (auth.isAuthed()) { $state.go('account_filled'); }
		$scope.respStatus = true;
		$scope.passStatus = false;
		$scope.loginStatus = false;
		$scope.credentials = {};
		$scope.credentials.password = null;
		$scope.credentials.email = null;
		$scope.submit = function () {
			if (!$scope.credentials.password) {
				$scope.passStatus = true;
			}
			else {
				$scope.passStatus = false;
			}
			if (!$scope.credentials.email) {
				$scope.loginStatus = true;
			}
			else {
				$scope.loginStatus = false;
			}

			if ($scope.credentials.email && $scope.credentials.password) {
				$global.loading();

				$http
					.post(conf.auth_url.login, $scope.credentials, {})
					.then(function successCallback(response) {

						if (response.data.status) {
							auth.saveToken(response.data.token);
							$global.notifyClear();
							$state.go('account_filled');
						} else {
							$scope.respStatus = response.data.status;
							$global.loaded();
						}

					}, function errorCallback(response) {
						$global.loaded();
						auth.logout();
						$global.notify("error credentials", 'error', true);
						//$state.go('login');
					});
			}
		};

	})
	.controller('LoginRefreshCtrl', function ($state, $http, auth, $global, $ionicHistory, getRes) {

		$http
			.post(conf.auth.check, null, { headers: { 'Authorization': 'Bearer ' + auth.getToken() } })
			.then(function successCallback(response) {
				if (response.data.status) {
					getRes.info();
					getRes.accs();
					if ($ionicHistory.backView()) {
						$ionicHistory.nextViewOptions({
							disableAnimate: true,
							disableBack: true
						});
						$ionicHistory.goBack();
					} else { $state.go('account_filled'); }
				} else {
					$global.notify("error reauth", 'error', true);
					auth.logout();
					$state.go('login');
				}
			}, function errorCallback(response) {
				$global.notify("error reauth", 'error', true);
				auth.logout();
				$global.loaded();
				$state.go('login');
			});

	})
	.controller('LogoutCtrl', function ($window, $state, $http, auth, $global, $timeout, $ionicHistory) {

		var logout_callback = function () {
			auth.logout();
			$global.notifyClear();

			$timeout(function () { $ionicHistory.clearCache(); }, 200);
			$state.go('login');
		};

		$http.get(conf.auth_url.logout, null, { headers: { 'Authorization': 'Bearer ' + auth.getToken() } })
			.then(function successCallback(response) {
				logout_callback();
			}, function errorCallback(response) {
				logout_callback();
				$window.location.reload();
			});


	})

	.controller('CodeCtrl', function () {



	})
	.controller('CreatepassCtrl', function () {




	})
	.controller('Forgot_emailCtrl', function () {



	})
	.controller('LostpassCtrl', function () {



	})
	.controller('MatchCtrl', function () {



	})
	.controller('OopsCtrl', function () {



	})
	.controller('Security_checkCtrl', function () {



	})
	.controller('Sign_up_step_1Ctrl', function ($global, $scope, $state) {

		$scope.passStatus = false;
		$scope.loginStatus = false;
		$scope.passConfirmStatus = false;
		$scope.reg = {};
		$scope.reg.info = {};
		$scope.reg.info.country = "United States";
		$scope.submit = function () {
			$scope.reg.login = $scope.reg.email;

			if (!$scope.reg.email) {
				$scope.loginStatus = true;
			}
			else {
				$scope.loginStatus = false;
			}
			if (!$scope.reg.password) {
				$scope.passStatus = true;
			}
			else {
				$scope.passStatus = false;
			}
			if (!$scope.reg.password_confirmation) {
				$scope.passConfirmStatus = true;
			}
			else {
				$scope.passConfirmStatus = false;
			}
			if ($scope.reg.login && $scope.reg.email && $scope.reg.password && $scope.reg.password_confirmation) {
				$global.setUInfo($scope.reg);
				$state.go('sign_up_step_2');
			}

		}



	})
	.controller('Sign_up_step_2Ctrl', function ($global, $scope, $state) {

		$scope.reg = $global.getUInfo();
		if (!$scope.reg.email) {
			$state.go('sign_up_step_1');
		}
		$scope.first_nameStatus = false;
		$scope.last_nameStatus = false;
		$scope.date_of_birthStatus = false;
		$scope.address1Status = false;
		$scope.cityStatus = false;
		$scope.zipStatus = false;
		$scope.phone1Status = false;
		$scope.reg.info.state = "State";
		$scope.reg.info.phone_type = "Mobile";

		$scope.submit = function () {
			if (!$scope.reg.info.first_name) {
				$scope.first_nameStatus = true;
			}
			else {
				$scope.first_nameStatus = false;
			}
			if (!$scope.reg.info.last_name) {
				$scope.last_nameStatus = true;
			}
			else {
				$scope.last_nameStatus = false;
			}
			if (!$scope.reg.info.date_of_birth) {
				$scope.date_of_birthStatus = true;
			}
			else {
				$scope.date_of_birthStatus = false;
			}
			if (!$scope.reg.info.address1) {
				$scope.address1Status = true;
			}
			else {
				$scope.address1Status = false;
			}
			if (!$scope.reg.info.address1) {
				$scope.address1Status = true;
			}
			else {
				$scope.address1Status = false;
			}
			if (!$scope.reg.info.city) {
				$scope.cityStatus = true;
			}
			else {
				$scope.cityStatus = false;
			}
			if (!$scope.reg.info.zip) {
				$scope.zipStatus = true;
			}
			else {
				$scope.zipStatus = false;
			}
			if (!$scope.reg.info.phone1) {
				$scope.phone1Status = true;
			}
			else {
				$scope.phone1Status = false;
			}
		}

		/*
	$scope.submit =	function (){
		console.log("sub",$scope.reg);
		$scope.reg.login=$scope.reg.email;
		if ($scope.reg.login  && $scope.reg.email   && $scope.reg.password && $scope.reg.password_confirmation ) {
			$global.loading();
			console.log("posting");
			$http
			.post(conf.auth_url.register,$scope.reg,{})
			.then(function successCallback(response) {
						$global.loaded();
					if(response.data.status) {
						
						$global.notifyClear();
						$state.go('sign_up_step_2');
					} else {
					$state.go('sign_up_step_1');
					}
			}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error credentials",'error',true);
				
			});
		}
	}*/

	})
	.controller('Sign_up_step_3Ctrl', function () {

	})
	.controller('WelcomeCtrl', function () {

	})
	.controller('HomeCtrl', function (getRes, auth) {
		if (auth.isAuthed()) { 
			getRes.info();
		 }
	})
	.controller('ProfileCtrl', function ($scope, getRes, $state, $http, $global, Upload, $timeout) {

		$http
			.get(conf.auth.info)
			.then(function successCallback(response) {
				if (response.data.profile) {
					$scope.info = response.data.profile;
					//	$global.setUInfo($rootScope.result);
				}
			}, $global.errorCallback);

		getRes.accs();

		$scope.delete = function (accId) {
			$http
				.delete(conf.auth.accounts + "/" + accId)
				.then(function successCallback(response) {

					if (response.data.status) {

						$global.notifyClear();
						$state.go('profile');
					} else {
						$state.go('profile');
					}
				}, function errorCallback(response) {
					$global.loaded();

					$global.notify("error credentials", 'error', true);
					//$state.go('login');
				});
		}

		$scope.uploadFiles = function (file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				file.upload = Upload.upload({
					url: conf.auth.uploadAva,
					data: { file: file }
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
						if (response.data.avatar) {
							$scope.info = $global.getUInfo();
							$scope.info.avatar = response.data.avatar;
							$global.setUInfo($scope.info);
						}
					});
				}, function (response) {
					//if (response.status > 0)
					//		$scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					//	file.progress = Math.min(100, parseInt(100.0 *
					//		evt.loaded / evt.total));
				});
			}
		}
		/*
				$scope.submit = function () {
		
					$global.loading();
					$http
						.post(conf.auth.infoUpdate, $scope.info, {})
						.then(function successCallback(response) {
							if (response.data.status) {
								if (response.data.profile) {
									$scope.info = response.data.profile;
									$global.setUInfo($scope.info);
								}
							} else {
								$scope.respStatus = response.data.status;
							}
							$global.loaded();
						}, function errorCallback(response) {
							$global.loaded();
							auth.logout();
							$global.notify("error credentials", 'error', true);
							//$state.go('login');
						});
				};*/

	})

	.controller('Account_address_addCtrl', function ($scope, $http, $global, $state) {
		$scope.add = function () {
			$http
				.post(conf.auth.address, $scope.newAddress, {})
				.then(function successCallback(response) {
					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}
				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newAddress", 'error', true);
				});
		}


	})
	.controller('Account_address_deleteCtrl', function ($scope, $rootScope, $http, $stateParams, $state, $global) {
		//$global.loaded();
		if ($stateParams.id == null) {
			$state.go('profile');
		}
		$scope.delete = function () {

			$http
				.delete(conf.auth.address + "/" + $stateParams.id)
				.then(function successCallback(response) {
					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$state.go('profile');
					}
				}, function errorCallback(response) {
					$global.loaded();

					$global.notify("error credentials", 'error', true);
				});
		}


	})
	.controller('Account_address_editCtrl', function ($scope, $http, $stateParams, $state, $global) {
		if ($stateParams.id == null) {
			$state.go('profile');
		}
		$http
			.get(conf.auth.address + '/' + $stateParams.id + '/edit')
			.then(function successCallback(response) {
				if (response.data) {
					$scope.editAddress = response.data.address;
				} else {
					$scope.respStatus = response.data.status;
					$global.loaded();
				}
			}, function errorCallback(response) {
				$global.loaded();
				$global.notify("error newAddress", 'error', true);
			});

		$scope.edit = function () {
			$http
				.post(conf.auth.address + '/' + $stateParams.id, $scope.editAddress, {})
				.then(function successCallback(response) {
					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}

				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newAddress", 'error', true);
				});
		}

	})

	.controller('Account_email_addCtrl', function ($scope, $http, $global, $state) {
		$scope.add = function () {
			$http
				.post(conf.auth.emails, $scope.newEmail, {})
				.then(function successCallback(response) {

					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}
				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newEmails", 'error', true);
				});
		}
	})


	.controller('Account_email_deleteCtrl', function ($scope, $rootScope, $http, $stateParams, $state, $global) {
		//$global.loaded();
		if ($stateParams.id == null) {
			$state.go('profile');
		}
		$scope.delete = function () {
			$http
				.delete(conf.auth.emails + "/" + $stateParams.id)
				.then(function successCallback(response) {
					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$state.go('profile');
					}
				}, function errorCallback(response) {
					$global.loaded();

					$global.notify("error credentials", 'error', true);
				});
		}


	})
	.controller('Account_email_editCtrl', function ($scope, $http, $stateParams, $state, $global) {
		if ($stateParams.id == null) {
			$state.go('profile');
		}
		$http
			.get(conf.auth.emails + '/' + $stateParams.id + '/edit')
			.then(function successCallback(response) {
				if (response.data) {
					$scope.editEmails = response.data.email;
				} else {
					$scope.respStatus = response.data.status;
					$global.loaded();
				}
			}, function errorCallback(response) {
				$global.loaded();
				$global.notify("error newEmails", 'error', true);
			});

		$scope.edit = function () {
			$http
				.post(conf.auth.emails + '/' + $stateParams.id, $scope.editEmails, {})
				.then(function successCallback(response) {

					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}

				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newEmails", 'error', true);
				});
		}

	})


	.controller('Account_phone_addCtrl', function ($scope, $http, $global, $state) {
		$scope.add = function () {
			$http
				.post(conf.auth.phones, $scope.newPhone, {})
				.then(function successCallback(response) {

					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}

				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newAddress", 'error', true);
				});
		}
	})
	.controller('Account_phone_deleteCtrl', function ($scope, $http, $stateParams, $state, $global) {
		if ($stateParams.id == null) {
			$state.go('profile');
		}

		$scope.delete = function () {

			$http
				.delete(conf.auth.phones + "/" + $stateParams.id)
				.then(function successCallback(response) {
					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$state.go('profile');
					}
				}, function errorCallback(response) {
					$global.loaded();

					$global.notify("error credentials", 'error', true);
				});
		}

	})
	.controller('Account_phone_editCtrl', function ($scope, $http, $stateParams, $state, $global) {

		if ($stateParams.id == null) {
			$state.go('profile');
		}
		$http
			.get(conf.auth.phones + '/' + $stateParams.id + '/edit')
			.then(function successCallback(response) {
				if (response.data) {
					$scope.editPhones = response.data.phone;
				} else {
					$scope.respStatus = response.data.status;
					$global.loaded();
				}

			}, function errorCallback(response) {
				$global.loaded();
				$global.notify("error newPhones", 'error', true);
			});

		$scope.edit = function () {
			$http
				.post(conf.auth.phones + '/' + $stateParams.id, $scope.editPhones, {})
				.then(function successCallback(response) {

					if (response.data.status) {
						$global.notifyClear();
						$state.go('profile');
					} else {
						$scope.respStatus = response.data.status;
						$global.loaded();
					}

				}, function errorCallback(response) {
					$global.loaded();
					$global.notify("error newPhones", 'error', true);
				});
		}

	})

	.controller('Account_activityCtrl', function ($scope, $global, $http, getRes, $timeout) {

		getRes.info();
		/*
				$('#type__tabs li a').click(e => {
					e.preventDefault();
					const $th = $(e.currentTarget);
					$('#type__tabs li').removeClass('active');
					$th.parent().addClass('active');
					let currentTargetId = $th.attr('href').substring(1)
					$('.type__tabs-content_item').each((index, elem) => {
						let currentContentId = $(elem).attr('id')
						if (currentTargetId === currentContentId) {
							let elemC = $(elem).find(elem => elem.currentTargetId === currentTargetId)
							$('.type__tabs-content_item').hide();
							$(elemC.prevObject[0]).show()
						}
					})
				});
		
				$('.activity__item-right_arrow').click(e => {
					const $th = $(e.delegateTarget);
					$th.toggleClass('active');
					$th.parents('.activity__item-visible').next().slideToggle(300);
				});*/

		$http
			.get(conf.auth.accounts)
			.then(function successCallback(response) {

				if (response.data.accounts) {
					$scope.accounts = response.data.accounts;
				}

				$http
					.get(conf.auth.transactions)
					.then(function successCallback(response) {

						if (response.data) {
							$scope.transactions = response.data;
							for (var i = 0; i < $scope.transactions.length; i++) {
								$scope.transactions[i].type = transType($scope.transactions[i].type);
								$scope.transactions[i].ConvStatus = transStatus($scope.transactions[i].status);
								var d = new Date($scope.transactions[i].created_at);
								$scope.transactions[i].dateMonth = transDate(d.getMonth());
								$scope.transactions[i].dateDate = d.getDate();

								if ($scope.transactions[i].type == "Withdraw") {
									for (var j = 0; j < $scope.accounts.length; j++) {
										if ($scope.transactions[i].info.account == $scope.accounts[j].id) {
											$scope.transactions[i].info.transAccount = $scope.accounts[j].bank_name + " " + $scope.accounts[j].account_number;
										}
									}
									if ($scope.transactions[i].info.transAccount == null) {
										$scope.transactions[i].info.transAccount = "Your bank account has not been found";
									}
								}
							}
						}
						//Accordion
						$timeout(function () {
							$('.activity__item-right_arrow').click(e => {
								const $th = $(e.delegateTarget);
								$th.toggleClass('active');
								$th.parents('.activity__item-visible').next().slideToggle(300);
							});
						}, 1000);
					}, $global.errorCallback);
			}, $global.errorCallback);


		//calendar
		if (document.getElementById("filter__activity_date")) {
			$("#filter__activity_date").flatpickr({
				mode: "range",
				dateFormat: "Y-m-d",
				onClose: () => {
					$('#filter__activity_date').parent().removeClass('active');
				},
				onOpen: () => {
					$('#filter__activity_date').parent().addClass('active');
				},
				onChange: (selectedDates, dateStr, instance) => {
					if (dateStr.indexOf('to') == 11) {
						let firsStr = dateStr.substring(0, 10)
						let lastStr = dateStr.substring(14, 24)
						let totalStr = firsStr + '  →  ' + lastStr;
						$('#filter__activity_date').val(totalStr);
						$('#filter__activity_date_val').val(firsStr + '-' + lastStr);
					}
					if (dateStr.length > 10) {
						setTimeout(() => {
							//send request
							// ajaxActivityFilter()
						}, 100)
					}
				},
			});
		}

		//show filters tag
		$('.filter__activity-more p').click(e => {
			e.preventDefault();
			const $th = $(e.delegateTarget);
			$th.toggleClass('active');
			$('.filter__activity-tags').slideToggle()
		});

		//active filter
		$('.filter__activity-list li').click(e => {
			e.preventDefault();
			const $th = $(e.delegateTarget);
			$th.toggleClass('active');

		});

		function transType(i) {
			var transType = type[i];
			return transType;
		}
		function transDate(i) {
			var transType = month[i];
			return transType;
		}
		function transStatus(i) {
			var transStatus = transaction_status[i];
			return transStatus;
		}

	})
	.controller('Account_add_bank_successCtrl', function ($scope, $stateParams, getRes, $state) {

		if ($stateParams.name == null) {
			$state.go('profile');
		}
		getRes.info();
		getRes.balance();
		getRes.trades();
		getRes.accs();

		$scope.name = $stateParams.name;

	})
	.controller('Account_add_card_successCtrl', function ($scope, $stateParams, getRes) {
		if ($stateParams.number == null) {
			$state.go('profile');
		}
		getRes.info();
		getRes.balance();
		getRes.trades();
		getRes.accs();

		$scope.number = $stateParams.number;

	})
	.controller('Account_add_fundCtrl', function (getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();

		$('#type__tabs li a').click(e => {
			e.preventDefault();
			const $th = $(e.currentTarget);
			$('#type__tabs li').removeClass('active');
			$th.parent().addClass('active');
			let currentTargetId = $th.attr('href').substring(1)
			$('.type__tabs-content_item').each((index, elem) => {
				let currentContentId = $(elem).attr('id')
				if (currentTargetId === currentContentId) {
					let elemC = $(elem).find(elem => elem.currentTargetId === currentTargetId)
					$('.type__tabs-content_item').hide();
					$(elemC.prevObject[0]).show()
				}
			})
		});

	})
	.controller('Account_dashboardCtrl', function ($global, getRes) {

		getRes.info();
		getRes.balance();
		//	selectbox(jQuery);
		getRes.trades();
		$global.setDropdownItemAnimation();
	})



	.controller('Account_exchangeCtrl', function ($scope, $state, $http, $global, Popeye, getRes) {

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();

		$scope.exchange = {
			'amount': 0.00,
			'to_amount': 0.00,
			'currency': 'BTC',
			'to_currency': 'USD',
			'fee': 0,
			'total': 0,
		};

		$http
			.get(conf.auth.currencies)
			.then(function successCallback(response) {
				if (response.data) {
					$scope.currency = response.data;
					$scope.exchange.currency = $scope.currency[0];
					$scope.exchange.to_currency = $scope.currency[0].exchange[0];
				}
				//	$global.loaded();
			}, $global.errorCallback);

		$scope.select = function (item) {
			$scope.exchange.to_currency = item.exchange[0];
			$scope.recalc();
			$('span.selectbox').remove();
			selectbox(jQuery);
		}

		$scope.recalc = function () {
			var curse = $scope.exchange.currency.currency + '' + $scope.exchange.to_currency;
			var rev_curse = $scope.exchange.to_currency + '' + $scope.exchange.currency.currency;
			$scope.recalcTrade = ($scope.trades[curse]) ? $scope.trades[curse] : 1 / $scope.trades[rev_curse];
			$scope.exchange.to_amount = $scope.exchange.amount * $scope.recalcTrade;

			$scope.exchange.fee = takeExchangRev($scope.exchange.currency.exchange_revenue, $scope.exchange.to_amount, $scope.recalcTrade);
			$scope.exchange.total = $scope.exchange.to_amount - $scope.exchange.fee;
		}

		var takeExchangRev = function (ExRev, ExToAmouny, recalcTr) {
			var i = ExRev.search("x");
			var res = ExToAmouny * ExRev.slice(0, i);
			if (ExRev.length > i) {
				res += recalcTr * ExRev.slice(i + 1, ExRev.length);
			}
			return res;
		}
		$scope.submit = function () {
			var exch = {};
			exch.amount = $scope.exchange.amount;
			exch.currency = $scope.exchange.currency.currency;
			exch.to_currency = $scope.exchange.to_currency;
			exch.price = $scope.recalcTrade;

			if (exch.amount < $scope.currencies[exch.currency]) {
				if ($scope.exchange.total > 0) {
					if ((exch.amount > $scope.exchange.currency.exchange_limit_min && exch.amount < $scope.exchange.currency.exchange_limit_max) || ($scope.exchange.currency.exchange_limit_min == null && $scope.exchange.currency.exchange_limit_max == null)) {
						$global.loading();
						$http
							.post(conf.auth.exchange, exch, {})
							.then(function successCallback(response) {
								if (response.data.status) {
									$global.notifyClear();
									setTransInfo(exch, response.data);
									$state.go('account_thanks');
								} else {
									if (response.data.order == false) {
										openModal();
										$scope.info.mInfo = "Something went wrong, try again";
										$global.loaded();
									} else {
										setTransInfo(exch, response.data);
										$state.go('account_thanks');
									}
								}
							}, function errorCallback(response) {
								$global.loaded();
								$scope.allert();
								$global.notify("error credentials", 'error', true);
								//$state.go('login');
							});
					} else {
						openModal();
						$scope.info.mInfo = "Minimal exchange value is " + $scope.exchange.currency.exchange_limit_min + ",maximal exchange value is " + $scope.exchange.currency.exchange_limit_max;
					}
				}
				else {
					openModal();
					$scope.info.mInfo = "Total value is not correct";
				}
			} else {
				$scope.info.mInfo = "Not enough funds";
				openModal();
			}
		}

		var openModal = function () {
			var modal = Popeye.openModal({
				templateUrl: "tmpl/modal/account-exchange-modal.html",
			});
		};

		var setTransInfo = function (exchData, respDate) {
			var fullData = exchData;
			fullData.type = "exchange";
			fullData.id = respDate.tid;
			$global.setUTransactionInfo(fullData);
		}
	})

	.controller('Account_filledCtrl', function ($scope, $http, $global, getRes, $timeout) {
		getRes.info();
		getRes.balance();
		getRes.trades();

		$http
			.get(conf.auth.accounts)
			.then(function successCallback(response) {
				if (response.data.accounts) {
					$scope.accounts = response.data.accounts;
				}
				$http
					.get(conf.auth.transactions)
					.then(function successCallback(response) {

						if (response.data) {
							$scope.transactions = response.data;
							for (var i = 0; i < $scope.transactions.length; i++) {
								$scope.transactions[i].type = transType($scope.transactions[i].type);
								$scope.transactions[i].ConvStatus = transStatus($scope.transactions[i].status);
								var d = new Date($scope.transactions[i].created_at);
								$scope.transactions[i].dateMonth = transDate(d.getMonth());
								$scope.transactions[i].dateDate = d.getDate();

								if ($scope.transactions[i].type == "Withdraw") {
									for (var j = 0; j < $scope.accounts.length; j++) {
										if ($scope.transactions[i].info.account == $scope.accounts[j].id) {
											$scope.transactions[i].info.transAccount = $scope.accounts[j].bank_name + " " + $scope.accounts[j].account_number;
										}
									}
									if ($scope.transactions[i].info.transAccount == null) {
										$scope.transactions[i].info.transAccount = "Your bank account has not been found";
									}
								}
							}

						}
						//Accordion
						$timeout(function () {
							$('.activity__item-right_arrow').click(e => {
								const $th = $(e.delegateTarget);
								$th.toggleClass('active');
								$th.parents('.activity__item-visible').next().slideToggle(300);
							});

						}, 1000);

					}, $global.errorCallback);
			}, $global.errorCallback);


		$scope.transAll = function () {
			$global.loading();
			$http
				.get(conf.auth.transactionsAll)
				.then(function successCallback(response) {
					if (response.data) {
						$scope.transactions = response.data;
						for (var i = 0; i < $scope.transactions.length; i++) {
							$scope.transactions[i].type = transType($scope.transactions[i].type);
							$scope.transactions[i].ConvStatus = transStatus($scope.transactions[i].status);
							var d = new Date($scope.transactions[i].created_at);
							$scope.transactions[i].dateMonth = transDate(d.getMonth());
							$scope.transactions[i].dateDate = d.getDate();

							if ($scope.transactions[i].type == "Withdraw") {
								for (var j = 0; j < $scope.accounts.length; j++) {
									if ($scope.transactions[i].info.account == $scope.accounts[j].id) {
										$scope.transactions[i].info.transAccount = $scope.accounts[j].bank_name + " " + $scope.accounts[j].account_number;
									}
								}
								if ($scope.transactions[i].info.transAccount == null) {
									$scope.transactions[i].info.transAccount = "Your bank account has not been found";
								}
							}

						}

					}
					//Accordion
					$timeout(function () {
						$('.activity__item-right_arrow').click(e => {
							const $th = $(e.delegateTarget);
							$th.toggleClass('active');
							$th.parents('.activity__item-visible').next().slideToggle(300);
						});
					}, 500);
					$global.loaded();

				}, $global.errorCallback);
		}

		function transType(i) {
			var transType = type[i];

			return transType;
		}
		function transDate(i) {
			var transType = month[i];

			return transType;
		}
		function transStatus(i) {
			var transStatus = transaction_status[i];
			return transStatus;
		}
		$global.setDropdownItemAnimation();
	})
	.controller('Account_helpCtrl', function ($scope, $state, $http, $global, Popeye, getRes) {

		getRes.info();

		$scope.ticket = {};

		$http
			.get(conf.auth.ticketsCategories)
			.then(function successCallback(response) {
				if (response.data) {
					$scope.ticketsCategories = response.data;

					$scope.ticket.category_id = "1";
				}

			}, $global.errorCallback);
		$scope.options = {};
		$scope.ticket = {};
		$scope.ticket.subject = "";
		$scope.ticket.content = "";
		$scope.options.name = "theme_1";
		$scope.contentStatus = false;
		$scope.subjectStatus = false;

		$scope.submit = function () {
			if ($scope.ticket.subject.length < 8) {
				$scope.subjectStatus = true;
			}
			else {
				$scope.subjectStatus = false;
			}
			if ($scope.ticket.content.length < 24) {
				$scope.contentStatus = true;
			}
			else {
				$scope.contentStatus = false;
			}

			if ($scope.ticket.subject && $scope.ticket.content) {
				$global.loading();
				$http
					.post(conf.auth.ticketsStore, $scope.ticket, {})
					.then(function successCallback(response) {
						if (response.data) {
							$scope.info.message = "Ticket has been sent";
							$scope.openModal();
							$global.notifyClear();
							$scope.ticket.content = "";
							$scope.ticket.subject = "";
							$state.go('account_help');
							$global.loaded();
						} else {
							$state.go('account_help');
						}
					}, function errorCallback(response) {
						$scope.info.message = "Ticket has not been sent";
						$scope.openModal();
						$global.notify("error credentials", 'error', true);
						$global.loaded();
						//$state.go('login');
					});

			}
		}

		$scope.openModal = function () {
			var modal = Popeye.openModal({
				templateUrl: "tmpl/modal/account-help-modal.html",
			});
		};

	})

	.controller('Account_link_bankCtrl', function ($scope, $state, $http, $global, getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();

		$scope.submit = function () {

			if ($scope.acc.account_name || $scope.acc.account_number) {
				$global.loading();
				$http
					.post(conf.auth.accounts, $scope.acc, {})
					.then(function successCallback(response) {
						if (response.data.status) {

							$global.notifyClear();
							$state.go('account_add_bank_success', { name: $scope.acc.account_name });
						} else {
							$state.go('account_link_bank');
						}
					}, function errorCallback(response) {
						$global.loaded();
						auth.logout();
						$global.notify("error credentials", 'error', true);
						//$state.go('login');
					});
			}
		}
		$global.setDropdownItemAnimation();
	})
	.controller('Account_link_bank_editCtrl', function ($scope, $state, $http, $global, $stateParams, getRes) {

		if ($stateParams.id == null) {
			$state.go('profile');
		}

		getRes.info();
		getRes.balance();
		getRes.trades();


		$http
			.get(conf.auth.accountsEdit + $stateParams.id + "/edit")
			.then(function successCallback(response) {
				if (response.data.account) {
					$scope.account = response.data.account;
				}

			}, $global.errorCallback);

		$scope.submit = function () {
			$global.loading();
			$http
				.put(conf.auth.accountsEdit + $stateParams.id, $scope.account, {})
				.then(function successCallback(response) {

					if (response.data.status) {

						$global.notifyClear();
						$state.go('account_link');
					} else {
						$state.go('account_link_bank');
					}
				}, function errorCallback(response) {
					$global.loaded();
					auth.logout();
					$global.notify("error credentials", 'error', true);
					//$state.go('login');
				});
		}

		$global.setDropdownItemAnimation();
	})

	.controller('Account_link_credit_cardCtrl', function ($global, getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();
		getRes.accs();

		/*
				$scope.submit = function () {
		
					if ($scope.acc.account_name || $scope.acc.account_number) {
						$global.loading();
						$http
							.post(conf.auth.accounts, $scope.acc, {})
							.then(function successCallback(response) {
								if (response.data.status) {
		
									$global.notifyClear();
									$state.go('account_link');
								} else {
									$state.go('account_link_bank');
								}
							}, function errorCallback(response) {
								$global.loaded();
								auth.logout();
								$global.notify("error credentials", 'error', true);
								//$state.go('login');
							});
					}
				}*/

		$global.setDropdownItemAnimation();
	})

	.controller('Account_link_credit_card_editCtrl', function ($global, getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();
		getRes.accs();


		$global.setDropdownItemAnimation();
	})

	.controller('Account_linkCtrl', function ($global, getRes) {

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();

		$global.setDropdownItemAnimation();
	})
	.controller('Account_manager_cardsCtrl', function ($global, getRes, $http, $rootScope) {

		getRes.info();
		getRes.balance();
		getRes.trades();

		$http
						.get(conf.auth.accounts)
						.then(function successCallback(response) {
							if (response.data.accounts) {
								$rootScope.accounts = response.data.accounts;
							}
						}, $global.errorCallback);


		$global.setDropdownItemAnimation();
	})
	.controller('Account_remove_bankCtrl', function ($scope, $global, getRes, $stateParams, $http, $state) {

		if ($stateParams.id == null) {
			$state.go('profile');
		}

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();

		$http
			.get(conf.auth.accountsEdit + $stateParams.id + "/edit")
			.then(function successCallback(response) {
				if (response.data.account) {
					$scope.removeAccount = response.data.account;
				}

			}, $global.errorCallback);

		$scope.delete = function () {
			$http
				.delete(conf.auth.accounts + "/" + $scope.removeAccount.id)
				.then(function successCallback(response) {

					if (response.data.status) {

						$global.notifyClear();
						$state.go('account_manager_cards');
					} else {
						$state.go('profile');
					}
				}, function errorCallback(response) {
					$global.loaded();

					$global.notify("error credentials", 'error', true);
					//$state.go('login');
				});
		}


		$global.setDropdownItemAnimation();
	})
	.controller('Account_remove_cardCtrl', function ($global, getRes, $stateParams) {

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();
		$global.setDropdownItemAnimation();
	})

	.controller('Account_request_moneyCtrl', function ($scope, $global, getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();

		$scope.changeEvent = function (e) {
		}
		$('#type__tabs li a').click(e => {
			e.preventDefault();
			const $th = $(e.currentTarget);
			$('#type__tabs li').removeClass('active');
			$th.parent().addClass('active');
			let currentTargetId = $th.attr('href').substring(1)
			$('.type__tabs-content_item').each((index, elem) => {
				let currentContentId = $(elem).attr('id')
				if (currentTargetId === currentContentId) {
					let elemC = $(elem).find(elem => elem.currentTargetId === currentTargetId)
					$('.type__tabs-content_item').hide();
					$(elemC.prevObject[0]).show()
				}
			})
		});

		$('.activity__item-right_arrow').click(e => {
			const $th = $(e.delegateTarget);
			$th.toggleClass('active');
			$th.parents('.activity__item-visible').next().slideToggle(300);
		});

		$global.setDropdownItemAnimation();
	})
	.controller('Account_send_moneyCtrl', function ($scope, $state, $http, $global, Popeye, getRes) {

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();
		/*
				$scope.SelectedAcc = {
					'currency': "BTC",
					'to_currency': "USD",
					'amount': "0",
				}*/
		$http
			.get(conf.auth.currencies)
			.then(function successCallback(response) {
				if (response.data) {
					$scope.currency = response.data;
				}

			}, $global.errorCallback);

		$scope.select = function (item) {
			$scope.exchange.to_currency = item.exchange[0];
			$scope.recalc();
			$('span.selectbox').remove();
			selectbox(jQuery);
		}

		$scope.recalc = function () {
			var curse = $scope.SelectedAcc.currency + '' + 'USD';
			var rev_curse = 'USD' + '' + $scope.SelectedAcc.currency;
			var trade = ($scope.trades[curse]) ? $scope.trades[curse] : 1 / $scope.trades[rev_curse];
			$scope.exchange.to_amount = $scope.exchange.amount * trade;

			$scope.exchange.fee = $scope.exchange.to_amount * 0.02;
			$scope.exchange.total = $scope.exchange.to_amount + $scope.exchange.fee;

		}

		var openModal = function () {
			var modal = Popeye.openModal({
				templateUrl: "tmpl/modal/account-send-money-modal.html",
			});
		};

		$scope.submit = function () {

			var trans = {};
			trans.amount = $scope.exchange.amount;
			trans.currency = $scope.SelectedAcc.currency;
			trans.recipient_email = $scope.SelectedEmail;
			if (trans.amount && trans.recipient_email && trans.currency) {
				if ($scope.SelectedAcc.amount >= $scope.exchange.amount) {
					$global.loading();
					$http
						.post(conf.auth.transfer, trans, {})
						.then(function successCallback(response) {

							if (response.data.status) {

								$global.notifyClear();
								setTransInfo(trans, response.data);
								$state.go('account_thanks');
							} else {
								$state.go('account_thanks');
								setTransInfo(trans, response.data);
							}
						}, function errorCallback(response) {
							$global.loaded();
							$scope.allert();
							$global.notify("error credentials", 'error', true);
							//$state.go('login');
						});
				}
				else {
					openModal();
				}
			}
		}

		$scope.allert = function () { alert("errorCallback"); }

		var setTransInfo = function (sendData, respDate) {
			var fullData = sendData;
			fullData.type = "send";
			fullData.id = respDate.tid;
			$global.setUTransactionInfo(fullData);
		}
		$global.setDropdownItemAnimation();
	})
	.controller('Account_thanksCtrl', function ($scope, $global) {

		getRes.info();
		getRes.accs();
		getRes.balance();
		getRes.trades();

		$scope.TransactionInfo = $global.getUTransactionInfo();
		$global.setDropdownItemAnimation();
	})

	.controller('Account_withdraw1Ctrl', function ($scope, $state, $http, $global, Popeye, getRes) {

		getRes.info();
		getRes.balance();
		getRes.trades();


		$scope.withdraw = {
			'amount': 0,
			//		'account_id':null,
			'address': null
		};
		$scope.withdraw.SelectedAcc = {
			'currency': "BTC",
			'to_currency': "USD",
			'amount': "0",
		}
		$scope.withdraw.SelectedBankAcc = {
			'bank_name': 'BName',
			'account_number': '1234567',
			'id': '0'
		}

		$http
			.get(conf.auth.currencies)
			.then(function successCallback(response) {
				if (response.data) {
					$scope.currency = response.data;
				}
			}, $global.errorCallback);

		$scope.exchange = {};
		$scope.recalc = function () {

			var curse = $scope.withdraw.SelectedAcc.currency + '' + "USD";
			var rev_curse = 'USD' + '' + $scope.withdraw.SelectedAcc.currency;
			var trade = ($scope.trades[curse]) ? $scope.trades[curse] : 1 / $scope.trades[rev_curse];
			$scope.exchange.to_amount = $scope.withdraw.amount * trade;
			$scope.exchange.fee = $scope.exchange.to_amount * 0.02;
			$scope.exchange.total = $scope.exchange.to_amount - $scope.exchange.fee;
		}

		var openModal = function () {
			var modal = Popeye.openModal({
				templateUrl: "tmpl/modal/account-withdraw-modal.html",
			});
		};

		$scope.submit = function () {
			/*
			var withdraw= {};
			
			withdraw.currency =$scope.SelectedAcc.currency;
			if($scope.accounts.length) { withdraw.account_id=$scope.SelectedBankAcc.id }
			else { withdraw.address = $scope.SelectedWalletAddress; }
			*/
			$scope.withdraw.amount = $scope.exchange.amount;
			$scope.withdraw.currency = $scope.withdraw.SelectedAcc.currency;
			if ($scope.accounts.length) { $scope.withdraw.account_id = $scope.withdraw.SelectedBankAcc.id; }
			if ($scope.withdraw.amount && $scope.withdraw.currency && ($scope.withdraw.account_id || $scope.withdraw.address)) {
				if ($scope.SelectedAcc.amount >= $scope.withdraw.amount) {
					$global.loading();
					$http
						.post(conf.auth.withdraw, $scope.withdraw, {})
						.then(function successCallback(response) {

							if (response.data.status) {

								$global.notifyClear();
								$state.go('account_filled');
							} else {
								$state.go('account_filled');
							}
						}, function errorCallback(response) {
							$global.loaded();
							$scope.allert();
							$global.notify("error credentials", 'error', true);
							//$state.go('login');
						});
				} else {
					openModal();
				}
			}
		}
		$scope.allert = function () {
			$scope.info.mInfo = "No destination address";
			var modal = Popeye.openModal({
				templateUrl: "tmpl/modal/account-exchange-modal.html",
			});
		}

		$scope.select = function () {
			$('span.selectbox').remove();
			selectbox(jQuery);
		}
		$global.setDropdownItemAnimation();
	})

	.controller('Account_withdraw3Ctrl', function ($scope, getRes) {
		getRes.info();
		$scope.allert = function () { alert("Template not available. API testing"); }
	})

	.controller('EmptyCtrl', function ($global) {
		// $global.loading();
	})

	.controller('PageCtrl', function () {
		;
	})


	.controller('Kyc_addres_docCtrl', function () {
		;
	})
	.controller('Kyc_donecCtrl', function () {
		;
	})
	.controller('Kyc_personal_infoCtrl', function () {
		;
	})
	.controller('Kyc_selfieCtrl', function () {
		;
	})
	.controller('Kyc_upload_documentsCtrl', function ($scope, Upload) {
		
		$scope.uploadFiles = function (file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				console.log("2221");
			/*	file.upload = Upload.upload({
					url: conf.auth.uploadAva,
					data: { file: file }
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
						if (response.data.avatar) {
							$scope.info = $global.getUInfo();
							$scope.info.avatar = response.data.avatar;
							$global.setUInfo($scope.info);
						}
					});
				}, function (response) {
					//if (response.status > 0)
					//		$scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					//	file.progress = Math.min(100, parseInt(100.0 *
					//		evt.loaded / evt.total));
				});*/
			}
		}
	})


	.component('walletsInfo', {
		templateUrl: 'tmpl/components/wallets.html',
		bindings: {
			currencies: '=',
			trades: '='
		}
	})
	.component('bankAccountsAndCards', {
		templateUrl: 'tmpl/components/bank-accounts-and-cards.html',
		bindings: {
			accounts: '=',
		}
	})
	.component('secondBankAccountsAndCards', {
		templateUrl: 'tmpl/components/second-bank-accounts-and-cards.html',
	})
	.component('exchangeRates', {
		templateUrl: 'tmpl/components/exchange-rates.html',
		bindings: {
			trades: '=',
		}
	});;


