import React from 'react';
import { StyleSheet,Image,ImageBackground} from 'react-native';
import { Container,Separator, Content,Text,Left,Body, Icon,List, ListItem } from 'native-base';

export class Drawer extends React.Component {

  
  
  render() {
    return (
        <Container>
        <Content>
          <ImageBackground style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"#0b97dd"
            }}>
            
           
            
            <Text style={styles.text}>User 1</Text>
          </ImageBackground>
          <List>
            <ListItem icon onPress={()=>this.props.navigation.navigate('Home')}>
              <Left>
                <Icon name="home" />
              </Left>
              <Body>
                <Text>Dashboard</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={()=>this.props.navigation.navigate('Curriculum')}>
              <Left>
                <Icon name="book" />
              </Left>
              <Body>
                <Text>Curriculum</Text>
              </Body>
            </ListItem>
            <ListItem icon onPress={()=>this.props.navigation.navigate('Activity')}>
              <Left>
                <Icon name="ios-game-controller-a-outline" />
              </Left>
              <Body>
                <Text>Activity</Text>
              </Body>
            </ListItem>
            
            <Separator>
              <Text>Account</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Icon name="cog" />
              </Left>
              <Body>
                <Text>Settings</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="log-out" />
              </Left>
              <Body>
                <Text>Log out</Text>
              </Body>
            </ListItem>

            <Separator>
              <Text>About Us</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Icon name="help" />
              </Left>
              <Body>
                <Text>Help & feedback</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-book" />
              </Left>
              <Body>
                <Text>Parent guide</Text>
              </Body>
            </ListItem>
            <ListItem icon>
              <Left>
                <Icon name="ios-information-circle-outline" />
              </Left>
              <Body>
                <Text>About App</Text>
              </Body>
            </ListItem>
         </List>
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
    backgroundColor:"#307f51"
  },
  text:{
      fontSize:25,
      margin:50,
      fontWeight:'bold'
  }
});
