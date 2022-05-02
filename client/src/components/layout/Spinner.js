import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <img
    className="spinner-layout"
    src={spinner}
    alt='Loading...'
  />
);

export default Spinner;
