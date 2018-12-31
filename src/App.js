import React from 'react';
import * as Constants from './constants/Constants.js';
import SearchControls from './components/SearchControls.js';
import SearchResults from './components/SearchResults.js';
import ArtefactDetails from './components/ArtefactDetails.js';
import MainMenu from './components/MainMenu.js';
import ExhibitionBuilder from './components/ExhibitionBuilder.js';
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
			display_page: Constants.PAGES.USER_MANAGEMENT,
			user_status: Constants.USER_STATUS.LOGGED_OUT,
			user_id: null,
			username: null,
			status_message: '',
			user_management_selector: Constants.SELECTOR_NONE,
			user_management_username: '2ndGo',
			user_management_email: 'bob@bob.com',
			user_management_password: 'test',
			user_management_passwordconf: 'testy',
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
				Constants.DATA_REQUEST_STATUS.NONE_MADE
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
				Constants.DATA_REQUEST_STATUS.NONE_MADE
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
		//console.log('handleClick fired by: ' + event.target.className);

		var category =
			event.target.className === Constants.SEARCH_CELL ||
			event.target.className === Constants.SEARCH_PREVIEW_IMAGE
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

		case Constants.REGISTER_BUTTON:
			this.setState(
				{
					user_status: Constants.USER_STATUS.REQUEST_PENDING
				},
				() => {
					LocalDataAccess.register_new_user(
						this.state.user_management_username,
						this.state.user_management_email,
						this.state.user_management_password,
						this.state.user_management_passwordconf
					).then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							this.setState({
								user_status: Constants.USER_STATUS.LOGGED_IN,
								status_message: returned_data.internal_data
							});
						} else {
							//console.log('login error');
							//return 'login error';
							this.setState({
								user_status: Constants.USER_STATUS.LOGIN_FAILED,
								status_message: returned_data.internal_data
							});
						}
					});
				}
			);

			break;

		case Constants.LOGIN_BUTTON:
			this.setState(
				{
					user_status: Constants.USER_STATUS.REQUEST_PENDING
				},
				() => {
					LocalDataAccess.login(
						this.state.user_management_email,
						this.state.user_management_password
					).then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							this.setState({
								user_status: Constants.USER_STATUS.LOGGED_IN,
								status_message: returned_data.internal_data
							});
						} else {
							//console.log('login error');
							//return 'login error';
							this.setState({
								user_status: Constants.USER_STATUS.LOGIN_FAILED,
								status_message: returned_data.internal_data
							});
						}
					});
				}
			);
			break;

		case Constants.LOGOUT_BUTTON:
			this.setState(
				{
					user_status: Constants.USER_STATUS.REQUEST_PENDING
				},
				() => {
					LocalDataAccess.logout().then(returned_data => {
						if (
							returned_data.result === Constants.DATA_REQUEST_STATUS.SUCCESS
						) {
							this.setState({
								user_status: Constants.USER_STATUS.LOGGED_OUT,
								status_message: returned_data.internal_data
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
				display_page: Constants.PAGES.EXHIBITION_BUILDER,
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
			var artefact_id = event.target.id.substring(
				event.target.id.indexOf(Constants.SEARCH_CELL) +
						Constants.SEARCH_CELL.length +
						1
			);
			console.log('worked! ' + artefact_id);
			if (artefact_id !== this.state.artefactId) {
				this.setState({
					singleArtefactDataRequestStatus:
							Constants.DATA_REQUEST_STATUS.LOADING,
					singleArtefactErrorMessage: null,
					artefactId: artefact_id
				});
				this.requestData(
					Constants.REQUEST_TYPE.SINGLE_ARTEFACT,
					this.state.lastSearchSource,
					artefact_id
				);
			} else {
				console.log(
					'artefact ' + artefact_id + ' already displayed - so not reloading.'
				);
			}
			break;

		case Constants.ARTEFACT_PREVIEW_IMAGE:
			console.log('image clicked! ' + event.target.id);
			var tempData = this.state.singleArtefactProcessedData;
			tempData.objectPrimaryImageURL = event.target.src;
			this.setState({
				singleArtefactProcessedData: tempData
			});
			break;

		default:
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

		case Constants.PAGES.EXHIBITION_BUILDER:
			return (
				<ExhibitionBuilder
					user_status={this.state.user_status}
					user_id={this.state.user_id}
					status_message={this.state.status_message}
					onClick={this.handleClick}
				/>
			);

		case Constants.PAGES.USER_MANAGEMENT:
			return (
				<UserProfile
					user_status={this.state.user_status}
					status_message={this.state.status_message}
					user_management_selector={this.state.user_management_selector}
					user_management_username={this.state.user_management_username}
					user_management_email={this.state.user_management_email}
					user_management_password={this.state.user_management_password}
					user_management_passwordconf={
						this.state.user_management_passwordconf
					}
					onClick={this.handleClick}
					onChange={this.handleChange}
				/>
			);

		default:
			break;
		}
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>
						<img src={logo} className="App-logo" alt="logo" />
						Museum Companion
					</h2>
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

export default App;
