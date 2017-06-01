/* Copyright 2017 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the
 * License.
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc.(http://data.world/). */

const Hapi = require('hapi');
const axios = require('axios');

const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 3001,
  host: '0.0.0.0'
});
/**
 * The entry point from the connector.  It will immediately redirect to the
 * data.world authenticator to start the oauth flow.
 */
server.route({
  method: 'GET',
  path: '/authorize',
  handler: function (req, reply) {
    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const endpoint = process.env.AUTHORIZATION_ENDPOINT;
    reply.redirect(`${endpoint}/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`);
  }
});

/**
 * The oauth callback endpoint.  The data.world oauth flow will return here with a 
 * short term code.  The code should be sent back to data.world to retrieve the long
 * term code and then flow should be redirected to the connector.
 */
server.route({
  method: 'GET',
  path: '/callback',
  handler: function (req, reply) {
    const endpoint = process.env.AUTHORIZATION_ENDPOINT;
    const params = {
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code'
    };
    const queryString = Object.keys(params).map((k) => {
      return `${k}=${params[k]}`;
    }).join('&');

    axios.post(`${endpoint}/oauth/access_token?${queryString}`).then((response) => {
      if (response.data.access_token) {
        reply().redirect(`${process.env.CONNECTOR_REDIRECT}?token=${response.data.access_token}`);
      } else {
        const errorMessage = response.data.message || 'UNKNOWN_ERROR';
        reply().redirect(`${process.env.CONNECTOR_REDIRECT}?error=${errorMessage}`);  
      }
    }).catch((err) => {
      console.log('Error exchanging short term code for long term token: ', err);
      const errorMessage = err.message || 'UNKNOWN_ERROR';
      reply().redirect(`${process.env.CONNECTOR_REDIRECT}?error=${errorMessage}`);
    });
  }
})

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at: ', server.info.uri);
})