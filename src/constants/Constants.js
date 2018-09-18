//
// Constants
//

//import * as Constants_V_AND_A from './Institution_Constants_V_AND_A.js';
//import * as Constants_BRITISH_MUSEUM from './Institution_Constants_BRITISH_MUSEUM.js';

//export const V_AND_A = Constants_V_AND_A.INSTITUTION_CONSTANTS_V_AND_A
//export const BRITISH_MUSEUM = Constants_BRITISH_MUSEUM.INSTITUTION_CONSTANTS_BRITISH_MUSEUM

export const SOURCES = {
  V_AND_A: "V_AND_A",
  BRIT_NAT_BIB: "BRIT_NAT_BIB",
  BRITISH_MUSEUM: "BRITISH_MUSEUM",
  OTHER: "OTHER",
}
export const SOURCE_DESCRIPTIONS = {
  V_AND_A: "V&A Museum",
  BRIT_NAT_BIB: "British National Bibliography",
  BRITISH_MUSEUM: "British Museum",
  OTHER: "Other... TBC...",
}
export const DEFAULT_SOURCE = SOURCES.V_AND_A

export const SEARCH_SOURCE_SELECT = "search_source_select"
export const SEARCH_INPUTBOX = "search_inputbox"
export const SEARCH_BUTTON = "search_button"

export const REQUEST_TYPE = {
  SINGLE_ARTEFACT: "search_artefact",
  COLLECTION_SEARCH: "collection_search",
}

export const DATA_REQUEST_RESULT = "data_request_result";
export const DATA_REQUEST_ERROR = "data_request_error";
export const DATA_REQUEST_RAW_DATA = "data_request_raw_data";
export const DATA_REQUEST_PROCESSED_DATA = "data_request_processed_data";
export const DATA_REQUEST_STATUS = {
  NONE_MADE: "none",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
}