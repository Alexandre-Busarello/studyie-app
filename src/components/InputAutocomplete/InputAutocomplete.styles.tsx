import styled from 'styled-components/native';
import Autocomplete from 'react-native-autocomplete-input';

export const AutocompleteWrapper = styled.View`
  position: relative;
  height: 46px;
  flex: 1;
`;
export const TAutocomplete = styled(Autocomplete)`
  position: relative;
  bottom: 0px;
  right: 0px;
  padding-left: 16px;
  background: #fff;
`;

export const TAutocompleteItem = styled.TouchableOpacity`
  padding-left: 10px;
  justify-content: center;
  height: 30px;
`;
