import { ChangeEvent, useCallback, useState } from 'react';

type TValidator = boolean | ((char: string) => boolean) | undefined;

const useInput = (
  initialValue: string = '',
  validator: TValidator = undefined,
) => {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      let willUpdate = true;
      if (validator) {
        if (typeof validator === 'function') {
          willUpdate = validator(value);
        } else {
          willUpdate = validator;
        }
      }

      if (willUpdate) setValue(value);
    },
    [setValue, validator],
  );

  return [value, onChange] as const;
};

export default useInput;
