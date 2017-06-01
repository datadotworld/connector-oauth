This is a single button Heroku deployable OAuth application to be used in conjunction with data.world data connectors.  Most connectors are static applications, so adding OAuth capabilities to them can be difficult.  This project streamlines that process.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

To deploy the application to Heroku, simply press the Deploy button above.  Some minor configuration changes must be made afterwards.  These include setting your data.world client_id, client_secret, and redirect_uri.  The client_id and client_secret will be the ones provided to you by data.world.  The redirect_uri is actually dependent on the heroku instance name.  

For instance, if Heroku deploys your application to https://test-single-button-deploy.herokuapp.com then your redirect_uri will be https://test-single-button-deploy.herokuapp.com/callback

If using a custom data connector, then the endpoint environment variable `CONNECTOR_REDIRECT` will need to be configured as well. The long term token will be passed to the endpoint in a query string parameter `token`.
