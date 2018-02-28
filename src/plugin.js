import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const defaults = {
	sdk: {
		url: 'https://cdn.promethean.tv/sdk/latest/ptv.js',
		namespace: 'PTV'
	},
	config: {},
	namespace: 'promethean'
};

const registerPlugin = videojs.registerPlugin || videojs.plugin;

// determine if the SDK is previously loaded into DOM
const isSDKLoaded = () => {
	return window && (window[defaults.sdk.namespace] === true);
};

// Load the script, add it to the head and fire the callback
const loadScript = (url, player, config) => {
	let head = document.getElementsByTagName('head')[0];
	let script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = function() {
	    	onScriptLoaded(player, config);
		}
	script.src = url;
	head.appendChild(script);
};

// Handle script loaded by adding the root object
const onScriptLoaded = (player, config) => {
	window.PTV = new PTV(player, config);
};

// Core plugin function
const promethean = function(options) {

	let settings = videojs.mergeOptions(defaults, options);

  	(isSDKLoaded() === true) ? onScriptLoaded(this, settings.config) : loadScript(settings.sdk.url, this, settings.config);

};

// Register the plugin with video.js.
registerPlugin(defaults.namespace, promethean);

// Include the version number.
promethean.VERSION = VERSION;

export default promethean;
