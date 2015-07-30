var config = {
	host: "",
	prefix: "",	//this should be the name of the virtual proxy. For example "/nodeexample/"
	port: "",	//as of Sense version 2.0 this should be a string not an integer
	isSecure: window.location.protocol === "https:"
};

var appId="";
var objectId="";

  require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources"
  } );
	require( ["js/qlik"], function ( qlik ) {
	  qlik.setOnError( function ( error ) {
	    alert( error.message );
	  } );
	  var app = qlik.openApp(appId, config);
	  app.getObject("qv1", objectId);
	} );

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
