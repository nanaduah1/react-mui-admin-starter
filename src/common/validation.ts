export const Validator = {
  isValidPhoneNumber: (val: string) => !isNaN(Number(val)) && val.length === 10,
  numberBetween: (val: string, max: number = 1000000, min: number = 0) =>
    !isNaN(Number(val)) && Number(val) <= max && Number(val) >= min,
  isNullOrBlank: (val: string) => !val,
};
