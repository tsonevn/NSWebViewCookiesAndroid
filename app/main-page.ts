import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';
import {WebView, LoadEventData} from "ui/web-view";
import {setTimeout} from "timer"

// Event handler for Page "navigatingTo" event attached in main-page.xml
var cookieManager;
export function navigatingTo(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;
  cookieManager = android.webkit.CookieManager.getInstance();  
  page.bindingContext = new HelloWorldModel();
}
export function onviewloaded(args:EventData){

  var webview:WebView=<WebView>args.object;
  webview.android.getSettings().setJavaScriptEnabled(true);
  webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {

    let message;
    if (!args.error) {
        message = "WebView finished loading " + args.url;
         
            console.log("--------------------------------cookies------------------------------");
            var cookies= cookieManager.getCookie("https://httpbin.org");
            console.log(cookies);
            console.log("-------------------------------- end cookies------------------------------");
        }
    else {
        message = "Error loading " + args.url + ": " + args.error;
    }
});
}

export function onTap(){
  console.log("--------------------------------cookies------------------------------");
            var cookies= cookieManager.getCookie("https://httpbin.org");
            console.log(cookies);
            console.log("-------------------------------- end cookies------------------------------");
            alert(cookies);
}
