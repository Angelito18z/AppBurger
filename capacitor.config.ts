import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.appburger',
  appName: 'AppBurger',
  webDir: 'www',
  plugins:{
    "GoogleAuth":{
      "scopes":["profile", "email"],
      "serverClientId":"197199548223-mjhv02bg8sok044scaho6q7o7icfmp48.apps.googleusercontent.com",
      "forceCodeForRefreshToken":true
    }
  }
};

export default config;
