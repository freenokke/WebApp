export const createBlobURL = (file: File): string => {
  const url = URL.createObjectURL(file)
  return url
}