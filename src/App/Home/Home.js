import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { ListItem, Icon, Text } from 'react-native-elements';

import {
  color,
  PrimaryButton,
  MainContainer
} from '../../Public/components/Layout';

import SplashScreen from 'react-native-splash-screen';

const ListContainer = styled(View)`
  padding-vertical: 8px;
  padding-horizontal: 8px;
`;

const ListContent = styled(View)`
  flex-direction: row;
`;

const ItemIcon = styled(View)`
  align-self: center;
`;

const FlexItem = styled(View)`
  flex: 1;
`;

const FlexRow = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ListDivider = styled(View)`
  padding-top: 10px;
`;

class Home extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <Fragment>
        <MainContainer>
          <ImageBackground
            source={require('../../../assets/images/bus1.jpg')}
            style={styles.imageBackground}
          />
          <ListContainer>
            <ListContent>
              <ItemIcon>
                <Icon
                  name="import-export"
                  size={40}
                  type="material"
                  color={color.Primary}
                />
              </ItemIcon>
              <FlexItem>
                <View>
                  <ListItem
                    title="Leaving from"
                    subtitle="Departure City"
                    containerStyle={styles.listItemContainer}
                    bottomDivider
                    chevron={{ color: color.Primary, size: 40 }}
                  />
                </View>
                <View>
                  <ListItem
                    title="Going to"
                    subtitle="Arrival City"
                    containerStyle={styles.listItemContainer}
                    bottomDivider
                    chevron={{ color: color.Primary, size: 40 }}
                  />
                </View>
                <View>
                  <ItemIcon name="arrow-back" />
                </View>
              </FlexItem>
            </ListContent>
            <ListContent>
              <ItemIcon>
                <Icon
                  name="date-range"
                  size={40}
                  type="material"
                  color={color.Secondary}
                />
              </ItemIcon>
              <FlexItem>
                <ListItem
                  title="Departure"
                  subtitle="Fri, Feb 14, 2020"
                  containerStyle={styles.listItemContainer}
                  bottomDivider
                  chevron={{ color: color.Primary, size: 40 }}
                />
              </FlexItem>
            </ListContent>
            <ListContent>
              <ItemIcon>
                <Icon
                  name="person"
                  size={40}
                  type="material"
                  color={color.Secondary}
                />
              </ItemIcon>
              <FlexItem>
                <ListItem
                  title="Passengers"
                  subtitle=""
                  rightContentContainerStyle={
                    styles.listItemRightContentContainer
                  }
                  rightSubtitle={
                    <FlexRow>
                      <Icon
                        name="minus"
                        size={10}
                        type="font-awesome"
                        color={color.Primary}
                        containerStyle={styles.iconContainer}
                        reverse
                      />
                      <Text style={styles.text}>1</Text>
                      <Icon
                        name="plus"
                        size={10}
                        type="font-awesome"
                        color={color.Primary}
                        containerStyle={styles.iconContainer}
                        reverse
                      />
                    </FlexRow>
                  }
                  containerStyle={styles.listItemContainer}
                  bottomDivider
                />
              </FlexItem>
            </ListContent>
            <ListDivider />
            <ListDivider />
            <ListDivider />
            <ListContent>
              <FlexItem>
                <ListItem
                  containerStyle={styles.padding0}
                  title={
                    <PrimaryButton
                      title="Find Bus Tickets"
                      buttonStyle={styles.button}
                      containerStyle={styles.buttonContainer}
                    />
                  }
                />
              </FlexItem>
            </ListContent>
          </ListContainer>
        </MainContainer>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: { marginHorizontal: 6, paddingHorizontal: 4 },
  iconContainer: { margin: 0, padding: 0 },
  text: { fontSize: 16 },
  padding0: { padding: 0 },
  imageBackground: { width: '100%', height: 150 }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
