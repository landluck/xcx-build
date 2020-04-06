import React, { memo } from 'react';
import classnames from 'classnames';
import { AppType } from '../../index/service';

function AppTypeList({
  list,
  activeId,
  onCheck,
}: {
  list: AppType[];
  activeId?: number;
  onCheck: (id: number) => void;
}) {
  return (
    <div className="app__type-wrap">
      {list.map((type, index) => (
        <div
          key={type.id}
          onClick={() => onCheck(type.id)}
          className={classnames([
            'app__type',
            {
              'app__type--active': activeId ? activeId === type.id : index === 0,
            },
          ])}
        >
          {type.name}
        </div>
      ))}
    </div>
  );
}

export default memo(AppTypeList);
