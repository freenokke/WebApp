import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({isOpen: true}),
  onClose: () => set({isOpen: false}),
  setOpen: (value) => set({isOpen: value})
}))

export default useModalStore;