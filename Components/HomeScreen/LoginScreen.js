import React from "react";
import { BackHandler,StyleSheet, Text, View,BackAndroid, TouchableHighlight,StatusBar} from 'react-native';
import { Container, Header, Content, Item, Input, Form, Label, Icon, Grid, Button} from 'native-base';
import {NodeService} from '../../Services/NodeService';
import Dimensions from 'Dimensions';
import {createStackNavigator,NavigationAction} from 'react-navigation';
import Home from '../HomeScreen/index.js';
import {Service} from '../../Services/DBServices';

export class LoginScreen extends React.Component {

    static navigationOptions = {
      header:null
    }

    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            userName:'',
            pwd:''
        };
        this.handleLogin = this.handleLogin.bind(this);
        //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress',()=>{
        BackHandler.exitApp();
      });
    }

    handleLogin(){
      console.log(this.state.userName+": "+this.state.pwd);
      NodeService.verify(this.state.userName,this.state.pwd,(data)=>{
        if(data.status=="Success")
        {
          console.log('Recieved Data : ', data);
          Service.login(data);
          Service.test();
          this.props.navigation.navigate("Home");
        }
        else
          alert("Invalid Credentials!!");
      });
    }

    componentWillMount() {
        console.log('In Login Screen');
    }

    render(){
        // if(this.state.isLogin)
        // {
        //     console.log('Going to  Homescreen');
        //     this.props.navigation.navigate("Home");
        // }
        return(
            
            <Container>
            <StatusBar backgroundColor='#90a9d1'/>
            <Content contentContainerStyle={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
              <Form>
                <Item floatingLabel>
                  <Icon active name='person' />
                  <Label>Username</Label>
                  <Input onChangeText={(userName)=>{this.setState({userName})}}/>
                </Item>
                <Item floatingLabel last style={styles.inputSection}>
                  <Icon active name='lock' />
                  <Label>Password</Label>
                  <Input onChangeText={(pwd)=>{this.setState({pwd})}} secureTextEntry={true}/>
                </Item>
                <Button style={styles.loginButton}
                        onPress = {()=>this.handleLogin()}>
                  <Text style={styles.whiteText}>Login</Text>
                </Button>
                <TouchableHighlight onPress={() => alert("On process")}>
                  <Text style={{alignSelf: 'center'}}>Forgot Password ??</Text>
                </TouchableHighlight>
              </Form>
            </Content>
          </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#90a9d1'
      },
      inputSection: {
        width: Dimensions.get('window').width - 30,
      },
      loginButton: {
        marginTop: 50,
        width: 150,
        height: 40,
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center',
      },
      whiteText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
      }
});