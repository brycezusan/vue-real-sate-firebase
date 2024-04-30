import { ref } from "vue";

export const useLocation = () => {
  const zoom = ref(16);
  const center = ref([-12.0939592,-76.9977632]);

  function pin(e){
    const marker = e.target.getLatLng()
    center.value = [marker.lat , marker.lng]
  }

  return {
    zoom,
    center,
    pin
  };
};
