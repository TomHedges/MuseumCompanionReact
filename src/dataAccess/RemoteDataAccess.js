import * as Constants from '../constants/Constants.js';

async function getData(requestType, dataSource, searchTerm, resultsSoFar) {
	var url = await buildUrl(requestType, dataSource, searchTerm, resultsSoFar);
	var rawData = await makeRemoteDataRequest(url);
	var returnData = await formatRemoteData(requestType, dataSource, rawData);
	return returnData;
}

async function buildUrl(requestType, dataSource, searchTerm, resultsSoFar) {
	var finalURL = null;

	switch (requestType) {
		case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
			console.log('Retrieving Single Artefact');
			await import('../institution_functions/Institution_Functions_' +
				dataSource +
				'.js')
				.then(({ getSingleArtefactURL }) => {
					finalURL = getSingleArtefactURL(searchTerm);
				})
				.catch(err => {
					//alert('problem!');
					console.log('problem! ' + err);
				});
			break;

		case Constants.REQUEST_TYPE.COLLECTION_SEARCH:
			console.log('Retrieving Collection Search');
			await import('../institution_functions/Institution_Functions_' +
				dataSource +
				'.js')
				.then(({ getSearchResultsURL }) => {
					finalURL = getSearchResultsURL(searchTerm, resultsSoFar);
				})
				.catch(err => {
					//alert('problem!');
					console.log('problem! ' + err);
				});
			break;

		default:
			console.log('Retrieving lord knows what');
			break;
	}
	return finalURL;
}

async function makeRemoteDataRequest(url) {
	var returnData = {
		[Constants.DATA_REQUEST_RESULT]: Constants.DATA_REQUEST_STATUS.LOADING,
		[Constants.DATA_REQUEST_ERROR]: null,
		[Constants.DATA_REQUEST_RAW_DATA]: null,
		[Constants.DATA_REQUEST_PROCESSED_DATA]: null
	};

	await fetch(url, { mode: 'cors' })
		.then(res => {
			console.log('Response status from "' + url + '" is: ' + res.status);
			if (res.status === 200) {
				return res;
			} else {
				returnData[Constants.DATA_REQUEST_RESULT] =
					Constants.DATA_REQUEST_STATUS.FAILURE;
				returnData[Constants.DATA_REQUEST_ERROR] = res.statusText;
				return Promise.reject(new Error(res.statusText));
			}
		})
		.then(res => res.json())
		.then(
			result => {
				//console.log(result);
				returnData[Constants.DATA_REQUEST_RESULT] =
					Constants.DATA_REQUEST_STATUS.SUCCESS;
				returnData[Constants.DATA_REQUEST_RAW_DATA] = result;
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			error => {
				if (
					returnData[Constants.DATA_REQUEST_RESULT] ===
					Constants.DATA_REQUEST_STATUS.LOADING
				) {
					returnData[Constants.DATA_REQUEST_RESULT] =
						Constants.DATA_REQUEST_STATUS.FAILURE;
					returnData[Constants.DATA_REQUEST_ERROR] =
						'Sorry, your data could not be loaded. This may be a network error (check your internet connection), or possibly no data was sent back from the institution - check your search!';
				}
			}
		);
	return returnData;
}

async function formatRemoteData(requestType, dataSource, rawData) {
	if (
		rawData[Constants.DATA_REQUEST_RESULT] ===
		Constants.DATA_REQUEST_STATUS.SUCCESS
	) {
		var processedData = null;

		switch (requestType) {
			case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
				await import('../institution_functions/Institution_Functions_' +
					dataSource +
					'.js')
					.then(({ processSingleArtefactData }) => {
						processedData = processSingleArtefactData(rawData);
					})
					.catch(err => {
						console.log('Format remote data - problem! ' + err);
						processedData = rawData;
					});
				break;

			case Constants.REQUEST_TYPE.COLLECTION_SEARCH:
				await import('../institution_functions/Institution_Functions_' +
					dataSource +
					'.js')
					.then(({ processCollectionSearchData }) => {
						processedData = processCollectionSearchData(rawData);
					})
					.catch(err => {
						console.log('Format remote data - problem! ' + err);
						processedData = rawData;
					});
				break;

			default:
				console.log('Processing lord knows what');
				break;
		}
		return processedData;
	} else {
		return rawData;
	}
}

export default getData;
