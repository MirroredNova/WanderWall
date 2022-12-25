import React from 'react';

type Props = {
  id: string
  label: string
  // eslint-disable-next-line no-unused-vars
  imageChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({
  id, label, imageChangeHandler,
}: Props) => (
  <>
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type="file"
        onChange={imageChangeHandler}
      />
    </label>
    <br />
  </>
);

export default ImageInput;
