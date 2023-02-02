//get first letter of first name and last name
export const abbreviateName = (str) => {
  let nameArr = str.split(" ");
  if (nameArr.length === 1) {
    return nameArr.map((item) => {
      return item.slice(0, 2);
    });
  } else {
    return nameArr
      .map((item) => {
        return item.slice(0, 1);
      })
      .join("");
  }
};
