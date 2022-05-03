import {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import { useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }
  function gameOverHandler(numberOfRounds){
    setGameIsOver(true)
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }
  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/assets/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/assets/OpenSans-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading/>
  }
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen useNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
  }



  return  <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
  <ImageBackground source={require('./assets/images/background.png')} 
  resizeMode="cover"
  style={styles.rootScreen}
  imageStyle={styles.backgroundImage}
  >
   <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
  </ImageBackground>
  </LinearGradient>
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage:{
    opacity: 0.15
  }
});
