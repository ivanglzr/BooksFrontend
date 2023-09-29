export default function validateNumber(num) {
  if (typeof num !== "number" || num <= 0) {
    return false;
  }

  return true;
}
