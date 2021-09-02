paytion.config(function($ionicConfigProvider,$stateProvider, $urlRouterProvider, $httpProvider) {
    //$ionicConfigProvider.views.maxCache(1);
    $ionicConfigProvider.views.maxCache(1);
    $ionicConfigProvider.views.transition('android');
    $ionicConfigProvider.scrolling.jsScrolling(false);
  
    $httpProvider.interceptors.push('authInterceptor');
        $stateProvider
	    .state('home',{
				url: '/',
				data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/pages/home.html',
                        controller: 'HomeCtrl',
                     }
                }


            })
        .state('code', {
                url: '/code',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/code.html',
                        controller: 'CodeCtrl',
                     }
                }


            })
         .state('createpass', {
                url: '/createpass',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/createpass.html',
                        controller: 'CreatepassCtrl',
                     }
                }


            })
         .state('forgot_email', {
                url: '/forgot_email',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/forgot-email.html',
                        controller: 'Forgot_emailCtrl',
                     }
                }


            })
         .state('login_new_pass', {
                url: '/login_new_pass',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/login-new-pass.html',
                        controller: 'Login_new_passCtrl',
                     }
                }


            })
        .state('login', {
                url: '/login',
                data: {
				  requireLogin: false
				},
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/login.html',
                        controller: 'LoginCtrl',
                     }
                }


            })
         .state('lostpass', {
                url: '/lostpass',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/lostpass.html',
                        controller: 'LostpassCtrl',
                     }
                }


            })
         .state('match', {
                url: '/match',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/match.html',
                        controller: 'MatchCtrl',
                     }
                }


            })
         .state('oops', {
                url: '/oops',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/oops.html',
                        controller: 'OopsCtrl',
                     }
                }


            })
         .state('security_check', {
                url: '/security_check',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/security-check.html',
                        controller: 'Security_checkCtrl',
                     }
                }


            })
         .state('sign_up_step_1', {
                url: '/sign_up_step_1',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/sign-up-step-1.html',
                        controller: 'Sign_up_step_1Ctrl',
                     }
                }


            })
          .state('sign_up_step_2', {
                url: '/sign_up_step_2',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/sign-up-step-2.html',
                        controller: 'Sign_up_step_2Ctrl',
                     }
                }


            })
           .state('sign_up_step_3', {
                url: '/sign_up_step_3',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/sign-up-step-3.html',
                        controller: 'Sign_up_step_3Ctrl',
                     }
                }


            })
           .state('welcome', {
                url: '/welcome',
                data: {
                  requireLogin: false
                },
                views: {
                    "empty@" : {
                        templateUrl: 'tmpl/pages/empty.html',
                        controller: 'EmptyCtrl'
                    
                     },
                    "@" : {
                        templateUrl: 'tmpl/login/welcome.html',
                        controller: 'WelcomeCtrl',
                     }
                }


            })
	    .state('authRefresh', {
                url: '/authRefresh',
                template: '',
                controller: 'LoginRefreshCtrl'
        })
	    .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl',
				data: {
				  requireLogin: false
				}
        })

        .state('profile', {
                url: '/account/profile',
                templateUrl: 'tmpl/account/my-profile.html',
                controller: 'ProfileCtrl'
        })
        

        .state('account_dashboard', {
                url: '/account/dashboard',
                templateUrl: 'tmpl/account/dashboard.html',
                controller: 'Account_dashboardCtrl',
                
						})

				.state('address_add', {
								url: '/account/address_add',
								templateUrl: 'tmpl/account/address/address-add.html',
								controller: 'Account_address_addCtrl',
							
						})
				.state('address_delete', {
								url: '/account/address_delete',
								templateUrl: 'tmpl/account/address/address-delete.html',
								controller: 'Account_address_deleteCtrl',
								params: {
									id: null
								}
						
					})
				.state('address_edit', {
								url: '/account/address_edit',
								templateUrl: 'tmpl/account/address/address-edit.html',
								controller: 'Account_address_editCtrl',
								params: {
									id: null
								}
					
					})
				.state('email_add', {
								url: '/account/email_add',
								templateUrl: 'tmpl/account/email/email-add.html',
								controller: 'Account_email_addCtrl',
				
					})

				.state('email_delete', {
								url: '/account/email_delete',
								templateUrl: 'tmpl/account/email/email-delete.html',
								controller: 'Account_email_deleteCtrl',
								params: {
									id: null
								}
				
					})
				.state('email_edit', {
								url: '/account/email_edit',
								templateUrl: 'tmpl/account/email/email-edit.html',
								controller: 'Account_email_editCtrl',
								params: {
									id: null
								}
			
					})

				.state('phone_add', {
								url: '/account/phone_add',
								templateUrl: 'tmpl/account/phone/phone-add.html',
								controller: 'Account_phone_addCtrl',
				
					})
				.state('phone_delete', {
								url: '/account/phone_delete',
								templateUrl: 'tmpl/account/phone/phone-delete.html',
								controller: 'Account_phone_deleteCtrl',
								params: {
									id: null
								}

					})
				.state('phone_edit', {
								url: '/account/phone_edit',
								templateUrl: 'tmpl/account/phone/phone-edit.html',
								controller: 'Account_phone_editCtrl',
								params: {
									id: null
								}

				})

				.state('account_activity', {
                url: '/account/activity',
                templateUrl: 'tmpl/account/account-activity.html',
                controller: 'Account_activityCtrl',
                
						})
				.state('account_add_bank_success', {
								url: '/account/add_bank_success',
								templateUrl: 'tmpl/account/account-add-bank-success.html',
								controller: 'Account_add_bank_successCtrl',
								params: {
									name: null
								}
							
					})
				.state('account_add_card_success', {
								url: '/account/add_card_success',
								templateUrl: 'tmpl/account/account-add-card-success.html',
								controller: 'Account_add_card_successCtrl',
								params: {
									number: null
								}
						
				})
				.state('account_add_fund', {
							url: '/account/add_fund',
							templateUrl: 'tmpl/account/account-manager-cards.html',
							controller: 'Account_manager_cardsCtrl',
							
					})
        .state('account_exchange', {
                url: '/account/exchange',
                templateUrl: 'tmpl/account/account-exchange.html',
                controller: 'Account_exchangeCtrl',
               
            })
        .state('account_filled', {
                url: '/account/filled',
                templateUrl: 'tmpl/account/account-filled.html',
                controller: 'Account_filledCtrl',
                
            })
        .state('account_help', {
                url: '/account/help',
                templateUrl: 'tmpl/account/account-help.html',
                controller: 'Account_helpCtrl',
                
            })
        .state('account_link_bank', {
                url: '/account/link_bank',
                templateUrl: 'tmpl/account/account-link-bank.html',
                controller: 'Account_link_bankCtrl',
                
            })
         .state('account_link_bank_edit', {
                url: '/account/edit',
                templateUrl: 'tmpl/account/account-link-bank_edit.html',
								controller: 'Account_link_bank_editCtrl',
								params: {
									id: null
								}
                
						})
				.state('account_link_credit_card', {
								url: '/account/link_credit_card',
								templateUrl: 'tmpl/account/account-link-credit-card.html',
								controller: 'Account_link_credit_cardCtrl',
							
						})
				.state('account_link_credit_card_edit', {
							url: '/account/link_credit_card_edit',
							templateUrl: 'tmpl/account/account-link-credit-card-edit.html',
							controller: 'Account_link_credit_card_editCtrl',
						
					})
        .state('account_link', {
                url: '/account/link',
                templateUrl: 'tmpl/account/account-link.html',
                controller: 'Account_linkCtrl',
                
						})
				.state('account_manager_cards', {
							url: '/account/manager_cards',
							templateUrl: 'tmpl/account/account-manager-cards.html',
							controller: 'Account_manager_cardsCtrl',
							
					})
				.state('account_remove_card', {
							url: '/account/:id/remove_card',
							templateUrl: 'tmpl/account/account-remove-card.html',
							controller: 'Account_remove_cardCtrl',
						
				})
				.state('account_remove_bank', {
					url: '/account/remove_bank',
					templateUrl: 'tmpl/account/account-remove-bank.html',
					controller: 'Account_remove_bankCtrl',
					params: {
						id: null
					}
				
				})		
				.state('account_request_money', {
							url: '/account/request_money',
							templateUrl: 'tmpl/account/account-request-money.html',
							controller: 'Account_request_moneyCtrl',
						
				})	
        .state('account_send_money', {
                url: '/account/send_money',
                templateUrl: 'tmpl/account/account-send-money.html',
                controller: 'Account_send_moneyCtrl',
                
            })
        .state('account_thanks', {
                url: '/account/thanks',
                templateUrl: 'tmpl/account/account-thanks.html',
                controller: 'Account_thanksCtrl',
                
            })
        .state('account_withdraw1', {
                url: '/account/withdraw',
                templateUrl: 'tmpl/account/account-withdraw1.html',
                controller: 'Account_withdraw1Ctrl',
                
            })
        .state('account_withdraw3', {
                url: '/account/withdraw3',
                templateUrl: 'tmpl/account/account-withdraw3.html',
                controller: 'Account_withdraw3Ctrl',
               
						})
						
				.state('kyc_addres_doc', {
								url: '/kyc/addres_doc',
								templateUrl: 'tmpl/kyc/kyc-addres-doc.html',
								controller: 'Kyc_addres_docCtrl',
						 
					})
				.state('kyc_done', {
								url: '/kyc/done',
								templateUrl: 'tmpl/kyc/kyc-done.html',
								controller: 'Kyc_donecCtrl',
					 
					})
				.state('kyc_personal_info', {
								url: '/kyc/personal_info',
								templateUrl: 'tmpl/kyc/kyc-personal-info.html',
								controller: 'Kyc_personal_infoCtrl',
				 
					})
				.state('kyc_selfie', {
								url: '/kyc/selfie',
								templateUrl: 'tmpl/kyc/kyc-selfie.html',
								controller: 'Kyc_selfieCtrl',
			 
					})
				.state('kyc_upload_documents', {
								url: '/kyc/upload_documents',
								templateUrl: 'tmpl/kyc/kyc-upload-documents.html',
								controller: 'Kyc_upload_documentsCtrl',
		 
					})
       
       .state('404', {
                url: "/404",
                templateUrl: "tmpl/404.html",
                controller: "NoopCtrl",
				data: {
				  requireLogin: false
				}
            });
        $urlRouterProvider.otherwise('/');
    })