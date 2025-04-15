export const middleEllipsis = (str, len) => {
    if (!str) {
      return '';
    }
  
    return `${str.substr(0, len)}...${str.substr(str.length - len, str.length)}`;
  };