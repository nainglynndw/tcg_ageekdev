import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import {QueryClient, QueryClientProvider} from 'react-query';

import {useAuth} from './Store/store';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const auth = useAuth(state => state.auth);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {!auth ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
