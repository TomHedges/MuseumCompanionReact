import * as Constants from '../constants/Constants.js';

const OBJECT_ID_PLACEHOLDER = '---OBJECT_ID---'
const URL_SINGLE_ARTEFACT= 'http://bnb.data.bl.uk/doc/resource/' + OBJECT_ID_PLACEHOLDER + '.json?_properties=title,creator.label,ISBN13';

export function getSingleArtefactURL(objectID) {
	var replacementRegex = new RegExp(OBJECT_ID_PLACEHOLDER,'g');
    return(URL_SINGLE_ARTEFACT.replace(replacementRegex, objectID));
}

export function processSingleArtefactData(rawData) {
    var rawObjectData = rawData[Constants.DATA_REQUEST_RAW_DATA];
    if (rawObjectData.result.primaryTopic.BNBNumber) {
        var fields = {
            objectName: 'Unknown',
            objectSlug: 'Unknown',
            objectPrimaryImageURL: null,
            objectText: 'Unknown',
            objectFullText: 'Unknown',
          }
        fields.objectName = (!rawObjectData.result.primaryTopic.title) ? "Unknown" : rawObjectData.result.primaryTopic.title;
        fields.objectSlug = (rawObjectData.result.primaryTopic.creator.label) ? rawObjectData.result.primaryTopic.creator.label + ': ' + rawObjectData.result.primaryTopic.hasExtent + ', ' + rawObjectData.result.primaryTopic.publication.label : "Unknown";
        fields.objectText = 'Description: ' + rawObjectData.result.primaryTopic.description + '\nISBN: ' + rawObjectData.result.primaryTopic.ISBN13;
        fields.objectFullText = JSON.stringify(rawObjectData);
        rawData[Constants.DATA_REQUEST_PROCESSED_DATA] = fields;
    } else {
        rawData[Constants.DATA_REQUEST_RESULT] = Constants.DATA_REQUEST_STATUS.FAILURE
        rawData[Constants.DATA_REQUEST_ERROR] = 'Sorry - this item does not exist in the British National Bibliography collection.';
    }
    return(rawData);
}