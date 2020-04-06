import React, { memo } from 'react';
import { Tag } from 'antd';
import { AppType } from './service';

export const AppTypeTheme = {
  wx: '#07c160',
};

function AppTypeNode({ type }: { type: AppType }) {
  return <Tag>{type.name}</Tag>;
}

export default memo(AppTypeNode);
