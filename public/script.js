var config = {
	host: "",
	prefix: "",
	port: 80,
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
	  var app = qlik.openApp(, config);
	  app.getObject("qv1", appId);
	} );

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
