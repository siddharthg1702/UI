import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { Container, Header,DeckSwiper, Content, Card, CardItem, Thumbnail, Text,Title, Button, Icon, Left, Body, Right } from 'native-base';

const cards = [
    {
      text: 'Card One',
      name: 'One',
      image: require('./img/image1.jpg'),
    },
    {
        text: 'Card Two',
        name: 'Two',
        image: require('./img/image2.jpg'),
    },
    {
        text: 'Card Three',
        name: 'Three',
        image: require('./img/image3.jpg'),
    },
    {
        text: 'Card Four',
        name: 'Four',
        image: require('./img/image4.jpg'),
    },
    
  ];

export class ImageScreen extends React.Component {
    
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
                <View>
                <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={cards}
                        renderEmpty={() =>
                        <View style={{ alignSelf: "center" }}>
                            <Text>Over</Text>
                        </View>
                        }
                        renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                            <Left>
                                <Thumbnail source={item.image} />
                                <Body>
                                <Text>{item.text}</Text>
                                <Text note>NativeBase</Text>
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
                </View>
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