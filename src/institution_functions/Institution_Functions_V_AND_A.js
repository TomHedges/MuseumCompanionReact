import * as Constants from '../constants/Constants.js';

const OBJECT_ID_PLACEHOLDER = '---OBJECT_ID---'
const URL_SINGLE_ARTEFACT= 'https://www.vam.ac.uk/api/json/museumobject/' + OBJECT_ID_PLACEHOLDER;

export function getSingleArtefactURL(objectID) {
	var replacementRegex = new RegExp(OBJECT_ID_PLACEHOLDER,'g');
    return(URL_SINGLE_ARTEFACT.replace(replacementRegex, objectID));
}

export function processSingleArtefactData(rawData) {
    var rawObjectData = rawData[Constants.DATA_REQUEST_RAW_DATA];
    console.log("1");
    var fields = {
        objectName: null,
        objectSlug: 'Slug still to be set up...',
        objectPrimaryImageURL: null,
        objectText: 'Text still to be set up...',
        objectFullText: 'Should be lots of words here...',
        }
    console.log("2");
    fields.objectName = (!rawObjectData[0].fields.title) ? "Unknown" : rawObjectData[0].fields.title;
    console.log("2a");
    fields.objectSlug = (rawObjectData[0].fields.descriptive_line) ? rawObjectData[0].fields.descriptive_line : rawObjectData[0].fields.materials_techniques + ', ' + rawObjectData[0].fields.date_text;
    console.log("2b");
    if (rawObjectData[0].fields.primary_image_id) {
        fields.objectPrimaryImageURL = 'http://media.vam.ac.uk/media/thira/collection_images/' + rawObjectData[0].fields.primary_image_id.substring(0, 6) + '/' + rawObjectData[0].fields.primary_image_id + '.jpg'
    };
    console.log("3");
    fields.objectText = rawObjectData[0].fields.physical_description;
    console.log("4");
    fields.objectFullText = JSON.stringify(rawObjectData);
    console.log("5");
    rawData[Constants.DATA_REQUEST_PROCESSED_DATA] = fields;
    console.log("6");
    return(rawData);
}