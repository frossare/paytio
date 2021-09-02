var conf = {
	'auth_url': {
		'login': '//paytion.co/api/v1/auth/login',
		'logout': '//paytion.co/api/v1/auth/logout',

		'register': '//paytion.co/api/v1/auth/register'
	},
	'auth': {
		'check': '//paytion.co/api/v1/auth/check',

		'uploadAva': '//paytion.co/api/v1/auth/upload',
		'accounts': '//paytion.co/api/v1/accounts',
		'accountsEdit': '//paytion.co/api/v1/accounts/',

		'address': '//paytion.co/api/v1/profile/addresses', //DELETE +/id; POST (update) +/id; GET /id/edit
		'phones': '//paytion.co/api/v1/profile/phones', //DELETE +/id; POST (update) +/id; GET /id/edit
		'emails': '//paytion.co/api/v1/profile/emails', //DELETE +/id; POST (update) +/id; GET /id/edit
	


		'transactions': '//paytion.co/api/v1/wallet/transactions',
		'transactionsAll': '//paytion.co/api/v1/wallet/transactions/all',

		'currencies': '//paytion.co/api/v1/wallet/currencies',
		'balance': '//paytion.co/api/v1/wallet/balance',
		'trades': '//paytion.co/api/v1/trades',
		'qr': '//paytion.co/api/v1/wallet/qr/', //+currency

		'transfer': '//paytion.co/api/v1/wallet/transfer',
		'exchange': '//paytion.co/api/v1/wallet/exchange',
		'withdraw': '//paytion.co/api/v1/wallet/withdraw',

		'ticketsCategories': '//paytion.co/api/v1/tickets/categories',
		'ticketsStore': '//paytion.co/api/v1/tickets/store',

		'info': '//paytion.co/api/v1/profile',
		'infoUpdate': '//paytion.co/api/v1/profile/update',

	},
	'noauth': {
	},

};