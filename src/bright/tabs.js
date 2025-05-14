import Code, { extensions } from './bright';

import { TabsRoot, TabsContent, TabsList } from '@/components/ui/tabs';

function TitleBarComponent(brightProps) {
  const { subProps, title, Tab } = brightProps;
  const titles = subProps?.length ? subProps.map((subProp) => subProp.title) : [title];
  const childProps = subProps?.length ? subProps : [brightProps];

  return (
    <TabsList titles={titles}>
      {titles.map((title, i) => (
        <Tab key={title} {...childProps[i]} />
      ))}
    </TabsList>
  );
}

function Root(brightProps) {
  const { subProps, title } = brightProps;

  const titles = subProps?.length ? subProps.map((subProp) => subProp.title) : [title];

  return (
    <TabsRoot defaultValue={titles[0]}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-bright-tab][data-state="inactive"]{
  --tab-background: var(--inactive-tab-background);
  --tab-color: var(--inactive-tab-color);;
  --tab-bottom-border: transparent;
  --tab-top-border: transparent;
}`,
        }}
      />
      <Code.Root {...brightProps} />
    </TabsRoot>
  );
}

function Content(brightProps) {
  const { subProps } = brightProps;
  const propsList = subProps?.length ? subProps : [brightProps];
  return (
    <>
      {propsList.map((props) => (
        <TabsContent key={props.title} value={props.title}>
          <Code.Pre {...props} />
        </TabsContent>
      ))}
    </>
  );
}

export const tabs = {
  name: 'tabs',
  Root,
  TitleBarContent: TitleBarComponent,
  Pre: Content,
};

export function Tabs({ children }) {
  return <Code children={children} extensions={[...extensions, tabs]} />;
}
