import { createContainer } from 'unstated-next';
import { useForm } from 'react-hook-form';
import { Binge } from 'common/types';
import { useRef, useState } from 'react';

function _useOptionState() {
  const [binges, setBinges] = useState<Binge[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Binge>();
  const submitRef = useRef<HTMLInputElement>(null);

  return {
    register,
    handleSubmit,
    errors,
    submitRef,
    reset,

    binges,
    setBinges,
  };
}

export const OptionContainer = createContainer(_useOptionState);
export const useOptionState = OptionContainer.useContainer;
