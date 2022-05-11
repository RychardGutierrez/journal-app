import Swal from "sweetalert2";

export const messageWelcome = (text) =>
  Swal.fire({
    title: "Welcome Journal App",
    text: text,
    icon: "success",
  });

export const messageNoteUpdate = () =>
  Swal.fire({ title: "Note update", icon: "success" });

export const messageNoteUpdateWait = () =>
  Swal.fire({
    title: "Uploading...",
    text: "Please wait",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading(),
  });

export const messageNoteDeleteWait = () =>
  Swal.fire({
    title: "Deleting...",
    text: "Please wait",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => Swal.showLoading(),
  });

export const messageClose = () => Swal.close();

export const messageDelete = () =>
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
