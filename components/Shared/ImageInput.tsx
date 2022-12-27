import React from 'react';

type Props = {
  id: string
  label: string
  multiple: boolean
  // eslint-disable-next-line no-unused-vars
  imageChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({
  id, label, multiple, imageChangeHandler,
}: Props) => (
  <>
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type="file"
        multiple={multiple}
        onChange={imageChangeHandler}
      />
    </label>
    <br />
  </>
);

export default ImageInput;
