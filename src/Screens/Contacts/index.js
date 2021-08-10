import React from 'react';
import { Image, View, FlatList } from 'react-native';
import {
  List,
  Surface,
  Modal,
  Portal,
  Text,
  Button,
  IconButton,
  Avatar,
} from 'react-native-paper';
import { COLORS } from '../../Constants/colors';

import { Loader } from './loader';
// import { SwipeListView } from "react-native-swipe-list-view";
import { styles } from './style';
import useContacts from './useContacts';

const Contacts = ({ route }) => {
  const {
    allContacts,
    sendHeartMessage,
    sendFireMessage,
    visible,
    hideModal,
    setModalEmotionAction,
    heartReaction,
    fireReaction,
  } = useContacts(route);

  const filterContacts =
    allContacts.length &&
    allContacts.filter((item) =>
      item.name?.toLowerCase().includes(route.params?.query?.toLowerCase())
    );

  const renderItem = ({ item }) => {
    let reactionHeartExist;
    let reactionFireExist;
    if (heartReaction === [] || fireReaction === []) {
      reactionHeartExist = null;
      reactionFireExist = null;
    } else
      reactionHeartExist = heartReaction.find(
        (reaction) => reaction === item.phone
      );
    reactionFireExist = fireReaction.find(
      (reaction) => reaction === item.phone
    );

    return (
      <View>
        <Surface style={{ elevation: 6 }}>
          <List.Item
            title={item.name}
            description={item.phone}
            left={(props) => <List.Icon {...props} icon='account-circle' />}
            right={(props) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={styles.border}>
                  <IconButton
                    icon={() => (
                      <>
                        {reactionHeartExist ? (
                          <Image
                            source={require('../../Assets/images/heart.png')}
                            style={styles.image}
                          />
                        ) : (
                          <Image
                            source={require('../../Assets/images/like.png')}
                            style={styles.image}
                          />
                        )}
                      </>
                    )}
                    onPress={() => sendHeartMessage(item.phone)}
                  />
                </View>
                <IconButton
                  icon={() => (
                    <>
                      {reactionFireExist ? (
                        <Image
                          source={require('../../Assets/images/flame.png')}
                          style={styles.image}
                        />
                      ) : (
                        <Image
                          source={require('../../Assets/images/fire.png')}
                          style={styles.image}
                        />
                      )}
                    </>
                  )}
                  onPress={() => sendFireMessage(item.phone)}
                />
              </View>
            )}
          />
        </Surface>
      </View>
    );
  };

  // const renderHiddenItem = (data, rowMap) => (
  //   <View style={styles.rowBack}>
  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnLeft3]}
  //       // onPress={() => deleteRow(rowMap, data.item.key)}
  //     >
  //       <Image
  //         source={require("../../Assets/images/heart.png")}
  //         style={styles.image}
  //       />
  //     </TouchableOpacity>
  //     <TouchableOpacity
  //       style={[styles.backRightBtn, styles.backRightBtnRight]}
  //       // onPress={() => deleteRow(rowMap, data.item.key)}
  //     >
  //       <Image
  //         source={require("../../Assets/images/fire.jpg")}
  //         style={styles.image}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          width: '100%',
          marginTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#e2e2e2',
          paddingHorizontal: 20,
        }}
      >
        <Avatar.Image
          size={32}
          source={require('../../Assets/images/avatar.png')}
          style={{ marginRight: 20 }}
        />
        <Avatar.Image
          size={32}
          source={require('../../Assets/images/avatar.png')}
          style={{ marginRight: 20 }}
        />
      </View>

      {allContacts.length ? (
        <>
          <Portal>
            <Modal
              visible={visible}
              style={{ paddingHorizontal: 20 }}
              contentContainerStyle={styles.modalContainer}
            >
              <Text>
                Heart means you anonymouslhy marked vasia to take Vasia to a
                date. If she also marks you with heart, we will both let you
                know
              </Text>
              <View style={styles.modalButtonWrapper}>
                <Button
                  mode='contained'
                  compact
                  style={styles.modalButton}
                  color={COLORS.main}
                  onPress={setModalEmotionAction}
                >
                  Ok
                </Button>
                <Button
                  mode='contained'
                  style={styles.modalButton}
                  color={COLORS.main}
                  onPress={hideModal}
                >
                  Cancel
                </Button>
              </View>
            </Modal>
          </Portal>
          <FlatList
            removeClippedSubviews
            data={route.params.query ? filterContacts : allContacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.recordID}
          />
        </>
      ) : (
        // <SwipeListView
        //   data={allContacts}
        //   renderItem={renderItem}
        //   renderHiddenItem={renderHiddenItem}
        //   rightOpenValue={-260}
        //   previewRowKey={"0"}
        //   previewOpenValue={-40}
        //   previewOpenDelay={3000}
        //   onRowDidOpen={onRowDidOpen}
        // />
        <>
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </>
      )}
    </View>
  );
};

export default Contacts;
