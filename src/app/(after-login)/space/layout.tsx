import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function SpaceLayout({ children }: Props) {
  return <div>{children}</div>;
}
