import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header,DeckSwiper, Content, Card, CardItem, Thumbnail, Text,Title, Button, Icon, Left, Body, Right } from 'native-base';
import Swiper from 'react-native-swiper';
import RNFS from 'react-native-fs';
import {WebRTC} from '../../Services/WebRTCService'
export class ImageScreen extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            info:{}
        }

    }

    componentWillMount(){
        this.setState({info:WebRTC.getDC()},()=>{
            if(typeof this.state.info =='undefined')
            {
                alert("Child not connected!!! Redirecting to HomeScreen");
                setTimeout(()=>{
                    this.props.navigation.navigate('Home');
                },3);
            }
        });
        
    }

    handleChange(index){
        console.log("Index is :"+index+" Datachannel ref:"+this.state.info);
        RNFS.readFileAssets('img/image'+index+'.jpg','base64').then((data)=>{
            //alert(data.length);
            let i =0;
            this.state.info.send("Start");
            for(i=0;i+65000<data.length;i=i+65000)
            {
                this.state.info.send(data.slice(i,i+65000));
            }
            this.state.info.send(data.slice(i,data.length));
            this.state.info.send("End");
            console.log("Image send to child device");
          });
    }
    render() {
        return (
            <Container>
                <Header> 
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Activity')}
                            >
                                <Icon name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>ImageScreen</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                <Swiper loop={false} style={{width:320,height:240}} onIndexChanged={(index)=>{this.handleChange(index)}}>
                    <View>
                    <Image style = {styles.image} source={require('./img/image0.jpg')}/>
                    </View>
                    <View>
                    <Image style = {styles.image} source={require('./img/image1.jpg')}/>
                    </View>
                    <View>
                    <Image style = {styles.image} source={require('./img/image2.jpg')}/>
                    </View>
                    <View>
                    <Image style = {styles.image} source={require('./img/image3.jpg')}/>
                    </View>
                    <View>
                    <Image style = {styles.image} source={require('./img/image4.jpg')}/>
                    </View>
                </Swiper>
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
    //justifyContent: 'center',
  },
  image:{
    width: null,
    resizeMode: 'contain',
    height: 220
  }
});

/**
 * <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderEmpty={() =>
                        <View style={{ alignSelf: "center" }}>
                            <Text>Over</Text>
                        </View>
                        
                        renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={item.image} />
                                <Body>
                                <Text>{item.text}</Text>
                                <Text note>Image</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody>
                            <Image style={{ height: 300, flex: 1 }} source={item.image} />
                            </CardItem>
                            <CardItem>
                            <Icon name="heart" style={{ color: '#ED4A6A' }} />
                            <Text>{item.name}</Text>
                            </CardItem>
                        </Card>
                        }
                    />
 */