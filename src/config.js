export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  // s3: {
  //   REGION: "us-west-1",
  //   BUCKET: "notes-app-api-prod-serverlessdeploymentbucket-1bo94kfstrrs4"
  // },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://qrldl1iom1.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_lJLOrcb50",
    APP_CLIENT_ID: "4c54hpri2lke9hcjo4957op7em",
    IDENTITY_POOL_ID: "us-east-2:bb09ca48-75c6-4fcf-80aa-324692bb5812"
  }
};
