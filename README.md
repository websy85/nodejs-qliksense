# nodejs-qliksense
A basic example of using a NodeJS backend to integrate with the Qlik Sense Server Mashup API.
NOTE: This solution is built to make configuration/distribution simple and provide a foundation for understanding how to create such an environment. It is not designed as a basis for a production solution, however, you may wish to change some elements to make the solution more dynamic for your environment.

Pre-requisites:
- NodeJS
- Qlik Sense Server

Configuration:
- NodeJS
  1. The solution uses qlik-auth node package. It is configured as a dependency and can be installed by running npm install in the project root.
  2. Open the script.js file in the 'public' folder and update the config, appId and objectId variables -
    - NOTE: Refer to the following link if you are unsure on how to obtain the appId and objectId
    - http://help.qlik.com/sense/en-us/developer/#../Subsystems/Workbench/Content/BuildingWebsites/HowTos/qswb_mup_obtainobjectid.htm?Highlight=single.html

- Qlik Sense Server
  1. Create a new Virtual proxy with a prefix of your choice (you'll need this prefix when configuring the NodeJS site.
  2. Populate the 'Authentication module redirect URI' with - http://<node_server>:3000/authenticate
    - Port 3000 is configured in the index.js file of the NodeJS site and can be changed if desired.
  3. Add the following 'Additional response header' - Access-Control-Allow-Origin:*
  4. Export the certificate, giving it the name of the NodeJS machine and copy it to the root of the NodeJS project.
    - NOTE: Refer to the following link for help on exporting certificates
    - http://help.qlik.com/sense/en-US/online/#../Subsystems/Qlik_Management_Console_help/Content/QMC_Resources_Certificates_Export.htm?Highlight=export

The Authentication Communication Workflow:
  1. The script.js file in the public folder tries to load the qlik.js mashup API from the configured Qlik Sense Server.
  2. At this point the 'Authentication module redirect URI' on the virtual proxy is called.
  3. This triggers the qlik-auth module to send a ticket request with the specified Username and Directory.
  4. A ticketId is returned and a session is established.
