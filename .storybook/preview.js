import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import '../src/config/icons';

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 10px;
    }
    
    body {
      font-size: 1.4rem;
      font-family: Roboto, sans-serif;
      color: #141414;
    }
    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      outline: none;
    }
`;

export const parameters = {
  layout: 'centered',
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 500px;
  height: 300px;
`;

export const decorators = [
  (Story) => (
    <Fragment>
      <Container>
        <Story />
      </Container>
      <GlobalStyle />
    </Fragment>
  ),
];
