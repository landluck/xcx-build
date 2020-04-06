import React, { memo } from 'react';

function Title({ title }: { title: string }) {
  return <div className="app__title">{title}</div>;
}

export default memo(Title);
