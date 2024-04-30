import { useRouter } from "vue-router"
import { defineStore } from "pinia";
import { useFirestore } from "vuefire"
import { collection, addDoc } from "firebase/firestore"; 


export const useFireStore = defineStore('firestore',()=>{

  // * States
  const db = useFirestore()
  const router = useRouter()

  // * Actions
  async function addProperty(data){
    const { image , ...values} = data
    const docRef = await addDoc(collection(db, "properties"), {
      ...values
    })
    if(docRef.id){
      router.push({name:'admin-properties'})
    }
  }

  return{
    addProperty

  }
})