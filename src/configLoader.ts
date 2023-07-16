const configField = "awsConfig";
const context: any = window;
type AppConfig = {
  Auth: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
  };
  apiEndpoint: string;
  vapidPublicKey: string;
  timestamp: string;
};

const config: AppConfig = context[configField];

export default config;
