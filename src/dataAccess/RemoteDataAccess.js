import * as Constants from '../constants/Constants.js';

async function getData(requestType, dataSource, searchTerm) {
    var url = buildUrl(requestType, dataSource, searchTerm);
    var returnData = await makeRemoteDataRequest(url);
    //alert('returning...');
    return returnData;
}

function buildUrl(requestType, dataSource, searchTerm) {
    let finalURL = null;

    switch (requestType) {
        case Constants.REQUEST_TYPE.SINGLE_ARTEFACT:
            switch (dataSource) { // TURN THIS INTO GENERIC FUNCTION BASED ON PATTERN OF URL?
                case Constants.SOURCES.V_AND_A:
                finalURL = Constants.V_AND_A.URL_ARTEFACT_ROOT + searchTerm
                break;
        
                case Constants.SOURCES.BRITISH_MUSEUM:
                finalURL = Constants.BRITISH_MUSEUM.URL_ARTEFACT_ROOT + searchTerm + "/root"
                break;
        
                case Constants.SOURCES.OTHER:
                finalURL = "https://otherurl.com/" + searchTerm
                break;
        
                default:
                break;
            }
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
    var returnData = [Constants.DATA_REQUEST_STATUS.LOADING, null, null];
    await fetch(url)
        .then(res => res.json())
        .then(
        (result) => {
            returnData[0] = Constants.DATA_REQUEST_STATUS.SUCCESS;
            returnData[1] = result;
            //alert('mRDR: return length: ' + returnData.length);
            //alert('success');
            }
        ,
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            returnData[0] = Constants.DATA_REQUEST_STATUS.FAILURE;
            returnData[2] = error.message;
            //alert('fail');
            }
        );
    //alert('loading...');

    return returnData;
}

export default getData