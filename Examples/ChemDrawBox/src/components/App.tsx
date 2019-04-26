import * as React from "react";
import { Button } from "reactstrap"
import UserInfo from "./UserInfo";

import dropboxImage from '../images/dropbox.svg'
import "./App.css";

declare var ChemDrawAPI: any;

interface IAppState {
  accessToken: string
}

class App extends React.Component<any, IAppState> {
  
  public state: IAppState = { accessToken: "" }

  public render() {

    if (this.state.accessToken.length > 0) {
      return <UserInfo accessToken={this.state.accessToken}/>
    }
    else {
      return (
        <div className="container-fluid text-center mt-5">
          <div className="row m-5">
            <div className="col">
              <img src={dropboxImage} alt="Dropbox" className="img-thumbnail" height="100px" width="100px"/>
            </div>
          </div>
          <div className="row m-5">
            <div className="col">
              <p>Connect to Dropbox to see account information and files</p>
              <Button color="primary" onClick={ this.connectToDropbox }>Connect to Dropbox</Button>
            </div>
          </div>
        </div>
      );
    }
  }

  private connectToDropbox = () => {
    // Register a callback function with ChemDraw
    const callbackKey = ChemDrawAPI.registerURLTriggeredCallback(this.onCallback);

    // Construct a URL for authorization containing the callback key
    let dropboxOAuthUrl = "https://www.dropbox.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=com.perkinelmer.chemdraw.addin:///";
    dropboxOAuthUrl += "&state=" + callbackKey;

    // Open the URL in external browser to authorize
    ChemDrawAPI.openURLInDefaultBrowser(dropboxOAuthUrl);

    // To run in browser, comment out the lines above and uncomment the one below
    // Replace the DROPBOX_ACCESS_TOKEN with your own token gotten from Dropbox
    // this.onCallback('test:///#access_token=DROPBOX_ACCESS_TOKEN&state=test');
  }

  /**
   * Gets called by Dropbox service on success with a URL string similar to 
   * "YOUR_ENDPOINT:///#access_token=xxxxxxx&state=yyyyyy..."
   */
  private onCallback = (arg: string) => {
    // Break the URL into key value pairs and extract access token
    const fragment = arg.substring(arg.indexOf('#') + 1);
    const keyValueArray = fragment.split("&").map(pair => pair.split("="));
    
    const resultMap = new Map();
    keyValueArray.forEach(([key,value]) => resultMap.set(key, value));

    this.setState({
      accessToken: resultMap.get("access_token")
    });
  }
}

export default App;
