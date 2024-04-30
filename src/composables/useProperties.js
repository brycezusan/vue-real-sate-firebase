import { computed, ref } from "vue";
import { useFirestore, useCollection , useFirebaseStorage} from "vuefire";
import { collection, deleteDoc } from "firebase/firestore";
import { ref as storageRef , deleteObject} from "firebase/storage"

export const useProperties = () => {
  // * States
  const storage = useFirebaseStorage()
  const db = useFirestore();
  const propertiesCollection = useCollection(collection(db, "properties"));
  const piscina = ref(false);

  // * Actions

  async function deleteItem(id , urlImagen) {
    if(confirm('¿Deseas Eliminar la propiedad?')){
      const docRef = doc(db, "properties", id);
      const imageRef = storageRef(storage,urlImagen)
      
      await Promise.all([
        deleteDoc(docRef),
        deleteObject(imageRef)
      ])
    }
  }

  // * Getters
  const formatCurrency = computed(() => {
    return (price) =>
      Number(price).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  });

  const propiedadesFiltered = computed(() => {
    return piscina.value
      ? propertiesCollection.value.filter((item) => item.pool)
      : propertiesCollection.value;
  });

  return {
    propertiesCollection : propiedadesFiltered,
    formatCurrency,
    piscina,
    deleteItem
  };
};
