import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  TAutocomplete,
  TAutocompleteItem,
  AutocompleteWrapper,
} from './InputAutocomplete.styles';

interface AutocompleteConfigs {
  data: Array<string>;
  autoCapitalize: string;
  autoCorrect: boolean;
  setData: (item) => void;
}

export const InputAutocomplete = ({ autocompleteConfigs, ...rest }) => {
  const typedAutocompleteConfig: AutocompleteConfigs = autocompleteConfigs;
  const {
    autoCapitalize,
    autoCorrect,
    data,
    setData,
  } = typedAutocompleteConfig;
  const [query, setQuery] = useState('');

  const filterData = () => {
    const { data } = autocompleteConfigs;

    if (!query) {
      return [];
    }
    return data?.filter((el, index) => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
  };

  const handleAutocompleteChange = (text: string) => {
    const { data } = autocompleteConfigs;

    setQuery(text);

    const item = data?.find((d) => d === text);
    item ? setData(item) : setData('');
  };

  const filteredData = filterData();

  return (
    <AutocompleteWrapper>
      <TAutocomplete
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        data={filteredData}
        defaultValue={query}
        onChangeText={handleAutocompleteChange}
        keyExtractor={item => item}
        renderItem={({ item }) => (
            <TAutocompleteItem onPress={() => handleAutocompleteChange(item)}>
              <Text>{item}</Text>
            </TAutocompleteItem>
        )}
        {...rest}
      />
    </AutocompleteWrapper>
  );
};
