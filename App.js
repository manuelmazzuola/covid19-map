import * as React from 'react';
import { WebView } from 'react-native-webview';
import { setTestDeviceIDAsync, AdMobInterstitial } from "expo-ads-admob";

export default class App extends React.Component {
  componentDidMount() {
    if (__DEV__) {
      AdMobInterstitial.setAdUnitID("")
      setTestDeviceIDAsync('EMULATOR').then(this.showAdAsync.bind(this))
    } else {
      AdMobInterstitial.setAdUnitID("")
      this.showAdAsync();
    }
  }

  showAdAsync() {
    setTimeout(this.showAd.bind(this), 10000);
  }

  showAd() {
    AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        .then(() => AdMobInterstitial.showAdAsync())
  }

  render() {
    const runFirst = `
      setTimeout(() => { 
        document.getElementsByClassName("header-panel")[0].remove();
      }, 2000);
      true;
    `;
    return (
      <WebView
        source={{ uri: 'https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61' }}
        injectedJavaScript={runFirst}
      />
    );
  }
}