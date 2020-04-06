import React, { memo } from 'react';

function Divide({ children }: { children: React.ReactNode }) {
  return <div style={{ margin: '20px 0' }}>{children}</div>;
}

export default memo(Divide);
