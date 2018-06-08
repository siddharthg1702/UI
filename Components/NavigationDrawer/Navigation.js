import React from 'react';
import { StyleSheet} from 'react-native';
import Sidebar from '../Drawer/Drawer';
import {Drawer} from 'native-base';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
export class Navigation extends React.Component {

    static navigationOptions = {
        header:null,
    };

  constructor(props){
      super(props)
  }
  componentDidMount(){
      
  }
  render() {

   


    return (
      <Container>
          <Header>
              <Left>
                <Button
                    transparent
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
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
                <Text>
                    Info about Autism
                </Text>
            </Content>
      </Container>
    
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
      fontSize:25,
      fontWeight:'bold'
  }
});