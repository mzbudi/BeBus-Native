import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, ImageBackground } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Text, color, DevBorder, Button } from '../../Public/components/Layout';

const MainContainer = styled(View)`
  background-color: #ffffff;
  height: 100%;
  ${DevBorder}
`;

const ListContainer = styled(View)`
  ${DevBorder}
`;

const ListItem = styled(View)`
  flex-direction: row;
  padding-horizontal: 8px;
  ${DevBorder}
`;

const ItemIcon = styled(View)`
  align-self: center;
`;

const ItemForm = styled(View)`
  flex: 1;
  ${DevBorder}
`;

class Home extends Component {
  render() {
    return (
      <Fragment>
        <MainContainer>
          <ImageBackground
            source={require('../../../assets/images/bus1.jpg')}
            style={{ width: '100%', height: 150 }}
          />
          <ListContainer>
            <ListItem>
              <ItemIcon>
                <Text color={color.Primary}>
                  <Icon name="import-export" size={40} />
                </Text>
              </ItemIcon>
              <View>
                <View>
                  <View>
                    <Text>Leaving from</Text>
                  </View>
                  <View>
                    <Text>Going to</Text>
                  </View>
                </View>
                <View>
                  <ItemIcon name="arrow-back" />
                </View>
              </View>
            </ListItem>
            <ListItem>
              <ItemIcon>
                <Text color={color.Secondary}>
                  <Icon name="date-range" size={40} />
                </Text>
              </ItemIcon>
              <View>
                <Text>Departure</Text>
              </View>
            </ListItem>
            <ListItem>
              <ItemIcon>
                <Text color={color.Secondary}>
                  <Icon name="person" size={40} />
                </Text>
              </ItemIcon>
              <View>
                <Text>Passager</Text>
              </View>
            </ListItem>
          </ListContainer>
          <Button>Find Bus Tickets</Button>
        </MainContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
