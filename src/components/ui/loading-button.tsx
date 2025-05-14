import { Button, ButtonProps } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import * as React from 'react';

interface Props extends ButtonProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  strikeWhenDisabled?: boolean;
}

const LoadingButton = ({
  children,
  disabled,
  isLoading,
  icon,
  strikeWhenDisabled,
  color,
  ...props
}: Props) => {
  const isDisabled = disabled || isLoading || false;

  return (
    <Button disabled={isDisabled} icon={icon} {...props} className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex scale-75 items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
    </Button>
  );
};

export default LoadingButton;
