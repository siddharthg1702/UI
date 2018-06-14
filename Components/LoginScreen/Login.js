import React from "react";
import { StyleSheet, Text, View, TouchableHighlight,StatusBar} from 'react-native';
import { Container, Header, Content, Item, Input, Form, Label, Icon, Grid, Button} from 'native-base';
import {NodeService} from '../../Services/NodeService';
import Dimensions from 'Dimensions';
import HomeScreen from '../HomeScreen/index.js';
export class Login extends React.Component {


    componentWillMount(){
      console.log("In login");
    }
    constructor(props){
        super(props);
        this.state={
            isLogin:false,
            userName:'',
            pwd:''
        };
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(){
      console.log(this.state.userName+": "+this.state.pwd);
      NodeService.verify(this.state.userName,this.state.pwd,(data)=>{
        if(data=="Success")
          this.setState({isLogin:true});
        else
          alert("Invalid Credentials!!");
      });
    }

    render(){
        // if(this.state.isLogin)
        // {
        //     return <HomeScreen />;
        // }
        return(
          <View>
            <Text>
              Haiiaiiaiaiiaiaiaiiaiaiiai
            </Text>
            </View>
            
          //   <Container>
          //   <StatusBar backgroundColor='#90a9d1'/>
          //   <Content contentContainerStyle={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          //     <Form>
          //       <Item floatingLabel>
          //         <Icon active name='person' />
          //         <Label style={{paddingBottom:4}}>Username</Label>
          //         <Input onChangeText={(userName)=>{this.setState({userName})}}/>
          //       </Item>
          //       <Item floatingLabel last style={styles.inputSection}>
          //         <Icon active name='lock' />
          //         <Label style={{paddingBottom:4}}>Password</Label>
          //         <Input onChangeText={(pwd)=>{this.setState({pwd})}} secureTextEntry={true}/>
          //       </Item>
          //       <Button style={styles.loginButton}
          //               onPress = {()=>this.handleLogin()}>
          //         <Text style={styles.whiteText}>Login</Text>
          //       </Button>
          //       <TouchableHighlight onPress={() => alert("On process")}>
          //         <Text style={{alignSelf: 'center'}}>Forgot Password ??</Text>
          //       </TouchableHighlight>
          //     </Form>
          //   </Content>
          // </Container>
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