import React from 'react';
import styled from 'styled-components';
import { ISection } from '../utils/types';

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  background-color: ${(props) => props.theme.light};
  margin: 8px 0%;
  padding: 16px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .15);

  #header {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  #rating {
    text-align: right;
  }
`;

type Props = {
  section: ISection
}

const GymCardSection = ({ section }: Props) => (
  <SectionContainer>
    <div id="header">
      <h1>{section.name}</h1>
    </div>
    <div id="description">{section.description}</div>
    <div id="rating">{section.rating}</div>
  </SectionContainer>
);

export default GymCardSection;
