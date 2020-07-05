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
  useStateObject: any;
}

export const InputAutocomplete = ({ autocompleteConfigs, ...rest }) => {
  const typedAutocompleteConfig: AutocompleteConfigs = autocompleteConfigs;
  const {
    autoCapitalize,
    autoCorrect,
    data,
    useStateObject,
  } = typedAutocompleteConfig;
  const [query, setQuery] = useStateObject;
  const [selected, setSelected] = useState(false);

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
    setSelected(false);
  };

  const handleSelected = (text: string) => {
    handleAutocompleteChange(text);
    setSelected(true);
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
          <React.Fragment>
            {
              !selected ? (
                <TAutocompleteItem onPress={() => handleSelected(item)}>
                  <Text>{item}</Text>
                </TAutocompleteItem>
              ) : (
                null
              )
            }
          </React.Fragment>
        )}
        {...rest}
      />
    </AutocompleteWrapper>
  );
};
