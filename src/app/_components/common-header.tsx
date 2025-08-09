import React from 'react';
import { CustomBreadcrumb } from './custom-breadcrumb';
import { HeaderActions } from './header-action';

type Props = {};

export default function CommonHeader(props: Props) {
   return (
      <div className="flex h-10 justify-between items-center px-6 py-3.5">
         <CustomBreadcrumb />
         {/* <HeaderActions userCount={150} hasUnreadShares={true} /> */}
      </div>
   );
}
