export const user_signature = (signature) => {
  return {
    type: 'USER_SIGNED',
    payload: signature,
  };
};

export const clear_signature = () => {
  return {
    type: 'CLEAR_SIGNATURE',
  };
};
