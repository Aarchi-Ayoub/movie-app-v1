import React, {createContext, useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {flexPage} from 'styles/styles';
import {getTheme, storeTheme} from 'utils/AsyncStorage';

export const AppThemeContext = createContext<any>(null);

const AppThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(useColorScheme() === 'dark');

  useEffect(() => {
    (async () => {
      const t = await getTheme();
      setIsDark(t === 'dark');
    })();
  }, []);

  useEffect(() => {
    isDark ? setTheme('dark') : setTheme('light');
  }, [isDark]);

  const changeTheme = (): void => {
    setIsDark(!isDark);
    isDark ? storeTheme('light') : storeTheme('dark');
  };

  const textColorStyle: object = {
    color: isDark ? Colors.lighter : Colors.darker,
  };

  let backgroundStyle: object = {
    ...flexPage,
    backgroundColor: isDark ? Colors.darker : Colors.lighter,
  };
  return (
    <AppThemeContext.Provider
      value={{theme, isDark, changeTheme, backgroundStyle, textColorStyle}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        {children}
      </SafeAreaView>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
