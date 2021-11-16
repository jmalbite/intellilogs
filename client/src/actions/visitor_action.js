export const user_signature = (signature) => {
  return {
    type: 'USER_SIGNED',
    payload: signature,
  };
};
