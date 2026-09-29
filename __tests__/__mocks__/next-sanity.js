// Mock for next-sanity groq function
module.exports = {
  groq: (strings, ...values) => {
    return strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || '');
    }, '');
  }
};
