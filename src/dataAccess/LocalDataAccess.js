import * as Constants from '../constants/Constants.js';

export async function login(user_management_email, user_management_password) {
	console.log('Attempting login!');
	var data = {
		logemail: user_management_email,
		logpassword: user_management_password
	};
	//console.log('pre-fetch');
	const returnData = await fetch('/api/newUser', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(data => data.json())
		.then(res => {
			console.log('Login successful?: ' + res.success);
			var data = {};
			if (res.success) {
				data.result = Constants.DATA_REQUEST_STATUS.SUCCESS;
				data.user_status = Constants.USER_STATUS.LOGGED_IN;
				data.internal_data = res.body;
				data.user_data = res.user_data;
			} else {
				data.result = Constants.DATA_REQUEST_STATUS.FAILURE;
				data.user_status = Constants.USER_STATUS.LOGIN_FAILED;
				data.internal_data = res.error;
			}
			//internal_data: JSON.stringify(res.body)
			return data;
		});
	//console.log('post-fetch');
	return returnData;
}

export async function internal_data_retrieval() {
	const returnData = await fetch('/api/profile')
		.then(data => data.json())
		.then(res => {
			console.log(JSON.stringify(res.body));
			return {
				result: Constants.DATA_REQUEST_STATUS.SUCCESS,
				internal_data: JSON.stringify(res.body)
			};
		});
	return returnData;
}

export async function logout() {
	const returnData = await fetch('/api/logout')
		.then(data => data.json())
		.then(res => {
			console.log('logged out');
			return {
				result: Constants.DATA_REQUEST_STATUS.SUCCESS,
				user_status: Constants.USER_STATUS.LOGGED_OUT,
				internal_data: res.body
			};
		});
	return returnData;
}

export async function register_new_user(
	user_management_username,
	user_management_first_name,
	user_management_surname,
	user_management_email,
	user_management_password,
	user_management_passwordconf
) {
	var data = {
		email: user_management_email,
		username: user_management_username,
		first_name: user_management_first_name,
		surname: user_management_surname,
		password: user_management_password,
		passwordConf: user_management_passwordconf
	};
	const returnData = await fetch('/api/newUser', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(data => data.json())
		.then(res => {
			//console.log(JSON.stringify(res));
			//return {
			//	result: Constants.DATA_REQUEST_STATUS.SUCCESS,
			//	internal_data: JSON.stringify(res.body)
			//};
			console.log('Registration successful?: ' + res.success);
			var data = {};
			if (res.success) {
				data.result = Constants.DATA_REQUEST_STATUS.SUCCESS;
				data.user_status = Constants.USER_STATUS.LOGGED_IN;
				data.internal_data = res.body;
				data.user_data = res.user_data;
			} else {
				data.result = Constants.DATA_REQUEST_STATUS.FAILURE;
				data.user_status = Constants.USER_STATUS.REGISTRATION_FAILED;
				data.internal_data = res.error;
			}
			//internal_data: JSON.stringify(res.body)
			return data;
		});
	return returnData;
}

export async function update_user_profile(user_data) {
	var data = {
		id: user_data.id,
		username: user_data.username,
		email: user_data.email,
		first_name: user_data.first_name,
		surname: user_data.surname,
		password: user_data.password,
		passwordconf: user_data.passwordconf
	};
	//console.log(data);
	const returnData = await fetch('/api/updateProfile', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(data => data.json())
		.then(res => {
			//console.log(JSON.stringify(res));
			//return {
			//	result: Constants.DATA_REQUEST_STATUS.SUCCESS,
			//	internal_data: JSON.stringify(res.body)
			//};
			console.log('Update successful?: ' + res.success);
			//console.log('Returned user_data.username: ' + res.user_data.username);
			var data = {};
			if (res.success) {
				data.result = Constants.DATA_REQUEST_STATUS.SUCCESS;
				data.user_status = Constants.USER_STATUS.PROFILE_UPDATE_MADE;
				data.internal_data = res.body;
				data.user_data = res.user_data;
			} else {
				data.result = Constants.DATA_REQUEST_STATUS.FAILURE;
				data.user_status = Constants.USER_STATUS.PROFILE_UPDATE_FAILED;
				data.internal_data = res.error;
			}
			//internal_data: JSON.stringify(res.body)
			return data;
		});
	return returnData;
}

export async function find_all_exhibitions() {
	const returnData = await fetch('/api/exhibitions')
		.then(data => data.json())
		.then(res => {
			console.log(
				'Collected ' + res.exhibitions_data.length + ' exhibitions...'
			);
			return {
				result: Constants.DATA_REQUEST_STATUS.SUCCESS,
				exhibitions_data: res.exhibitions_data,
				internal_data: res.body
			};
		});
	return returnData;
}

export async function load_exhibition_artefacts(id) {
	console.log('loading artefacts in exhibition: ' + id);
	const url = new URL('http://localhost:3001/api/exhibitionArtefacts');
	const params = { id: id };
	url.search = new URLSearchParams(params);

	const returnData = await fetch(url, {
		method: 'GET', // or 'PUT'
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(data => data.json())
		.then(res => {
			console.log(
				'Collected ' +
					res.exhibition_artefacts.length +
					' artefacts in Exhibition'
			);
			return {
				result: Constants.DATA_REQUEST_STATUS.SUCCESS,
				exhibition_artefacts: res.exhibition_artefacts,
				internal_data: res.body
			};
		});
	return returnData;
}
