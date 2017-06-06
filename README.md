This is a single button Heroku deployable OAuth application to be used in conjunction with data.world integrations.  Often integrations can be static applications, so adding OAuth capabilities can be challenging.  This project streamlines that process.

To deploy the application to Heroku, simply press the Deploy button below.  Some minor configuration changes must be made afterwards.  These include setting your data.world client_id, client_secret, and redirect_uri.  The client_id and client_secret will be the ones provided to you by data.world.  The redirect_uri is actually dependent on the heroku instance name.  They will be available for modification on the Heroku application setup before the application is deployed. 

For instance, if Heroku deploys your application to https://test-single-button-deploy.herokuapp.com then your redirect_uri will be https://test-single-button-deploy.herokuapp.com/callback

##### Example Configuration Screenshot
![Alt text](/docs/heroku_configuration.png?raw=true "Heroku Configuration Screenshot")

Finally, the endpoint environment variable `CONNECTOR_REDIRECT` will need to be configured as well. This is the URL within your application that will receive the long-term token upon successful authentication.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


