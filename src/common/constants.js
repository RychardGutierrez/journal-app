export const JOURNAL_PATH = "/journal";

export const NOTE_PATH = `${JOURNAL_PATH}/notes`;

export const NEW_NOTE = {
  title: "",
  body: "",
  createdDate: new Date().getTime(),
};

// Label
export const LOGIN = "Login";
export const LOGOUT = "Logout";
export const REGISTER = "Register";
export const SIGN_GOOGLE = "Sign in with google";
export const CREATE_NEW_ACCOUNT = "Create new account";
export const ALREADY_REGISTER = "Already register?";
export const SELECT_SOMETHING = "Select something";
export const CREATE_ENTRY = "Create an entry";
export const NEW_ENTRY = "New Entry";
export const PICTURE = "Picture";
export const SAVE = "Save";
export const DELETE = "Delete";

// format Date
export const FORMAT_WEEK = "ddd";
export const FORMAT_DAY = "DD";
export const FORMAT_DATE = "DD MMM YYYY";
