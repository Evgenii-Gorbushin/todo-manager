const linefeed = () => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV === 'development') {
    console.log('');
  }
};

export default linefeed;
