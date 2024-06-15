export const applyMask = (text, mask) => {
  const cleaned = ("" + text).replace(/\D/g, "");

  let maskedText = "";
  let maskCharIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (maskCharIndex >= cleaned.length) break;

    if (mask[i] === "X") {
      maskedText += cleaned[maskCharIndex++];
    } else {
      maskedText += mask[i];
    }
  }

  return maskedText;
};

export const maskPhoneNumber = (text) => {
  return applyMask(text, "(XX) XXXXX-XXXX");
};

export const maskCPF = (text) => {
  return applyMask(text, "XXX.XXX.XXX-XX");
};
