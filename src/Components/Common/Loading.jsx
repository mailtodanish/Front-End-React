import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

function Loading({ size }) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1">
      <Spin size={size} />
    </div>
  );
}

Loading.defaultProps = {
  size: 'default',
};

const { string } = PropTypes;

Loading.propTypes = {
  size: string,
};

export default Loading;
