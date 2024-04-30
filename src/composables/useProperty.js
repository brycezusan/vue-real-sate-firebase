import { useFirestore, useDocument } from "vuefire";
import { doc, updateDoc } from "firebase/firestore";

export const useProperty = (id) => {
  const db = useFirestore();
  const docRef = doc(db, "properties", id);
  const propiedad = useDocument(docRef);

  async function updateProperty(propiedad) {
    await updateDoc(docRef, propiedad);
  }



  return {
    propiedad,
    updateProperty,
  };
};
