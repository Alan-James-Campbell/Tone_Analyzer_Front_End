
const dev = {
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://wgo0omgguk.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_8jJmg1xbi",
    APP_CLIENT_ID: "2h61ktd6rs62m5s3u9ac4fl2gc",
    IDENTITY_POOL_ID: "us-east-2:b2bf8fa8-59f0-417a-89ca-bb28fc34a522"
  }
};

const prod = {
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://56q92nxm0a.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_1FZqDfGLe",
    APP_CLIENT_ID: "YOUR_PROD_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "us-east-2:dba5f613-0e33-4813-9216-f3fd9bcf1438"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
