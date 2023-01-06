import styled from 'styled-components';

interface ButtonProps {
  themeColor: string
}

const Button = styled.button<ButtonProps>`
  width: 100%;
  background-color: ${(props) => props.theme[props.themeColor]};
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default Button;
