import React, { useState } from "react";
import { Button, Card, Layout, Text } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import yes from "../assets/correct.mp3";
import no from "../assets/wrong.mp3";
import md5 from "md5";



export default function QuestionBox(props: any) {
  const shuffledOptions: string[] = props.options.sort(() => Math.random() - 0.5);
  let title: string = "Is it " + shuffledOptions[0] + " or " + shuffledOptions[1] + "?";
  const [answered, setAnswered] = React.useState(0);

  const [sound, setSound] = React.useState();
  let filename: string = "Nl-" + props.antwoord + ".ogg";
  let url: string = "https://upload.wikimedia.org/wikipedia/commons/" + md5(filename).substring(0, 1) + "/" + md5(filename).substring(0, 2) + "/" + filename;
  async function playSound() {

    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );
    setSound(sound);
    console.log('playin sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);
  //  let ding = new Audio(yes);
  //  let dong = new Audio(no);
  //  const buzzer = (option) => {
  //    (option === props.antwoord) ? ding.play() : dong.play();
  //  }

  const Header: any = () => (
    <View {...props}>
      <Text category='h6'>  {title} </Text>
    </View>
  );



  return (
    <Layout style={styles.topContainer} level='1' >
      <Card header={Header}>
        <View >
          <Button onPress={playSound}> Play Sound </Button>
          <Text>{props.antwoord} {url}</Text>
          <Button
            // className="answerBtn"
            onPress={() => {
              props.selected(+(props.options[0] === props.antwoord));
              setAnswered(1);
            }
            }
          //disabled={+(answered)}
          //type={(answered===1) ? "primary" : "default"}
          >
            {props.options[0]}
          </Button>
          <Button
            //className="answerBtn"
            onPress={() => {
              props.selected(+(props.options[1] === props.antwoord));
              setAnswered(2);
            }
            }
          //disabled={+(answered)}
          //type={(answered===2) ? "primary" : "default"}
          >
            {props.options[1]}
          </Button>
        </View>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
