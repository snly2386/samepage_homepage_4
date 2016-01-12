// NAVEGADOR FIX
var BrowserDetect = {
   init: function () {
   Â this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
   Â this.version = this.searchVersion(navigator.userAgent)
   Â  || this.searchVersion(navigator.appVersion)
   Â  || "an unknown version";
   Â this.OS = this.searchString(this.dataOS) || "an unknown OS";
   },
   searchString: function (data) {
   Â for (var i=0;i<data.length;i++) {
   Â  var dataString = data[i].string;
   Â  var dataProp = data[i].prop;
   Â  this.versionSearchString = data[i].versionSearch || data[i].identity;
   Â  if (dataString) {
   Â  Â if (dataString.indexOf(data[i].subString) != -1)
   Â  Â  return data[i].identity;
   Â  }
   Â  else if (dataProp)
   Â  Â return data[i].identity;
   Â }
   },
   searchVersion: function (dataString) {
   Â var index = dataString.indexOf(this.versionSearchString);
   Â if (index == -1) return;
   Â return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
   },
   dataBrowser: [
   Â {
   Â  string: navigator.userAgent,
   Â  subString: "Chrome",
   Â  identity: "Chrome"
   Â },
   Â { Â string: navigator.userAgent,
   Â  subString: "OmniWeb",
   Â  versionSearch: "OmniWeb/",
   Â  identity: "OmniWeb"
   Â },
   Â {
   Â  string: navigator.vendor,
   Â  subString: "Apple",
   Â  identity: "Safari",
   Â  versionSearch: "Version"
   Â },
   Â {
   Â  prop: window.opera,
   Â  identity: "Opera",
   Â  versionSearch: "Version"
   Â },
   Â {
   Â  string: navigator.vendor,
   Â  subString: "iCab",
   Â  identity: "iCab"
   Â },
   Â {
   Â  string: navigator.vendor,
   Â  subString: "KDE",
   Â  identity: "Konqueror"
   Â },
   Â {
   Â  string: navigator.userAgent,
   Â  subString: "Firefox",
   Â  identity: "Firefox"
   Â },
   Â {
   Â  string: navigator.vendor,
   Â  subString: "Camino",
   Â  identity: "Camino"
   Â },
   Â { Â // for newer Netscapes (6+)
   Â  string: navigator.userAgent,
   Â  subString: "Netscape",
   Â  identity: "Netscape"
   Â },
   Â {
   Â  string: navigator.userAgent,
   Â  subString: "MSIE",
   Â  identity: "Explorer",
   Â  versionSearch: "MSIE"
   Â },
   Â {
   Â  string: navigator.userAgent,
   Â  subString: "Gecko",
   Â  identity: "Mozilla",
   Â  versionSearch: "rv"
   Â },
   Â { Â  // for older Netscapes (4-)
   Â  string: navigator.userAgent,
   Â  subString: "Mozilla",
   Â  identity: "Netscape",
   Â  versionSearch: "Mozilla"
   Â }
   ],
   dataOS : [
   Â {
   Â  string: navigator.platform,
   Â  subString: "Win",
   Â  identity: "Windows"
   Â },
   Â {
   Â  string: navigator.platform,
   Â  subString: "Mac",
   Â  identity: "Mac"
   Â },
   Â {
   Â  Â  Â string: navigator.userAgent,
   Â  Â  Â subString: "iPhone",
   Â  Â  Â identity: "iPhone/iPod"
   Â  Â  },
   Â {
   Â  string: navigator.platform,
   Â  subString: "Linux",
   Â  identity: "Linux"
   Â }
   ]
};
BrowserDetect.init();
var browserDetection = BrowserDetect.browser;
var browserVersion = 'v' + BrowserDetect.version;
var OSname = BrowserDetect.OS;