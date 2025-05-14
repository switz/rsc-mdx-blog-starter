'use client';

import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';

interface TabsRootProps {
  children: React.ReactNode;
  defaultValue: string;
}

export function TabsRoot({ children, defaultValue }: TabsRootProps) {
  return <Tabs.Root defaultValue={defaultValue}>{children}</Tabs.Root>;
}

interface TabsListProps {
  titles: string[];
  children: React.ReactNode;
}

export function TabsList({ titles, children }: TabsListProps) {
  const tabs = React.Children.toArray(children);
  return (
    <Tabs.List style={{ display: 'flex' }}>
      {titles.map((title: string, i: number) => (
        <Tabs.Trigger asChild key={title} value={title}>
          {tabs[i]}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}

interface TabsContentProps extends React.ComponentProps<typeof Tabs.Content> {}

export function TabsContent(props: TabsContentProps) {
  return <Tabs.Content {...props} />;
}
