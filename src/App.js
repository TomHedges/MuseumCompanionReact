import React from 'react';
import * as Constants from './constants/Constants.js';
import SearchControls from './components/SearchControls.js';
import SearchResults from './components/SearchResults.js';
import ArtefactDetails from './components/ArtefactDetails.js';
import MainMenu from './components/MainMenu.js';
import ExhibitionBrowser from './components/ExhibitionBrowser.js';
import UserProfile from './components/UserProfile.js';
import remoteDataAccess from './dataAccess/RemoteDataAccess.js';
import * as LocalDataAccess from './dataAccess/LocalDataAccess.js';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSearchType: Constants.REQUEST_TYPE.COLLECTION_SEARCH,
			selectedSource: Constants.DEFAULT_SOURCE,
			selectedNumSearchResults: Constants.DEFAULT_NO_OF_RESULTS_TO_SHOW,
			searchResultsStartRange: 1,
			searchResultsEndRange: parseInt(
				Constants.DEFAULT_NO_OF_RESULTS_TO_SHOW,
				10
			),
			lastSelectedSource: null,
			lastSearchText: null,
			lastSearchType: null,
			searchResultRequestLimit: Constants.DATA_RESULTS_DOWNLOAD_LIMIT,
			searchText: '',
			artefactId: null,
			display_page: Constants.PAGES.EXHIBITION_BROWSER,
			user_status: Constants.USER_STATUS.LOGGED_OUT,
			user_status_loading: false,
			user_id: null,
			status_message: '',
			user_management_selector: Constants.SELECTOR_NONE,
			user_management_id: null,
			user_management_username: '2ndGo',
			user_management_email: 'bob@bob.com',
			user_management_first_name: '',
			user_management_surname: '',
			user_management_password: 'test',
			user_management_passwordconf: 'testy',
			user_management_new_username: '',
			user_management_new_email: '',
			user_management_new_first_name: '',
			user_management_new_surname: '',
			user_management_new_password: '',
			user_management_new_passwordconf: '',
			singleArtefactDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
			singleArtefactRawData: [],
			singleArtefactProcessedData: [],
			singleArtefactErrorMessage: null,
			searchResultsTotalNumber: 0,
			searchResultsDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
			searchResultsRawData: [],
			searchResultsProcessedData: [],
			searchResultsErrorMessage: null,
			searchResultsBackgroundDataRequestStatus:
				Constants.DATA_REQUEST_STATUS.NONE_MADE,
			exhibitions_all_collections: [],
			exhibition_id: null,
			exibition_details: {},
			exibition_artefacts: [],
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.regularTasks = this.regularTasks.bind(this);

		this.regularTasks();
	}

	stateReset() {
		this.setState({
			selectedSearchType: Constants.REQUEST_TYPE.COLLECTION_SEARCH,
			selectedSource: Constants.DEFAULT_SOURCE,
			selectedNumSearchResults: Constants.DEFAULT_NO_OF_RESULTS_TO_SHOW,
			searchResultsStartRange: 1,
			searchResultsEndRange: parseInt(
				Constants.DEFAULT_NO_OF_RESULTS_TO_SHOW,
				10
			),
			lastSelectedSource: null,
			lastSearchText: null,
			lastSearchType: null,
			searchResultRequestLimit: Constants.DATA_RESULTS_DOWNLOAD_LIMIT,
			searchText: '',
			artefactId: null,
			user_management_selector: null,
			singleArtefactDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
			singleArtefactRawData: [],
			singleArtefactProcessedData: [],
			singleArtefactErrorMessage: null,
			searchResultsTotalNumber: 0,
			searchResultsDataRequestStatus: Constants.DATA_REQUEST_STATUS.NONE_MADE,
			searchResultsRawData: [],
			searchResultsProcessedData: [],
			searchResultsErrorMessage: null,
			searchResultsBackgroundDataRequestStatus:
				Constants.DATA_REQUEST_STATUS.NONE_MADE,
		});
	}

	requestData(searchType, selectedSource, searchText) {
		var resultsSoFar = this.state.searchResultsProcessedData
			? this.state.searchResultsProcessedData.length
			: 0;
		remoteDataAccess(searchType, selectedSource, searchText, resultsSoFar)
			.then(returnData => {
				var dataRequestStatus = searchType + 'DataRequestStatus';
				var errorMessage = searchType + 'ErrorMessage';
				var rawData = searchType + 'RawData';
				var processedData = searchType + 'ProcessedData';

				if (returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]) {
					var searchResultsRawExtended =
						returnData[Constants.DATA_REQUEST_RAW_DATA];
					//if (this.state[rawData] !== null) {
					//  searchResultsRawExtended = this.state[rawData].concat(returnData[Constants.DATA_REQUEST_RAW_DATA]);
					//}

					var searchResultsProcessedExtended =
						returnData[Constants.DATA_REQUEST_PROCESSED_DATA];
					if (this.state[processedData]) {
						searchResultsProcessedExtended = this.state[processedData].concat(
							returnData[Constants.DATA_REQUEST_PROCESSED_DATA]
						);
					}

					var maxNumberToDisplay =
						returnData[Constants.DATA_REQUEST_NUMBER_RESULTS] <
						this.state.searchResultsEndRange
							? returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]
							: this.state.searchResultsEndRange;
					maxNumberToDisplay =
						maxNumberToDisplay >
						returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]
							? returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]
							: maxNumberToDisplay;

					var newSearchResultRequestLimit =
						this.state.searchResultsEndRange +
							Constants.DATA_RESULTS_DOWNLOAD_LIMIT <=
						returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]
							? this.state.searchResultsEndRange +
							  Constants.DATA_RESULTS_DOWNLOAD_LIMIT
							: returnData[Constants.DATA_REQUEST_NUMBER_RESULTS];

					console.log(
						'1st branch - search results' +
							searchResultsProcessedExtended.length +
							', ' +
							returnData[Constants.DATA_REQUEST_NUMBER_RESULTS]
					);
					this.setState({
						[dataRequestStatus]: returnData[Constants.DATA_REQUEST_RESULT],
						[errorMessage]: returnData[Constants.DATA_REQUEST_ERROR],
						[rawData]: searchResultsRawExtended,
						[processedData]: searchResultsProcessedExtended,
						searchResultsTotalNumber:
							returnData[Constants.DATA_REQUEST_NUMBER_RESULTS],
						searchResultsEndRange: maxNumberToDisplay,
						searchResultRequestLimit: newSearchResultRequestLimit,
						lastSearchSource: selectedSource,
						searchResultsBackgroundDataRequestStatus:
							returnData[Constants.DATA_REQUEST_RESULT]
					});
				} else {
					console.log(
						'2nd branch - individual artefact' +
							this.state.searchResultsTotalNumber
					);
					this.setState({
						[dataRequestStatus]: returnData[Constants.DATA_REQUEST_RESULT],
						[errorMessage]: returnData[Constants.DATA_REQUEST_ERROR],
						[rawData]: returnData[Constants.DATA_REQUEST_RAW_DATA],
						[processedData]: returnData[Constants.DATA_REQUEST_PROCESSED_DATA],
						lastSearchSource: selectedSource
					});
				}
			})
			.then(() => {
				if (
					this.state.searchResultsProcessedData &&
					this.state.searchResultsProcessedData.length <
						this.state.searchResultRequestLimit &&
					this.state.searchResultsProcessedData.length <
						this.state.searchResultsTotalNumber
				) {
					this.setState(
						{
							searchResultsBackgroundDataRequestStatus:
								Constants.DATA_REQUEST_STATUS.LOADING
						},
						() => {
							this.requestData(searchType, selectedSource, searchText);
						}
					);
				}
			});
	}

	handleClick(event) {
		event.preventDefault();

		//console.log('handleClick fired by: ' + event.type);
		//console.log('handleClick fired by: ' + event.target);
		console.log('handleClick fired by: ' + event.target.id);
		console.log('handleClick fired by: ' + event.target.className);

		var category =
			event.target.className === Constants.SEARCH_CELL ||
			event.target.className === Constants.SEARCH_PREVIEW_IMAGE ||
			event.target.className === Constants.EXHIBITION_LIST_CELL ||
			event.target.className === Constants.EXHIBITION_CONTENTS_CELL
				? event.target.className
				: event.target.id;
		category =
			event.target.className === Constants.ARTEFACT_PREVIEW_IMAGE
				? event.target.className
				: category;
		category = event.type === 'submit' ? Constants.SEARCH_BUTTON : category;

		var newStartRange;
		var newEndRange;

		switch (category) {
		case Constants.SEARCH_BUTTON:
			if (
				this.state.lastSearchText !== this.state.searchText.trim() ||
					this.state.lastSelectedSource !== this.state.selectedSource ||
					this.state.lastSearchType !== this.state.selectedSearchType
			) {
				var dataRequestStatus =
						this.state.selectedSearchType + 'DataRequestStatus';
				var errorMessage = this.state.selectedSearchType + 'ErrorMessage';
				var rawData = this.state.selectedSearchType + 'RawData';
				var processedData = this.state.selectedSearchType + 'ProcessedData';
				this.setState(
					{
						[dataRequestStatus]: Constants.DATA_REQUEST_STATUS.LOADING,
						[errorMessage]: null,
						[rawData]: null,
						[processedData]: null,
						lastSelectedSource: this.state.selectedSource,
						lastSearchText: this.state.searchText,
						lastSearchType: this.state.selectedSearchType,
						searchText: this.state.searchText.trim(),
						searchResultsStartRange: 1,
						searchResultsEndRange: parseInt(
							Constants.DEFAULT_NO_OF_RESULTS_TO_SHOW,
							10
						),
						searchResultsTotalNumber: 0
					},
					() => {
						console.log(
							this.state.searchResultsStartRange +
									' ' +
									this.state.searchResultsEndRange +
									' ' +
									this.state.searchResultsTotalNumber
						);
						this.requestData(
							this.state.selectedSearchType,
							this.state.selectedSource,
							this.state.searchText
						);
					}
				);
			} else {
				console.log('Not searching again - already loaded this!');
			}
			break;

		case Constants.RESET_BUTTON:
			this.stateReset();
			break;

		case Constants.PROFILE_EDIT_BUTTON:
			this.setState({
				user_status: Constants.USER_STATUS.EDITING_PROFILE,
				user_management_new_username: this.state.user_management_username,
				user_management_new_email: this.state.user_management_email,
				user_management_new_first_name: this.state.user_management_first_name,
				user_management_new_surname: this.state.user_management_surname,
				user_management_new_password:
						Constants.PASSWORD_UNCHANGED_PLACEHOLDER,
				user_management_new_passwordconf:
						Constants.PASSWORD_UNCHANGED_PLACEHOLDER
			});
			break;

		case Constants.INPUT_TEXT_NEW_PASSWORD:
			this.setState({
				user_management_new_password: ''
			});
			break;

		case Constants.INPUT_TEXT_NEW_PASSWORDCONF:
			this.setState({
				user_management_new_passwordconf: ''
			});
			break;

		case Constants.PROFILE_EDIT_CANCEL_BUTTON:
			this.setState({
				user_status: Constants.USER_STATUS.LOGGED_IN,
				status_message: ''
			});
			break;

		case Constants.REGISTER_BUTTON:
			this.setState(
				{
					//user_status: Constants.USER_STATUS.REQUEST_PENDING
					user_status_loading: true
				},
				() => {
					LocalDataAccess.register_new_user(
						this.state.user_management_username,
						this.state.user_management_first_name,
						this.state.user_management_surname,
						this.state.user_management_email,
						this.state.user_management_password,
						this.state.user_management_passwordconf
					).then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							console.log(returned_data.user_data);
							this.setState({
								user_status: Constants.USER_STATUS.LOGGED_IN,
								user_status_loading: false,
								status_message: returned_data.internal_data,
								user_management_id: returned_data.user_data._id,
								user_management_username: returned_data.user_data.username,
								user_management_first_name:
										returned_data.user_data.first_name,
								user_management_surname: returned_data.user_data.surname
							});
						} else {
							//console.log('login error');
							//return 'login error';
							this.setState({
								user_status: Constants.USER_STATUS.LOGIN_FAILED,
								user_status_loading: false,
								status_message: returned_data.internal_data
							});
						}
					});
				}
			);
			break;

		case Constants.PROFILE_EDIT_SAVE_BUTTON:
			this.setState(
				{
					//user_status: Constants.USER_STATUS.REQUEST_PENDING
					user_status_loading: true
				},
				() => {
					const user_data = {
						id: this.state.user_management_id,
						username: this.state.user_management_new_username,
						email: this.state.user_management_new_email,
						first_name: this.state.user_management_new_first_name,
						surname: this.state.user_management_new_surname,
						password: this.state.user_management_new_password,
						passwordconf: this.state.user_management_new_passwordconf
					};
					LocalDataAccess.update_user_profile(user_data).then(
						returned_data => {
							if (
								returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
							) {
								//console.log(returned_data.user_data);
								this.setState({
									user_status: Constants.USER_STATUS.LOGGED_IN,
									user_status_loading: false,
									status_message: returned_data.internal_data,
									user_management_username: returned_data.user_data.username,
									user_management_email: returned_data.user_data.email,
									user_management_first_name:
											returned_data.user_data.first_name,
									user_management_surname: returned_data.user_data.surname,
									user_management_password: returned_data.user_data.password,
									user_management_passwordconf:
											returned_data.user_data.passwordConf
								});
							} else {
								//console.log('login error');
								//return 'login error';
								this.setState({
									user_status: Constants.USER_STATUS.PROFILE_UPDATE_FAILED,
									user_status_loading: false,
									status_message: returned_data.internal_data
								});
							}
						}
					);
				}
			);
			break;

		case Constants.LOGIN_BUTTON:
			if (
				this.state.user_management_email === null ||
					this.state.user_management_email.length === 0 ||
					this.state.user_management_password === null ||
					this.state.user_management_password.length === 0
			) {
				this.setState({
					user_status: Constants.USER_STATUS.LOGIN_FAILED,
					user_status_loading: false,
					status_message: 'Please enter a username and password'
				});
			} else {
				this.setState(
					{
						//user_status: Constants.USER_STATUS.REQUEST_PENDING
						user_status_loading: true
					},
					() => {
						LocalDataAccess.login(
							this.state.user_management_email,
							this.state.user_management_password
						).then(returned_data => {
							if (
								returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
							) {
								console.log(returned_data.user_data);
								this.setState({
									user_status: Constants.USER_STATUS.LOGGED_IN,
									user_status_loading: false,
									status_message: returned_data.internal_data,
									user_management_id: returned_data.user_data._id,
									user_management_username: returned_data.user_data.username,
									user_management_first_name:
											returned_data.user_data.first_name,
									user_management_surname: returned_data.user_data.surname
								});
							} else {
								//console.log('login error');
								//return 'login error';
								this.setState({
									user_status: Constants.USER_STATUS.LOGIN_FAILED,
									user_status_loading: false,
									status_message: returned_data.internal_data
								});
							}
						});
					}
				);
			}
			break;

		case Constants.LOGOUT_BUTTON:
			this.setState(
				{
					//user_status: Constants.USER_STATUS.REQUEST_PENDING
					user_status_loading: true
				},
				() => {
					LocalDataAccess.logout().then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							this.setState({
								user_status: Constants.USER_STATUS.LOGGED_OUT,
								user_status_loading: false,
								status_message: returned_data.internal_data,
								user_management_id: '',
								user_management_email: '',
								user_management_username: '',
								user_management_first_name: '',
								user_management_surname: '',
								user_management_password: '',
								user_management_passwordconf: ''
							});
						} else {
							console.log('logout error');
							return 'logout error';
						}
					});
				}
			);
			break;

		case Constants.PREVIOUS_BUTTON:
			newStartRange =
					this.state.searchResultsStartRange -
					parseInt(this.state.selectedNumSearchResults, 10);
			if (newStartRange < 1) {
				newStartRange = 1;
			}
			newEndRange =
					newStartRange + parseInt(this.state.selectedNumSearchResults, 10) - 1;
			if (newEndRange > this.state.searchResultsTotalNumber) {
				newEndRange = this.state.searchResultsTotalNumber;
			}

			this.setState({
				searchResultsStartRange: newStartRange,
				searchResultsEndRange: newEndRange
			});
			break;

		case Constants.NEXT_BUTTON:
			newStartRange =
					this.state.searchResultsStartRange +
					parseInt(this.state.selectedNumSearchResults, 10);
			if (newStartRange > this.state.searchResultsTotalNumber) {
				newStartRange = this.state.searchResultsTotalNumber;
			}
			newEndRange =
					newStartRange + parseInt(this.state.selectedNumSearchResults, 10) - 1;
			if (newEndRange > this.state.searchResultsTotalNumber) {
				newEndRange = this.state.searchResultsTotalNumber;
			}
			//console.log(newEndRange);
			var newSearchResultRequestLimit =
					newEndRange + Constants.DATA_RESULTS_DOWNLOAD_LIMIT <=
					this.state.searchResultsTotalNumber
						? newEndRange + Constants.DATA_RESULTS_DOWNLOAD_LIMIT
						: this.state.searchResultsTotalNumber;
				//console.log(newSearchResultRequestLimit);

			this.setState({
				searchResultsStartRange: newStartRange,
				searchResultsEndRange: newEndRange,
				searchResultRequestLimit: newSearchResultRequestLimit
			});

			//console.log(this.state.searchResultsProcessedData.length + " " + newSearchResultRequestLimit + " " + this.state.searchResultsProcessedData.length + " " + this.state.searchResultsTotalNumber);
			if (
				this.state.searchResultsBackgroundDataRequestStatus !==
						Constants.DATA_REQUEST_STATUS.LOADING &&
					this.state.searchResultsProcessedData.length <=
						newSearchResultRequestLimit &&
					this.state.searchResultsProcessedData.length <
						this.state.searchResultsTotalNumber
			) {
				this.setState(
					{
						searchResultsBackgroundDataRequestStatus:
								Constants.DATA_REQUEST_STATUS.LOADING
					},
					() => {
						this.requestData(
							this.state.lastSearchType,
							this.state.lastSelectedSource,
							this.state.lastSearchText
						);
					}
				);
			}
			break;

		case Constants.ARTEFACTS_BUTTON:
			this.setState({
				display_page: Constants.PAGES.ARTEFACT_SEARCH,
				status_message: ''
			});
			break;

		case Constants.EXHIBITION_BUTTON:
			this.setState({
				display_page: Constants.PAGES.EXHIBITION_BROWSER,
				status_message: ''
			});
			break;

		case Constants.USER_MANAGEMENT_BUTTON:
			this.setState({
				display_page: Constants.PAGES.USER_MANAGEMENT
			});
			break;

		case Constants.SELECTOR_LOGIN:
			this.setState({
				user_management_selector: Constants.SELECTOR_LOGIN
			});
			break;

		case Constants.SELECTOR_REGISTER:
			this.setState({
				user_management_selector: Constants.SELECTOR_REGISTER
			});
			break;

		case Constants.SEARCH_CELL:
		case Constants.SEARCH_PREVIEW_IMAGE:
		case Constants.EXHIBITION_CONTENTS_CELL:
			const artefact_id = event.target.id.substring(
				event.target.id.indexOf(Constants.SEARCH_CELL) +
						Constants.SEARCH_CELL.length +
						1
			);
			const temp_institution = this.state.exibition_artefacts[event.target.id.substring(0, event.target.id.indexOf("_"))].SourceCollection;
			//console.log(temp_institution);
			console.log('worked! ' + artefact_id);
			if (artefact_id !== this.state.artefactId) {
				this.setState({
					singleArtefactDataRequestStatus:
							Constants.DATA_REQUEST_STATUS.LOADING,
					singleArtefactErrorMessage: null,
					artefactId: artefact_id
				});
				const search_source = this.state.lastSearchSource ? this.state.lastSearchSource : temp_institution;
				this.requestData(
					Constants.REQUEST_TYPE.SINGLE_ARTEFACT,
					search_source,
					artefact_id
				);
			} else {
				console.log(
					'artefact ' + artefact_id + ' already displayed - so not reloading.'
				);
			}
			break;

		case Constants.EXHIBITION_LIST_CELL:
			var exhibition_id = event.target.id.substring(
				event.target.id.indexOf(Constants.EXHIBITION_LIST_CELL) +
						Constants.EXHIBITION_LIST_CELL.length +
						1
			);
			var tempArrayID = event.target.id.substring(0,
					event.target.id.indexOf("_")
				);
			console.log(
				'worked! NEW EXHIBITION ID:' +
						exhibition_id +
						', STATE EXHIBITION ID: ' +
						this.state.exhibition_id + ', array ID: ' + tempArrayID
			);
			if (exhibition_id !== this.state.exhibition_id) {
				const tempArray = this.state.exhibitions_all_collections[tempArrayID];
				this.setState({
					exhibition_id: exhibition_id,
					exibition_details: tempArray,
				},
				() => {
					//console.log(exhibition_id);
					LocalDataAccess.load_exhibition_artefacts(exhibition_id).then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							this.setState({
								status_message: returned_data.internal_data,
								exibition_artefacts: returned_data.exhibition_artefacts
							});
						} else {
							console.log('exhibition artefacts collection error');
							return 'exhibition artefacts collection error';
						}
					});
				});
			} else {
				console.log(
					'Exhibition ' +
							exhibition_id +
							' already displayed - so not reloading.'
				);
			}
			break;

		default:
			console.log('Unexpected object clicked!');
			break;
		}
	}

	handleChange(event) {
		switch (event.target.id) {
		case Constants.SEARCH_INPUTBOX:
			this.setState({
				searchText: event.target.value
			});
			break;

		case Constants.SEARCH_SOURCE_SELECT:
			this.setState({
				selectedSource: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_USERNAME:
			this.setState({
				user_management_username: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_FIRST_NAME:
			this.setState({
				user_management_first_name: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_SURNAME:
			this.setState({
				user_management_surname: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_EMAIL:
			this.setState({
				user_management_email: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_PASSWORD:
			this.setState({
				user_management_password: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_PASSWORDCONF:
			this.setState({
				user_management_passwordconf: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_NEW_USERNAME:
			this.setState({
				user_management_new_username: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_NEW_EMAIL:
			this.setState({
				user_management_new_email: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_NEW_FIRST_NAME:
			this.setState({
				user_management_new_first_name: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_NEW_SURNAME:
			this.setState({
				user_management_new_surname: event.target.value
			});
			break;

		case Constants.INPUT_TEXT_NEW_PASSWORD:
			var tempNewPassword = '';
			if (event.target.value === '') {
				tempNewPassword = Constants.PASSWORD_UNCHANGED_PLACEHOLDER;
			} else if (
				event.target.value ===
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.substring(
						0,
						event.target.value.length
					)
			) {
				tempNewPassword = '';
			} else if (
				event.target.value.substring(
					0,
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.length
				) === Constants.PASSWORD_UNCHANGED_PLACEHOLDER
			) {
				tempNewPassword = event.target.value.substring(
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.length
				);
			} else {
				tempNewPassword = event.target.value;
			}
			this.setState({
				user_management_new_password: tempNewPassword
			});
			break;

		case Constants.INPUT_TEXT_NEW_PASSWORDCONF:
			var tempNewPasswordConf = '';
			if (event.target.value === '') {
				tempNewPasswordConf = Constants.PASSWORD_UNCHANGED_PLACEHOLDER;
			} else if (
				event.target.value ===
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.substring(
						0,
						event.target.value.length
					)
			) {
				tempNewPasswordConf = '';
			} else if (
				event.target.value.substring(
					0,
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.length
				) === Constants.PASSWORD_UNCHANGED_PLACEHOLDER
			) {
				tempNewPasswordConf = event.target.value.substring(
					Constants.PASSWORD_UNCHANGED_PLACEHOLDER.length
				);
			} else {
				tempNewPasswordConf = event.target.value;
			}
			this.setState({
				user_management_new_passwordconf: tempNewPasswordConf
			});
			break;

		case Constants.SEARCH_RESULTS_NUMBER_SELECT:
			var newSearchResultRequestLimit =
					this.state.searchResultsStartRange +
						parseInt(event.target.value, 10) -
						1 +
						Constants.DATA_RESULTS_DOWNLOAD_LIMIT <=
					this.state.searchResultsTotalNumber
						? this.state.searchResultsStartRange +
						  parseInt(event.target.value, 10) -
						  1 +
						  Constants.DATA_RESULTS_DOWNLOAD_LIMIT
						: this.state.searchResultsTotalNumber;

			if (
				event.target[event.target.selectedIndex].text ===
					Constants.NO_OF_RESULTS_TO_SHOW.ALL
			) {
				this.setState({
					selectedNumSearchResults: event.target.value,
					searchResultsStartRange: 1,
					searchResultsEndRange: this.state.searchResultsTotalNumber,
					searchResultRequestLimit: this.state.searchResultsTotalNumber
				});
				newSearchResultRequestLimit = this.state.searchResultsTotalNumber;
			} else {
				var upperLimit =
						this.state.searchResultsStartRange +
						parseInt(event.target.value, 10) -
						1;
				upperLimit =
						upperLimit > this.state.searchResultsTotalNumber
							? this.state.searchResultsTotalNumber
							: upperLimit;
				this.setState({
					selectedNumSearchResults: event.target.value,
					searchResultsEndRange: upperLimit,
					searchResultRequestLimit: newSearchResultRequestLimit
				});
			}
			if (
				this.state.searchResultsBackgroundDataRequestStatus !==
						Constants.DATA_REQUEST_STATUS.LOADING &&
					this.state.searchResultsProcessedData.length <=
						newSearchResultRequestLimit &&
					this.state.searchResultsProcessedData.length <
						this.state.searchResultsTotalNumber
			) {
				this.requestData(
					this.state.lastSearchType,
					this.state.lastSelectedSource,
					this.state.lastSearchText
				);
			}
			break;

		case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
		case Constants.REQUEST_TYPE.COLLECTION_SEARCH: {
			this.setState({
				selectedSearchType: event.target.id
			});
			break;
		}

		default:
			break;
		}
	}

	getPage() {
		switch (this.state.display_page) {
		case Constants.PAGES.ARTEFACT_SEARCH:
			return (
					<>
						<SearchControls
							selected_source={this.state.selectedSource}
							selected_search_type={this.state.selectedSearchType}
							search_text={this.state.searchText}
							onChange={this.handleChange}
							onClick={this.handleClick}
						/>
						<div className="external-data">
							<SearchResults
								dataRequestStatus={this.state.searchResultsDataRequestStatus}
								searchData={this.state.searchResultsProcessedData}
								errorMessage={this.state.searchResultsErrorMessage}
								selectedNumSearchResults={this.state.selectedNumSearchResults}
								searchResultsStartRange={this.state.searchResultsStartRange}
								searchResultsEndRange={this.state.searchResultsEndRange}
								searchResultsTotalNumber={this.state.searchResultsTotalNumber}
								searchResultsBackgroundDataRequestStatus={
									this.state.searchResultsBackgroundDataRequestStatus
								}
								onChange={this.handleChange}
								onClick={this.handleClick}
							/>
							<ArtefactDetails
								dataRequestStatus={this.state.singleArtefactDataRequestStatus}
								source={this.state.lastSearchSource}
								objectData={this.state.singleArtefactProcessedData}
								errorMessage={this.state.singleArtefactErrorMessage}
								onClick={this.handleClick}
							/>
						</div>
					</>
			);

		case Constants.PAGES.EXHIBITION_BROWSER:
			return (
				<ExhibitionBrowser
					status_message={this.state.status_message}
					exhibitions_all_collections={this.state.exhibitions_all_collections}
					exibition_artefacts={this.state.exibition_artefacts}
					exibition_details={this.state.exibition_details}
					dataRequestStatus={this.state.singleArtefactDataRequestStatus}
					source={this.state.lastSearchSource}
					objectData={this.state.singleArtefactProcessedData}
					errorMessage={this.state.singleArtefactErrorMessage}
					onClick={this.handleClick}
				/>
			);

		case Constants.PAGES.USER_MANAGEMENT:
			return (
				<UserProfile
					user_status={this.state.user_status}
					user_status_loading={this.state.user_status_loading}
					status_message={this.state.status_message}
					user_management_selector={this.state.user_management_selector}
					user_management_username={this.state.user_management_username}
					user_management_email={this.state.user_management_email}
					user_management_first_name={this.state.user_management_first_name}
					user_management_surname={this.state.user_management_surname}
					user_management_password={this.state.user_management_password}
					user_management_passwordconf={
						this.state.user_management_passwordconf
					}
					user_management_new_username={
						this.state.user_management_new_username
					}
					user_management_new_email={this.state.user_management_new_email}
					user_management_new_first_name={
						this.state.user_management_new_first_name
					}
					user_management_new_surname={this.state.user_management_new_surname}
					user_management_new_password={
						this.state.user_management_new_password
					}
					user_management_new_passwordconf={
						this.state.user_management_new_passwordconf
					}
					onClick={this.handleClick}
					onChange={this.handleChange}
				/>
			);

		default:
			break;
		}
	}

	regularTasks() {
		this.refreshAllExhibitions();
	}

	refreshAllExhibitions() {
		LocalDataAccess.find_all_exhibitions().then(returned_data => {
			if (returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS) {
				this.setState({
					exhibitions_all_collections: returned_data.exhibitions_data
				});
				setTimeout(this.refreshAllExhibitions.bind(this), 60000);
			} else {
				console.log('artefact collection error');
				return 'artefact collection error';
			}
		});
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>
						<img src={logo} className="App-logo" alt="logo" />
						Museum Companion
					</h2>
					<UserSlug
						user_status={this.state.user_status}
						username={this.state.user_management_username}
						onClick={this.handleClick}
					/>
				</div>
				<MainMenu
					display_page={this.state.display_page}
					onClick={this.handleClick}
				/>
				{this.getPage()}
			</div>
		);
	}
}

function UserSlug(props) {
	if (
		props.user_status === Constants.USER_STATUS.LOGGED_IN ||
		props.user_status === Constants.USER_STATUS.EDITING_PROFILE
	) {
		return (
			<div className={Constants.DISPLAY_LOGGED_IN_MESSAGE}>
				<p>
					Signed in as '{props.username}' &nbsp;&nbsp;
					<input
						type="button"
						id={Constants.LOGOUT_BUTTON}
						className={Constants.DISPLAY_LINK_BUTTON_SMALL}
						onClick={props.onClick}
						value="Logout"
					/>
				</p>
			</div>
		);
	} else {
		return null;
	}
}

export default App;
