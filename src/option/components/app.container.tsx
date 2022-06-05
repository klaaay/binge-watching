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
    watch,
  } = useForm<Binge>();
  const submitRef = useRef<HTMLInputElement>(null);

  const watchIsEnd = watch('isEnd', false);

  return {
    register,
    handleSubmit,
    errors,
    submitRef,
    reset,

    binges,
    setBinges,
    watchIsEnd,
  };
}

export const OptionContainer = createContainer(_useOptionState);
export const useOptionState = OptionContainer.useContainer;
