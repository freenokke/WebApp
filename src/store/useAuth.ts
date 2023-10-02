import { create } from 'zustand';

interface AuthStore {
    isAuth: boolean,
    setAuth: (value: boolean) => void
}


const useAuthStore = create<AuthStore>((set, get) => ({
  isAuth: false,
  setAuth: (value) => {
    set({isAuth: value})
  }

}))

export default useAuthStore;