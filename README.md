# nodejs-qliksense
A basic example of using a Node.js backend to integrate with the Qlik Sense Server Mashup API.
NOTE: This solution is built to make configuration/distribution simple and provide a foundation for understanding how to create such an environment. It should be considered a building block rather than a production ready solution as it does not cover such things as security.
The example uses the Node.js 'http' module to run a simple web server. For more information on the 'http' module please refer to the Node.js documentation - http://nodejs.org/api/http.html

Pre-requisites:
- Node.js
- Qlik Sense Server

Configuration:
- Node.js
  1. Open a command/terminal window.
  2. Browse to the directory of the nodejs-qliksense solution you have just downloaded.
  3. Install the package by executing 'npm install' in this directory.
    - The solution uses the qlik-auth node package which is configured as a dependency and will be installed automatically when you execute the 'npm install' command.  
  4. Using a text editor, open the index.html file and update the hostname and port in the script tags on line 6 to point to your qlik server.
  5. Using a text editor, open the script.js file in the 'public' folder and update the config, appId and objectId variables to reflect your environment -
    - NOTE: Refer to the following link if you are unsure on how to obtain the appId and objectId
    - [Obtaining app id's and object id's](http://help.qlik.com/sense/en-us/developer/#../Subsystems/Workbench/Content/BuildingWebsites/HowTos/obtain-app-object-id.htm)

- Qlik Sense Server
  1. Open the QMC (Qlik Management Console) and navigate to the 'Proxies' area.
  2. Edit the Proxy server settings and ensure to select 'Virtual Proxies' from the options on the right.
  3. Create a new Virtual proxy with a prefix of your choice (you'll need this prefix when configuring the Node.js site).
  4. Populate the 'Authentication module redirect URI' with - http://node_server:3000/authenticate
    - Port 3000 is configured in the server.js file of the Node.js site and can be changed if desired.
  5. Add the following 'Additional response header' - Access-Control-Allow-Origin:*
  6. Navigate to the 'Certificates' area of the QMC.
  7. Export the certificate, giving it the name of the Node.js machine. By default this is saved in C:\ProgramData\Qlik\Sense\Repository\Exported Certificates. 
  8. Copy the certificate to the root of the Node.js project.
    - NOTE: Refer to the following link for help on exporting certificates
    - [Exporting Certificates](http://help.qlik.com/sense/en-US/online/#../Subsystems/ManagementConsole/Content/QMC_Resources_Certificates_Export.htm?Highlight=export)

The Authentication Communication Workflow:
  1. The script.js file in the public folder tries to load the qlik.js mashup API from the configured Qlik Sense Server.
  2. At this point the 'Authentication module redirect URI' on the virtual proxy is called.
  3. This is handled by the server.js file of the node solution and currently hardcodes a user called 'sample'.
  4. The qlik-auth module is then called to send a ticket request with the specified config.
  5. A ticketId is returned and a session is established.
  6. No user input is required at any stage of this example workflow.
