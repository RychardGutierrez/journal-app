import { getDocs } from "firebase/firestore";
import {
  fireStoreCollection,
  fireStoreDataBase,
} from "../firebase/firebase-config";

import { NOTE_PATH } from "./constants";
import { arrayFireStoreToMap } from "./utils";

export const loadNotes = async (uid) => {
  const dataSnap = await getDocs(
    fireStoreCollection(fireStoreDataBase, `${uid}${NOTE_PATH}`),
  );

  return arrayFireStoreToMap(dataSnap);
};
