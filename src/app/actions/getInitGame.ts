const names = ["dragon", "cow", "cat", "dog", "tiger", "leon", "sheep"];

export const getInitGame = () => {
  const ranIndex = Math.floor(Math.random() * names.length);
  const currentUser = names[ranIndex];

  return {
    userName: "",
    inputCode: "",
  };
};
