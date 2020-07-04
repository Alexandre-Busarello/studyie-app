import React from 'react';
import NoResultsSVG from 'assets/images/no-results.svg';
import { Wrapper, WarningText } from '~/components/NoResults/NoResults.styles';

export const NoResults = () => (
  <Wrapper testID="no-results-warning">
    <NoResultsSVG height={300} />
    <WarningText>
      Ops! Não encontramos nenhuma aula com esse filtro :(
    </WarningText>
  </Wrapper>
);
