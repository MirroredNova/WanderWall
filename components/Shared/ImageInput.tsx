import React from 'react';

type Props = {
  id: string
  label: string
  multiple: boolean
  required: boolean
  // eslint-disable-next-line no-unused-vars
  imageChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ImageInput = ({
  id, label, multiple, required, imageChangeHandler,
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
        required={required}
      />
    </label>
    <br />
  </>
);

export default ImageInput;
