import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

const App: () => Node = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //liga o flash do smartphone
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    //funcao shake para ligar e desligar lanterna mudando o toggle
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    });
    // Essa funcao vai ser chamada qdo o componente for desmontado
    return () => subscription.remove();

  },[])
  
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity
      onPress={handleChangeToggle}>
        <Image
            style={toggle ? style.lightingOn : style.lightingOff}
            source={
              toggle
                ? require("./assets/images/eco-light.png")
                : require("./assets/images/eco-light-off.png")
            }
          />
          <Image
            style={style.dioLogo}
            source={
              toggle
                ? require("./assets/images/logo-dio.png")
                : require("./assets/images/logo-dio-white.png")
            }
          />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 250,
    height: 250,
  },
});

export default App;
