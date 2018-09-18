import * as Constants from '../constants/Constants.js';

async function getData(requestType, dataSource, searchTerm) {
    var url = await buildUrl(requestType, dataSource, searchTerm);
    var rawData = await makeRemoteDataRequest(url);
    var returnData = await formatRemoteData(dataSource, rawData);
    return returnData;
}

async function buildUrl(requestType, dataSource, searchTerm) {
    var finalURL = null;

    switch (requestType) {
        case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
            await import('../institution_functions/Institution_Functions_' + dataSource + '.js')
                .then(({getSingleArtefactURL}) => {
                    finalURL = getSingleArtefactURL(searchTerm);
                })
                .catch(err => {
                    //alert('problem!');
                    console.log('problem! ' + err);
                });
            break;

        case Constants.REQUEST_TYPE.COLLECTION_SEARCH:
            // BUILD THIS!
            break;

        default:
            break;
    }
    return finalURL;
}

async function makeRemoteDataRequest(url) {
    var returnData = {
        [Constants.DATA_REQUEST_RESULT]: Constants.DATA_REQUEST_STATUS.LOADING,
        [Constants.DATA_REQUEST_ERROR]: null,
        [Constants.DATA_REQUEST_RAW_DATA]: null,
        [Constants.DATA_REQUEST_PROCESSED_DATA]: null,
    };
    await fetch(url, {mode: 'cors'})
        .then(
            (res) => {
                console.log('Response status from "' + url + '" is: ' + res.status);
                if (res.status === 200) {
                    return res;
                } else {
                    returnData[Constants.DATA_REQUEST_RESULT] = Constants.DATA_REQUEST_STATUS.FAILURE;
                    returnData[Constants.DATA_REQUEST_ERROR] = res.statusText;
                    return Promise.reject(new Error(res.statusText));
                }
            }
        )
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                returnData[Constants.DATA_REQUEST_RESULT] = Constants.DATA_REQUEST_STATUS.SUCCESS;
                returnData[Constants.DATA_REQUEST_RAW_DATA] = result;
                }
            ,
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                if (returnData[Constants.DATA_REQUEST_RESULT] === Constants.DATA_REQUEST_STATUS.LOADING) {
                    returnData[Constants.DATA_REQUEST_RESULT] = Constants.DATA_REQUEST_STATUS.FAILURE;
                    returnData[Constants.DATA_REQUEST_ERROR] = 'Sorry, your data could not be loaded. This may be a network error (check your internet connection), or possibly no data was sent back from the institution - check you search!';
                }
            }
        );
    return returnData;
}

async function formatRemoteData(dataSource, rawData) {
    //var test = {
    //    [Constants.DATA_REQUEST_STATUS.LOADING]: 'hello world!',
    //};
    //alert(test[Constants.DATA_REQUEST_STATUS.LOADING]);
    //test[Constants.DATA_REQUEST_STATUS.LOADING] = 'bob';
    //alert(test[Constants.DATA_REQUEST_STATUS.LOADING]);
  
    if (rawData[Constants.DATA_REQUEST_RESULT] === Constants.DATA_REQUEST_STATUS.SUCCESS) {
        var processedData = null;
        await import('../institution_functions/Institution_Functions_' + dataSource + '.js')
        .then(({processSingleArtefactData}) => {
            processedData = processSingleArtefactData(rawData);
        })
        .catch(err => {
            console.log('Format remote data - problem! ' + err);
            processedData = rawData;
        });
        return processedData;
    } else {
        return rawData;
    }
}

export default getData