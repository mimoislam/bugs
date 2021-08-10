import React, { useState } from 'react';
import { Appbar, Searchbar } from 'react-native-paper';

import { COLORS } from '../../Constants/colors';

const Header = ({ scene, previous, navigation }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    navigation.setParams({
      query,
    }); /* we set params to the Contacts screen and filtered contacts by query */
    setSearchQuery(query);
  };

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const handleSearch = () => setIsSearch(!isSearch);

  const handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header style={{ backgroundColor: COLORS.main }}>
      <Appbar.Content title={title} />
      {isSearch ? (
        <Searchbar
          style={{ width: '60%' }}
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          onIconPress={handleSearch}
        />
      ) : (
        <Appbar.Action icon='magnify' onPress={handleSearch} />
      )}
      <Appbar.Action icon='dots-vertical' onPress={handleMore} />
    </Appbar.Header>
  );
};

export default Header;
