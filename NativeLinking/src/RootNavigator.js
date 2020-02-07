import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const MainStack = createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
      },
      Detail: {
        screen: DetailsScreen,
      },
    },
    {
      /* Same configuration as before */
    }
  );
  
const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
  export default RootStack;