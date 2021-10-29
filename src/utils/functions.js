export const IsInvalidId = (id) => {
  return Number.isNaN(parseInt(id, 10));
};
