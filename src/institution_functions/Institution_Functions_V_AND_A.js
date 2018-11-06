import * as Constants from '../constants/Constants.js';

const PLACEHOLDER = '---OBJECT_ID---'
const URL_SINGLE_ARTEFACT = 'https://www.vam.ac.uk/api/json/museumobject/' + PLACEHOLDER;
const URL_SEARCH = 'https://www.vam.ac.uk/api/json/museumobject/search?q=' + PLACEHOLDER;
const URL_IMAGE_ROOT = 'https://media.vam.ac.uk/media/thira/collection_images/';

export function getSingleArtefactURL(objectID) {
	var replacementRegex = new RegExp(PLACEHOLDER,'g');
    return(URL_SINGLE_ARTEFACT.replace(replacementRegex, objectID));
}

export function getSearchResultsURL(search_text) {
	var replacementRegex = new RegExp(PLACEHOLDER,'g');
    return(URL_SEARCH.replace(replacementRegex, search_text));
}

export function processSingleArtefactData(rawData) {
    var rawObjectData = rawData[Constants.DATA_REQUEST_RAW_DATA];
    var fields = {
        objectName: null,
        objectSlug: 'Slug still to be set up...',
        objectPrimaryImageURL: null,
        objectImages: [],
        objectText: 'Text still to be set up...',
        objectFullText: 'Should be lots of words here...',
        objectFullDetails: [],
        }
    fields.objectName = (!rawObjectData[0].fields.title) ? "Unknown" : rawObjectData[0].fields.title;
    fields.objectSlug = (rawObjectData[0].fields.descriptive_line) ? rawObjectData[0].fields.descriptive_line : rawObjectData[0].fields.materials_techniques + ', ' + rawObjectData[0].fields.date_text;
    if (rawObjectData[0].fields.primary_image_id) {
        fields.objectPrimaryImageURL = URL_IMAGE_ROOT + rawObjectData[0].fields.primary_image_id.substring(0, 6) + '/' + rawObjectData[0].fields.primary_image_id + '.jpg'
    };
    var counter = 0;
    while (counter < rawObjectData[0].fields.image_set.length) {
        fields.objectImages.push(URL_IMAGE_ROOT + rawObjectData[0].fields.image_set[counter].fields.image_id.substring(0, 6) + '/' + rawObjectData[0].fields.image_set[counter].fields.image_id + '.jpg');
        counter++;
    }
    fields.objectText = rawObjectData[0].fields.physical_description;
    fields.objectFullText = JSON.stringify(rawObjectData);
    
    var tempArray = parseFullText(rawObjectData[0].fields);
    //console.log("temparray: " + tempArray);
    fields.objectFullDetails = tempArray
    
    rawData[Constants.DATA_REQUEST_PROCESSED_DATA] = fields;

    return(rawData);
}

export function processCollectionSearchData(rawData) {
    var rawSearchData = rawData[Constants.DATA_REQUEST_RAW_DATA];
    var searchResults = [];

    if (rawSearchData.records.length === 0) {
        rawData[Constants.DATA_REQUEST_RESULT] = Constants.DATA_REQUEST_STATUS.FAILURE;
        rawData[Constants.DATA_REQUEST_ERROR] = 'Sorry, your search returned 0 results!';
    } else {
        var counter = 0;
        while (counter < rawSearchData.records.length) {
            var fields = {
                objectID: "0",
                objectName: "0",
                objectSummary: "0",
                objectPrimaryImageURL: null,
                }
            fields.objectID = rawSearchData.records[counter].fields.object_number;
            fields.objectName = rawSearchData.records[counter].fields.object;
            fields.objectSummary = rawSearchData.records[counter].fields.title + ', ' + rawSearchData.records[counter].fields.artist + ', ' + rawSearchData.records[counter].fields.place + ', ' + rawSearchData.records[counter].fields.date_text;
            fields.objectPrimaryImageURL = rawSearchData.records[counter].fields.primary_image_id ? URL_IMAGE_ROOT + rawSearchData.records[counter].fields.primary_image_id.substring(0, 6) + '/' + rawSearchData.records[counter].fields.primary_image_id + '.jpg' : null;
            
            searchResults.push(fields);
            //console.log(counter);
            //console.log(fields);
            counter++;
        }
        //console.log(searchResults);
        rawData[Constants.DATA_REQUEST_PROCESSED_DATA] = searchResults;
    }

    return(rawData);
}

function parseFullText(rawObjectData) {
    //console.log("test");
    var keys = Object.keys(rawObjectData);
    //console.log("Keys: " + keys);

    var elements = [];
    var counter = 0;
    while (counter < keys.length) {
        var title = keys[counter];
        var text = rawObjectData[keys[counter]];

        var useful = true;

        if (text === null || text === "" || text.length === 0) {
            useful = false;
        } else {
            switch (title) {
                case "sys_updated":
                case "primary_image_id":
                case "object_number":
                case "slug":
                case "cis_id":
                case "museumobject":
                case "museumobject_count":
                case "museumobject_image_count":
                case "image_set":
                case "museum_number_token":
                case "order":
                    useful = false;
                break;

                default:
                break;
            }
        }

        if (useful) {
            if (Array.isArray(text)) {
                //TESTING
                //text = "this is an array!";
                var new_text = [];
                for (var i = 0; i < text.length; i++) {
                    new_text.push(parseFullText(text[i].fields));
                }
                text = new_text;
            }
            title = title.replace(new RegExp("_", 'g'), " ");
            title = title.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            elements.push({
                            "title" : title,
                            "text" : text,
                            });
        }
        counter++;
    }

    return elements;
}