import React from 'react';
import {StatusBar,StyleSheet,BackHandler,BackAndroid,View} from "react-native";
import {createStackNavigator,NavigationAction} from 'react-navigation';

import { Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right
} from 'native-base';

export default class HomeScreen extends React.Component {
  
  static navigationOptions={
    header:{
      visible:false
    }
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress',()=>{
      BackHandler.exitApp();
    });
  }

  constructor(props) {
      super(props);
  }
  render() {
    return (
      <Container>
          <Header>
              <Left>
                <Button
                    transparent
                    onPress={() => this.props.navigation.openDrawer()}
                    >
                        <Icon name="menu" />
                </Button>
              </Left>
              <Body>
                  <Title>Autism App</Title>
              </Body>
              <Right />
            </Header>
            <Content>
                <View>
                    
                      <Text>Under process</Text>
                    
                </View>
            </Content>
      </Container>
    
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      paddingTop: 20,
    },
    card: {
      borderRadius : 0,
      borderWidth : 0.5,
      borderColor: 'lightgray',
      backgroundColor : '#FFF',
      margin: 8,
    },
    listHeaderText: {
      fontSize: 16,
    },
    listHeader: {
      display: 'flex',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 10,
      borderBottomWidth:0.5,
      borderColor:'lightgray',
    },
    listSubtitle: {
  	  display: 'flex',
      paddingTop: 8,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingBottom: 8,
      borderTopWidth:0.5,
      borderColor:'lightgray',
      flexDirection: 'row',
    },
    listSubtitleText: {
      fontSize: 13,
      textAlign: 'center',
      flex: 1,
    },
    listItemColumn: {
      borderTopWidth:0.5,
      borderColor:'lightgray',
      display: 'flex',
      flexDirection: 'row',
    },
    listItemRow: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      borderColor: 'lightgray',
      borderBottomWidth: 0.5,
    },
    listItemRowTextTitle: {
      textAlign: 'center',
      fontWeight: 'bold',
      paddingTop: 3,
      paddingBottom: 3,
    },
    listItemRowSeparator: {
      borderTopWidth: 2,
    },
    listItemRowTextValue: {
      textAlign: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      fontSize: 14,
    },
  });
