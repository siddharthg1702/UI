import React from 'react';
import { StyleSheet,Image,ImageBackground} from 'react-native';
import { Container,Separator, Content,Text,Left,Body, Icon,List, ListItem, Thumbnail } from 'native-base';
import {Service} from '../../Services/DBServices';
import {Login} from '../LoginScreen/Login';

export class Drawer extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLogout:false,
      userName : null,
      email: null,
      profilePath: null,
    }
  }

  componentWillMount() {
    Service.fetchProfileDetails((data) => {

      console.log(data);
      this.setState({userName: data.userName});
      this.setState({email: data.email});
      this.setState({profilePath: data.profilePath});
    });
    console.log('Fetched Details');
  }
  
  render() {

    

    return (
        <Container>
        <Content>
          <ImageBackground style={{
              height: 160,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:"#0b97dd"
            }}>
            <Thumbnail large source={{uri :'file://'+ this.state.profilePath}} />            
            <Text style={styles.userName}>{this.state.userName}</Text>
            <Text style={styles.email}>{this.state.email}</Text>
          </ImageBackground>
          <List>
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

            <ListItem icon onPress={()=>this.props.navigation.navigate('Pair')}>
              <Left>
                <Icon name="link" />
              </Left>
              <Body>
                <Text>Pair with Child</Text>
              </Body>
            </ListItem>
            
            <Separator>
              <Text>Account</Text>
            </Separator>
            <ListItem icon onPress={() => {
              Service.logout((response) => {
              if(response == 'Success') {
                console.log("response is "+response);
                this.props.navigation.navigate('Login');
              }
            })}}>
              <Left>
                <Icon name="log-out" />
              </Left>
              <Body>
                <Text>Log out</Text>
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
      marginTop:50,
      fontWeight:'bold'
  },
  userName:{
    fontSize:25,
    marginTop:10,
    fontWeight:'bold'
  },
  email:{
    fontSize:15,
    //margin:10,
  }
});
