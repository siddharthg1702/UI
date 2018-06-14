import React,{Component} from "react";
import {View,Text} from "react-native";
import { Container, Header,DeckSwiper, Content, Card, CardItem, Thumbnail, Title, Button, Icon, Left, Body, Right } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {RTCPeerConnection,RTCSessionDescription, RTCIceCandidate} from 'react-native-webrtc';
const config = {"iceServers":[{}]};
const connection = {
  'optional': 
  [{'DtlsSrtpKeyAgreement': true}, {'RtpDataChannels': true }] 
};
var net = require('react-native-tcp');
let server,SocketG,peerConn,dataChannel;

import {WebRTC} from '../../Services/WebRTCService';
export class PairScreen extends Component {

    constructor(){
        super();
        this.state={
            visible:true,
            DC:false
        };
    }

    createDatachannel(){
        peerConn = new RTCPeerConnection(config,connection);
        peerConn.onicecandidate = (event)=>{
            console.log("On ice candidate called: "+JSON.stringify(event.candidate));
            if(event.candidate)
              SocketG.write(JSON.stringify(event.candidate));
          };
        dataChannel = peerConn.createDataChannel("dataChannel",{reliable:false});
        dataChannel.onopen = ()=>{
          console.log("Data channel Opened:"+dataChannel);
          WebRTC.setDC(dataChannel);
          this.setState({visible:false});
          this.setState({DC:true});
          alert("Child Connected");
          
        };
        dataChannel.onclose = ()=>{
          console.log("Data channel closed");
          
        };
        dataChannel.onmessage = (event)=> {
          console.log("Message received: "+event.data);
        };
    
        peerConn.textDataChannel = dataChannel;
    }

    componentWillMount(){
        this.createDatachannel();
        if(typeof WebRTC.server =='undefined')
            server = net.createServer((socket)=>{
                SocketG=socket;
                WebRTC.setServer(socket);
                socket.on('data',(data)=>{
                    console.log("Data Received: "+data);
                    let sdp = JSON.parse(data);
                    if(sdp.sdp){
                    peerConn.setRemoteDescription(new RTCSessionDescription(sdp),()=>{
                      peerConn.createAnswer(desc=>{
                        peerConn.setLocalDescription(desc,()=>{
                          SocketG.write(JSON.stringify(desc));
                        },(err)=>{
                          console.log("Error occurred in Local description "+err.message);
                        });
                      },(err)=>{
                        console.log("Error Occurred in Create Answer: "+err.message);
                      });        
                    },(err)=>{
                      console.log("Error Occurred: "+err.message);
                    });}
                    else
                    {
                      peerConn.addIceCandidate(new RTCIceCandidate(sdp));
                    }
                  });
            }).listen(8080,()=>{
                               
            });
        else{
            alert("Server already running");  
            this.setState({visible:false});    
        }     
    }

    render(){
        return(
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
                        <Title>Pair with Child</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Spinner visible={this.state.visible} textContent={"Waiting for Child to connect"} />
                    {
                        this.state.DC &&
                        
                        <Button style={{justifyContent: 'center',marginTop:50,borderRadius: 10,alignSelf: 'center',}}iconLeft onPress = {() => this.props.navigation.navigate("Activity")}>
                            <Icon name="ios-game-controller-a-outline" />
                            <Text style={{color: 'white',fontSize: 20,fontWeight: 'bold',alignItems: 'center',}}>Proceed to Activity</Text>
                        </Button>
                    }
                    
                </Content>
            </Container>
        );
    }
}