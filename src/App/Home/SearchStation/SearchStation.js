import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, ScrollView } from 'react-native';
import styled from 'styled-components';
import { SearchBar } from 'react-native-elements';

const MainContainer = styled(ScrollView)`
  background-color: #ffffff;
  height: 100%;
  padding: 16px;
`;

const DATA = new Array(20).fill({
  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  title1: 'City',
  title2: 'Station'
});

class SearchStation extends Component {
  render() {
    return (
      <Fragment>
        <SearchBar
          placeholder="Search Citi or Station..."
          containerStyle={styles.whiteColor}
          lightTheme
          inputContainerStyle={styles.whiteColor}
          onChangeText={this.updateSearch}
        />
        <MainContainer>
          <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.cityName}>{item.title1}</Text>
                <Text>{item.title2}</Text>
                <View style={styles.border} />
              </View>
            )}
          />
        </MainContainer>
      </Fragment>
    );
  }
}

const styles = {
  cityName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  border: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 10
  },
  whiteColor: { backgroundColor: '#ffffff' }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStation);
