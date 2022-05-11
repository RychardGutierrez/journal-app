import Swal from "sweetalert2";

export const messageErrorName = { messageError: "Name is required" };

export const messageErrorEmail = { messageError: "Email is required" };

export const messageErrorPassword = {
  messageError: "Password is not strong required or is do not equals",
};

export const messageErrorWrongEmailOrPassword = {
  messageError: "Email or Password is wrong",
};

export const messageErrorRegisterNewUser = {
  messageError: "Error register user try later",
};

export const messageLoginError = () =>
  Swal.fire({
    title: "Ups login",
    text: messageErrorWrongEmailOrPassword.messageError,
    icon: "error",
  });

export const messageNoteUpdateError = () =>
  Swal.fire({ title: "Ups Note do not update", icon: "warning" });
