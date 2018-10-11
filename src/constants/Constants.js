//
// Constants
//

//import * as Constants_V_AND_A from './Institution_Constants_V_AND_A.js';
//import * as Constants_BRITISH_MUSEUM from './Institution_Constants_BRITISH_MUSEUM.js';

//export const V_AND_A = Constants_V_AND_A.INSTITUTION_CONSTANTS_V_AND_A
//export const BRITISH_MUSEUM = Constants_BRITISH_MUSEUM.INSTITUTION_CONSTANTS_BRITISH_MUSEUM

export const SOURCES = {
  V_AND_A: "V&A Museum",
  BRIT_NAT_BIB: "British National Bibliography",
  BRITISH_MUSEUM: "British Museum",
  OTHER: "Other... TBC...",
}
export const DEFAULT_SOURCE = "V_AND_A"

export const DATA_FIELDS = {
  DATA_REQUEST_STATUS: "DataRequestStatus",
  ERROR_MESSAGE: "ErrorMessage",
  RAW_DATA: "RawData",
  PROCESSED_DATA: "ProcessedData",
}

export const SEARCH_SOURCE_SELECT = "search_source_select"
export const SEARCH_INPUTBOX = "search_inputbox"
export const SEARCH_BUTTON = "search_button"
export const REQUEST_TYPE = {
  SINGLE_ARTEFACT: "singleArtefact",
  COLLECTION_SEARCH: "searchResults",
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

export const SEARCH_CELL = "search_cell";
export const SEARCH_PREVIEW_IMAGE = "search_preview_image";
export const ARTEFACT_PREVIEW_IMAGE = "artefact_preview_image";

export const PREVIOUS_BUTTON = "previous_button";
export const NEXT_BUTTON = "next_button";

export const SEARCH_RESULTS_NUMBER_SELECT = "search_results_number_select";
export const NO_RESULTS_TO_SHOW = {
  25: 25,
  50: 50,
  100: 100,
  ALL: "All",
}
export const DEFAULT_NO_RESULTS_TO_SHOW = "100";