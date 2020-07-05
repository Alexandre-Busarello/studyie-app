import React from 'react';
import NoResultsSVG from 'assets/images/no-results.svg';
import {
  Wrapper,
  WarningText,
  SvgWrapper,
} from '~/components/NoResults/NoResults.styles';

export const NoResults = () => (
  <Wrapper>
    <SvgWrapper>
      <NoResultsSVG height={300} />
    </SvgWrapper>
    <WarningText>
      Ops! Não encontramos nenhuma aula com esse filtro :(
    </WarningText>
  </Wrapper>
);
