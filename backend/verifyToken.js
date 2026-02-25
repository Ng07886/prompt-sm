import admin from 'firebase-admin';

// Update the path below to your real service account JSON file
const serviceAccount = {
  type: 'service_account',
  project_id: 'social-media-project-d1f82',
  private_key_id: '795a4a0c4a969d390975975ceda9f06a6eccd465',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuiiJaEp+b9CZV\n7hDgqXEHcJqHOvHNCQzGoA+rZr/5i/uCJppccURyfGoCrodgA4JMS32I365xKPx1\nICKa21v3znC5hYuY4OAzOP/inpr0HqvzMYE25JJZ+k7q9GogCjpZUwOnxiO1lsCK\nm8B90C2VTAMAnZ+/i2aDzZqE93mUnMFTEq3WtFNRuLppENeUK7tet45bXkvykUVI\nsTX3FzuS3+YrZFFgVwGE4yLHkQDJX5U9YS3bcbp7l5rlMfqD3YhF4oFbh8NRDd84\n8jHTCuDU6lnQk22L7WDUpzciAuWQU/lRqHv83oFRdcuLYeT6g7tySyp/NqjxsHKB\nPZamaNQPAgMBAAECggEANh6M0kMODIxiyqg7wX2ol3b5406KpVnWBUyiLzJ3+kfG\nX6/akyln4Nvk/xngzguofkG2FhfNfjcIOMUTFdNIrAjt+QiIpYms2xUker9VKrbL\n+Gd0OnIbUx0DFWVd9rtVJldQPdh5QBgTcacjw58mUzGziKBXZUwzKFE7RVl68HI7\nf3d3BUIr0bwN4EplLsoSTECy47FluZCCnTHm6Zmn181qxK+XXYWrmJioBoQBwAuJ\nC4eigG9bpqJVCok/dPGf9+QyiZLyutyAc5Pr+HHlyx8LeD0M4dgP3ezeYsoitQJ1\nYJLAhInYRh/1x0eGikqS8U8y73FZNKuGbCh6ft7LgQKBgQDXUo44Qu/qKSktw745\nVQ1uNK15PqvD0MrBrdlH7oPrWyCAfzZYIXR23vNCkKg9Rmlnd9XuE2vC9D0Vlb6B\nI52ObRr0hrCVd9gUasbRkgM0cMAmWNK1WKFc/1AhSvx9ZPrgqMh5eT7FICBDs0Ic\nE3nCvP4aRIsrvCb2G3BUZTPsTwKBgQDPgzuTKQx+k230uXnN0ERe8r9moKfhoJHD\ny10cykweGRGXNLKNYb4bdOP8/5ERKe3p2yc44Ho351Lqb0HDZfSnoIP+y0XPJzZ7\nLHJbk1u5E7ehEKvHzDwocVeV1oO5PzmsKr6C2CaSYYfFm7a/HcZk2WeQ65cCbkF5\nyAP5tk/sQQKBgQC6GDakd22kolhdnjxMjq6h3dND459OCKkEBT2yBnlrMwH/LHMK\nbjea+QujLyTIeI9mhlKVhaFwB+i3PAk+0Uo9qxxN1A7Pz5kn5DTbMWelrgDT45aQ\ndv5XQq29aHKZ6WlOO3GwUtKmSiK4gDgVzdtBLFgs2aqybNX7hDFsL19VzwKBgBcf\nsZjRfzHvrdYSgQ89QREvjcKa7npHEVc3JzYZGOhVtM8bsTXuCWg321wLApheCsP/\nhtxgr13haizznuluSBgR3AOdlTbjUL/jEQ9BWXxDRTguimXmTWHYV4E7+UvATuXv\nkXE1Mv8m3SFZG8EqSTxduZu9lQNRU/yFHGRMO5XBAoGAYOx7tTngKH45Kc4oZ8A+\nbn3Da1s8NC/zGgU2oFQqv1QQNC8uAwyfDrvWQuTHNmOnSLaiTD7LHn/2dtjXnBsb\nXZHUj/jBkNzkQjTrhN0s5BD25wi+mTsCRQ4kxN2SRTFMavSw0eA7/FQbQcZEetiW\nAJIuzuMOKjDtgamTayJUwtU=\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-fbsvc@social-media-project-d1f82.iam.gserviceaccount.com',
  client_id: '115888623094526713363',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40social-media-project-d1f82.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Paste your Firebase ID token here
const idToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1MzMwMzNhMTMzYWQyM2EyYzlhZGNmYzE4YzRlM2E3MWFmYWY2MjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsLW1lZGlhLXByb2plY3QtZDFmODIiLCJhdWQiOiJzb2NpYWwtbWVkaWEtcHJvamVjdC1kMWY4MiIsImF1dGhfdGltZSI6MTc3MTQ1OTM4NiwidXNlcl9pZCI6Imx1Y3FtYUNrUGdTelhBb1RpbDZPYjdrZDIxSDIiLCJzdWIiOiJsdWNxbWFDa1BnU3pYQW9UaWw2T2I3a2QyMUgyIiwiaWF0IjoxNzcxNDU5Mzg2LCJleHAiOjE3NzE0NjI5ODYsImVtYWlsIjoibm9lbGcwMTMwOTlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5vZWxnMDEzMDk5QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.t3lau_PavSElqIosj46MJDw35O_8rvnCNWLycyzi8lGOUGRcqRrWC3MZFDm63aSj-rlY4WKz2Sj2YcLl4U2j8VmRm87YRdRKTNbv6EbI1IhkBgIeA3pq2pGgAVFib4x-Ocm4BDOhDKgmzoFJ5eDVvZcrKPM80tnh0VSUGaN33ZRYgQDGAsiKZhPWa2zPPoh49kX-lPjMjGCyv-Fb3EIGtQiMymR0sQQpWorL7p0O22e0w3iW6ikBGFgbPpccoMe5IOT7MvjER37iSe9ZzWjJhsCTa5-aFkdQFs_6i8Bjg59tYX_jMaz2gjj1vbnALdG7JCf1ofSLyFdnZhjnPL4FpQ';

admin
  .auth()
  .verifyIdToken(idToken)
  .then((decoded) => {
    console.log('Token is valid!');
    console.log(decoded);
  })
  .catch((err) => {
    console.error('Token is invalid or expired:', err.message);
  });
