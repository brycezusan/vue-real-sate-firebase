import { computed } from "vue"
import { ref  as storageRef } from "firebase/storage"
import { useFirebaseStorage , useStorageFile } from "vuefire"
import { uid } from "uid"

export const useImage = ()=>{

  // * States
  const storage = useFirebaseStorage()
  const storagePath = storageRef(storage,`/propiedades/${uid()}.jpg`)

  // * Actions
  const { url,upload } = useStorageFile(storagePath)

  function uploadImage(e){
    
    const data = e.target.files[0]

    if(data){
      upload(data)
    }
  }

  // * Getters
  const imageUrlPath = computed(()=>{
    return  url.value ? url.value :null
  })

  return{
    url,
    uploadImage,
    imageUrlPath
  }
}