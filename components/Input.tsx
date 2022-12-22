import React from 'react';

const defaultProps = {
  properties: {},
};

type Props = {
  id: string
  type: string
  label: string
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  properties?: object
  value: any
} & typeof defaultProps

const Input = ({
  id, type, label, onChange, properties,
}: Props) => (
  <>
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type={type}
        onChange={onChange}
        {...properties}
      />
    </label>
    <br />
  </>
);

Input.defaultProps = defaultProps;

export default Input;
