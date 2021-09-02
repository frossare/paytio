<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="paytion">

<head>
	<!--Meta Fix IE-->
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta charset="utf-8">
	<title>Paytion.io</title>

	<meta name="format-detection" content="telephone=no" />
	<meta name="msapplication-tap-highlight" content="no" />
	<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width" />
	<meta http-equiv="Content-Security-Policy" 
	content="style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com http://fonts.googleapis.com; media-src *" />



	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

	<!--<link href="/components/ionic/css/ionic.min.css" rel="stylesheet">-->
	<link href="/components/ionic/css/ionic.content.banner.min.css" rel="stylesheet">

	<link rel="stylesheet" href="/css/bootstrap.css">
	<link rel="stylesheet" href="/css/style.css">
	<link rel="stylesheet" href="/css/media.css">
	<link href="//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&amp;subset=cyrillic,cyrillic-ext,latin-ext"
	 rel="stylesheet">

	<link rel="stylesheet" href="/components/popeye/popeye.min.css" />
	<link rel="stylesheet" href="/app/css/app.css" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">


	<script src="app/js/api_config.js"></script>
	<script src="app/js/lang.js"></script>
</head>

<body class="main__page">
	<div class="overlaybl"></div>
	<div class="page-loader">
		<div class="loader">Loading...</div>
	</div>

	<div ui-view="empty">
		<header>
			<div class="mob__header_bg" ng-click="closeMenu()"></div>
			<div class="mob__header">
				<div class="burger" ng-click="openMenu()" >
					<span class="burger__line"></span>
					<span class="burger__line"></span>
					<span class="burger__line"></span>
					<span class="burger__line"></span>
				</div>
				<div class="mob__header-logo">
					<div class="forlogo">
						<a href="" class="logo">Paytion</a>
					</div>
				</div>
				<div class="mob__header-notification">
					<div class="header__notification active">
						<a href="" class="bell" id="header-mob-notification" ng-click="showPopup()"></a>
						<div class="mob__header-notification_block">
							<div class="mob__header-notification_bg" ng-click="closePopup()"></div>
							<div class="mob__header-notification_wrap">
								<div class="mob__header-notification_close" ng-click="closePopup()">
									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
										<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
										<path d="M0 0h24v24H0z" fill="none" />
									</svg>
								</div>
								<div class="header__notification-title">Notifications (<span>3</span>)</div>
									<ul class="header__notification-items">
										<li class="received">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-1.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														You received a new payment
													</div>
													<div class="header__notification_info">
														+ $19.00 USD
													</div>
												</div>
											</div>
										</li>
										<li class="fail">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-3.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														Payment failed
													</div>
													<div class="header__notification_info">
														$ 252.00 from elon@tesla.com.
													</div>
													<div class="header__notification_link">
														<a href="">
															See reason
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="request">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-2.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														You’ve got a money request
													</div>
													<div class="header__notification_info">
														- $100.99 USD
													</div>
												</div>
											</div>
											<div class="header__notification-bottom">
												<div class="header__notification-group_btn">
													<button class="header__notification_btn">Reject</button>
													<button class="header__notification_btn">Pay</button>
												</div>
											</div>
										</li>
									</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="mob__header-sidebar">
					<div class="mob__header-logout">
						<a ui-sref-opts="{reload: true}" ui-sref-active="active" ui-sref="logout" href="">Log out</a>
					</div>
					<div class="mob__header-user_info">
						<img ng-if="info.avatar" ng-src="@{{info.avatar}}" />
						<p>@{{ info.first_name }} @{{ info.last_name }} </p>
					</div>
					<ul class="mob__header-menu">
						<li>
							<a ui-sref-active="active" ui-sref="account_filled" href="">
								Dashboard
							</a>
						</li>
						<li>
							<a ui-sref-active="active" ui-sref="account_activity" href="">
								Activity
							</a>
						</li>
						<li>
							<a  ui-sref-active="active" ui-sref="account_send_money" ui-sref-opts="{reload: true}" href="">
								Send 
							</a>
						</li>
						<li>
							<a  href=""  ui-sref-active="active" ui-sref="account_request_money" ui-sref-opts="{reload: true}">
									Request
							</a>
						</li>
						<li>
							<a ui-sref-active="active" ui-sref="account_exchange" ui-sref-opts="{reload: true}" href="">
								Exchange 
							</a>
						</li>
						<li>
							<a ui-sref-active="active" ui-sref="account_help" href="">
								Help
							</a>
						</li>
						<li>
							<a href="">
								Search
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-lg-9 col-md-9 col-sm-6 col-xs-12">
						<div class="forlogo">
							<a href="" class="logo">Paytion</a>
						</div>
						<div class="menu">
						<!-- 
						<a class="menu-button"> == $0
							::before
							<span></span>
							::after
							</a> -->
							<nav>
								<ul>
									<li>
										<a ui-sref-active="active" ui-sref="account_filled" href="">
											Dashboard
										</a>
									</li>
									<li>
										<a ui-sref-active="active" ui-sref="account_activity" href="">
											Activity
										</a>
									</li>
									<li>
										<a ui-sref-active="active" ui-sref="account_send_money" ui-sref-opts="{reload: true}" href="">
											Send 
										</a>
									</li>
									<li>
										<a  href="" ui-sref-active="active" ui-sref="account_request_money" ui-sref-opts="{reload: true}">
											Request
										</a>
									</li>
									<li>
										<a ui-sref-active="active" ui-sref="account_exchange" ui-sref-opts="{reload: true}" href="">
											Exchange 
										</a>
									</li>
									<li>
										<a ui-sref-active="active" ui-sref="account_help" href="">
											Help
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
						<div class="headerRight">
							<div class="header__notification active" id="header__notification">
								<a href="" class="bell" role="button" id="dropdownNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
								<div class="dropdown-menu dropdown-menu-notification" aria-labelledby="dropdownNotification">
									<div class="header__notification-title">Notifications (<span>3</span>)</div>
									<ul class="header__notification-items">
										<li class="received">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-1.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														You received a new payment
													</div>
													<div class="header__notification_info">
														+ $19.00 USD
													</div>
												</div>
											</div>
										</li>
										<li class="fail">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-3.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														Payment failed
													</div>
													<div class="header__notification_info">
														$ 252.00 from elon@tesla.com.
													</div>
													<div class="header__notification_link">
														<a href="">
															See reason
														</a>
													</div>
												</div>
											</div>
										</li>
										<li class="request">
											<div class="header__notification-top">
												<div class="header__notification-img">
													<img src="images/notification/ico-2.png" alt="ico_notification">
												</div>
												<div class="header__notification-desc">
													<div class="header__notification_name">
														You’ve got a money request
													</div>
													<div class="header__notification_info">
														- $100.99 USD
													</div>
												</div>
											</div>
											<div class="header__notification-bottom">
												<div class="header__notification-group_btn">
													<button class="header__notification_btn">Reject</button>
													<button class="header__notification_btn">Pay</button>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="account">
								<a class="dropdown-toggle" href="" role="button" id="dropdownAccountLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<img ng-if="info.avatar" ng-src="@{{info.avatar}}" alt="" title="" />
								</a>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownAccountLink">
									<a ui-sref="profile" class="dropdown-item" href="">
										My Profile
									</a>
									<a class="dropdown-item" ui-sref="account_filled">
										Payments
									</a>
									<a class="dropdown-item" href="">
										Settings
									</a>
									<a ui-sref-opts="{reload: true}" ui-sref-active="active" ui-sref="logout" href="" class="dropdown-item">
										Log out
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	</div>

	<ion-nav-view>
		<ion-view>
			<ion-content>

			</ion-content>
		</ion-view>
	</ion-nav-view>

	<div ui-view="empty">
		<footer>
			<div class="container">
				<div class="row">
					<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
						<div class="footer-search">
							<a class="search"></a>
						</div>
						<div class="footer-menu">
							<ul>
								<li><a ui-sref="account_help" href="">Help & Contact</a></li>
								<li><a href="">Fees</a></li>
								<li><a href="">Security</a></li>
								<li><a href="">Features</a></li>
								<li><a href="">Shop</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
						<div class="footer-right">
							<div class="copyright">© 2017 All rights reserved.</div>
							<ul>
								<li><a href="">Privacy</a></li>
								<li><a href="">Legal</a></li>
								<li><a href="">Feedback</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>

	<script type="text/javascript" src="/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="/js/jquery-migrate-1.4.1.min.js"></script>
	<script type="text/javascript" src="/js/popper.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
	<script type="text/javascript" src="/js/tooltip.js"></script>
	<script type="text/javascript" src="/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="/js/jquery.maskedinput.js"></script>
	<script type="text/javascript" src="/js/selectbox.js"></script>
	<script type="text/javascript" src="/js/js.js"></script>

	<script src="/components/ionic/js/ionic.bundle.min.js"></script>
	<script src="/components/ionic/js/ionic.content.banner.js"></script>
	<script src="/components/moment/moment-with-locales.min.js"></script>
	<script src="/components/angular/angular-moment/angular-moment.min.js"></script>
	<script src="/components/angular/angular-timer/angular-timer-all.min.js"></script>
	<script src="/components/angular/angular-locale/angular-locale_uk-ua.min.js"></script>
	<script src="/components/popeye/popeye.min.js"></script>
	<script src="/components/ng-file-upload/ng-file-upload.min.js"></script>
	<script src="/app/js/app.js"></script>
	<script src="/app/js/app_config.js"></script>
</body>

</html>