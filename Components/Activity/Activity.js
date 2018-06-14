import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,Title, Button, Icon, Left, Body, Right } from 'native-base';

export class Activity extends React.Component {
    
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
                        <Title>Activity</Title>
                    </Body>
                    <Right />
                    </Header>
                <Content>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('ImageScreen')}>
                        <Card>
                            <CardItem style={{backgroundColor: '#3865b7'}}>
                            <Left>
                                <Thumbnail source={require('./images/GuessLogo.jpg')} />
                                <Body>
                                <Text style={{color: 'white'}}>Name the Image</Text>
                                <Text note>Only Image</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text>     </Text>
                                <Image source={require('./images/nameLogo.jpg')} style={{height: 150, width: null, flex: 1}}/>
                                <Text>     </Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Screen2')}>
                        <Card>
                            <CardItem style={{backgroundColor: '#3865b7'}}>
                            <Left>
                                <Thumbnail source={require('./images/ImageWithWordLogo.png')} />
                                <Body>
                                <Text style={{color: 'white'}}>Image with Word</Text>
                                <Text note>Image + Word</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text>     </Text>
                                <Image source={require('./images/ImageWithWord.jpg')} style={{height: 150, width: null, flex: 1}}/>
                                <Text>     </Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Screen2')}>
                        <Card>
                            <CardItem style={{backgroundColor: '#3865b7'}}>
                            <Left>
                                <Thumbnail source={require('./images/MatchLogo.jpg')} />
                                <Body>
                                <Text style={{color: 'white'}}>Match the following</Text>
                                <Text note>Connect Images with the respective words</Text>
                                </Body>
                            </Left>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text>     </Text>
                                <Image source={require('./images/MatchImage.png')} style={{height: 150, width: null, flex: 1}}/>
                                <Text>     </Text>
                            </CardItem>
                            <CardItem cardBody style={{backgroundColor: '#3865b7'}}>
                                <Text></Text>
                            </CardItem>
                        </Card>
                    </TouchableHighlight>
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
});