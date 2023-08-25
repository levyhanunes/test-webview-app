import React from 'react';
import { StyleSheet, SafeAreaView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const App: React.FC = () => {
  const webViewRef = React.useRef<WebView>(null);

  const fetchLocalStorageData = () => {
    const script = `
      window.ReactNativeWebView.postMessage(window.localStorage.getItem('web-hub/web_hub/hub_user_session_info') || 'null');
    `;

    webViewRef.current?.injectJavaScript(script);
  };

  const handleNavigationStateChange = (navState: any) => {
    const { url } = navState;
    if (url?.includes('/home')) {
      fetchLocalStorageData();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: 'https://app.squidit.com.br/' }}
        style={styles.webview}
        ref={webViewRef}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={(event) => {
          Alert.alert('Dados do LocalStorage - USER:', event.nativeEvent.data);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e94589',
  },
  webview: {
    flex: 1,
  }
});

export default App;
