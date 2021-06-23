import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${
    '' /* * {
    outline: 1px solid 
  } */
  }
  
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Helvetica', Open-Sans, Arial;
    transition: all 0.50s linear;
    font-size: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.link.text};
    cursor: pointer;
  }

  button {
    border: 0;
    display: inline-block;
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
    font-family: 'Helvetica', Open-Sans, Arial;
  }

  button.btn {
    font-size: 1.2rem;
    padding: 1rem;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.colors.shadow};
  }
`;
