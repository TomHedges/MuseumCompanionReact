//
// Constants
//

//import * as Constants_V_AND_A from './Institution_Constants_V_AND_A.js';
//import * as Constants_BRITISH_MUSEUM from './Institution_Constants_BRITISH_MUSEUM.js';

//export const V_AND_A = Constants_V_AND_A.INSTITUTION_CONSTANTS_V_AND_A
//export const BRITISH_MUSEUM = Constants_BRITISH_MUSEUM.INSTITUTION_CONSTANTS_BRITISH_MUSEUM

export const SOURCES = {
	V_AND_A: 'V&A Museum',
	BRIT_NAT_BIB: 'British National Bibliography',
	BRITISH_MUSEUM: 'British Museum',
	OTHER: 'Other... TBC...'
};
export const DEFAULT_SOURCE = 'V_AND_A';

export const PAGES = {
	ARTEFACT_SEARCH: 'artefact_search',
	EXHIBITION_BUILDER: 'exhibition_builder',
	USER_MANAGEMENT: 'user_management'
};

export const USER_STATUS = {
	REQUEST_PENDING: 'request_pending',
	LOGGED_IN: 'logged_in',
	LOGGED_OUT: 'logged_out',
	LOGIN_FAILED: 'login_failed',
	REGISTRATION_FAILED: 'registration_failed'
};

export const MESSAGE_NO_IMAGE = 'No image of this artefact is available';

export const DATA_FIELDS = {
	DATA_REQUEST_STATUS: 'DataRequestStatus',
	ERROR_MESSAGE: 'ErrorMessage',
	RAW_DATA: 'RawData',
	PROCESSED_DATA: 'ProcessedData'
};

export const SEARCH_SOURCE_SELECT = 'search_source_select';
export const SEARCH_INPUTBOX = 'search_inputbox';
export const SEARCH_BUTTON = 'search_button';
export const RESET_BUTTON = 'reset_button';
export const REQUEST_TYPE = {
	SINGLE_ARTEFACT: 'singleArtefact',
	COLLECTION_SEARCH: 'searchResults'
};

export const DATA_REQUEST_RESULT = 'data_request_result';
export const DATA_REQUEST_ERROR = 'data_request_error';
export const DATA_REQUEST_RAW_DATA = 'data_request_raw_data';
export const DATA_REQUEST_PROCESSED_DATA = 'data_request_processed_data';
export const DATA_REQUEST_NUMBER_RESULTS = 'data_request_number_results';
export const DATA_REQUEST_STATUS = {
	NONE_MADE: 'none',
	LOADING: 'loading',
	SUCCESS: 'success',
	FAILURE: 'failure'
};
export const DATA_REQUEST_LIMIT = 20;
export const DATA_RESULTS_DOWNLOAD_LIMIT = 100;

export const SEARCH_TABLE = 'search_table';
export const SEARCH_TABLE_SUMMARY_COLUMN = 'search_table_summary_column';
export const SEARCH_TABLE_IMAGE_COLUMN = 'search_table_image_column';
export const SEARCH_CELL = 'search_cell';
export const SEARCH_RESULT_NAME = 'search_result_name';
export const SEARCH_PREVIEW_IMAGE = 'search_preview_image';
export const ARTEFACT_PREVIEW_IMAGE = 'artefact_preview_image';

export const ARTEFACTS_BUTTON = 'artefacts_button';
export const EXHIBITION_BUTTON = 'exhibition_button';
export const USER_MANAGEMENT_BUTTON = 'user_management_button';
export const PREVIOUS_BUTTON = 'previous_button';
export const NEXT_BUTTON = 'next_button';
export const REGISTER_BUTTON = 'register_button';
export const LOGIN_BUTTON = 'login_button';
export const LOGOUT_BUTTON = 'logout_button';

export const INPUT_TEXT_USERNAME = 'input_text_username';
export const INPUT_TEXT_PASSWORD = 'input_text_password';
export const INPUT_TEXT_PASSWORDCONF = 'input_text_passwordconf';
export const INPUT_TEXT_EMAIL = 'input_text_email';

export const SELECTOR_LOGIN = 'selector_login';
export const SELECTOR_REGISTER = 'selector_register';
export const SELECTOR_NONE = 'selector_none';

export const SEARCH_RESULTS_NUMBER_SELECT = 'search_results_number_select';
export const NO_OF_RESULTS_TO_SHOW = {
	5: 5,
	10: 10,
	25: 25,
	50: 50,
	100: 100,
	ALL: 'All'
};
export const DEFAULT_NO_OF_RESULTS_TO_SHOW = '50';

export const DISPLAY_TAB_WRAPPER = 'display_tab_wrapper';
export const DISPLAY_TAB_FILLER = 'display_tab_filler';
export const DISPLAY_TAB = 'display_tab';
export const DISPLAY_TAB_SELECTED = 'display_tab_selected';
export const DISPLAY_ = 'display_';

export const DISPLAY_SEARCH_CONTROLS = 'display_search_controls';
export const DISPLAY_SEARCH_CONTROLS_GROUP = 'display_search_controls_group';
export const DISPLAY_SEARCH_CONTROLS_SUBGROUP =
	'display_search_controls_subgroup';
export const DISPLAY_CONTROL_LABEL = 'display_control_label';
export const DISPLAY_SEARCH_RESULTS = 'display_search_results';
export const DISPLAY_SEARCH_RESULTS_MESSAGE = 'display_search_results_message';
export const DISPLAY_SEARCH_RESULTS_MESSAGE_ERROR =
	'display_search_results_message_error';
export const DISPLAY_SEARCH_RESULTS_NAV = 'display_search_results_nav';
export const DISPLAY_ARTEFACT_CONTENT = 'display_artefact_content';
export const DISPLAY_ARTEFACT_MESSAGE = 'display_artefact_message';
export const DISPLAY_ARTEFACT_MESSAGE_ERROR = 'display_artefact_message_error';
export const DISPLAY_PRIMARY_IMAGE = 'display_primary_image';
export const DISPLAY_PRIMARY_IMAGE_WRAPPER = 'display_primary_image_wrapper';
export const DISPLAY_ARTEFACT_DETAILS_GROUP = 'display_artefact_details_group';
export const DISPLAY_ARTEFACT_DETAILS_SUBGROUP =
	'display_artefact_details_subgroup';
export const DISPLAY_ARTEFACT_DETAILS_HEADING =
	'display_artefact_details_heading';
export const DISPLAY_ARTEFACT_DETAILS_SUBHEADING =
	'display_artefact_details_subheading';
export const DISPLAY_ARTEFACT_DETAILS_TEXT = 'display_artefact_details_text';
