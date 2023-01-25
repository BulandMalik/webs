import App from './App';

import { withLDProvider } from 'launchdarkly-react-client-sdk';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


let ldContext = {
  kind: 'user',
  key: '',
  name: 'Grace Hopper',
  //email: 'gracehopper@example.com',
  user_email: '',
  tenant_id: '',
  _meta: {
    privateAttributes: ['user_email']
  }
};

function StartApp(props) {

  console.log("___________________ inside StartApp.js with env={} and clinetSideId:{}",process.env.NODE_ENV, process.env.REACT_APP_LAUNCHDARKLY_CLIENT_ID);
  //console.log("userId:",props.userId);
  //console.log("userEmail:",props.userEmail);
  //console.log("tenantId:",props.tenantId);

  ldContext = {
    kind: 'user',
    key: props.userId,
    name: 'Buland Malik',
    user_email: props.userEmail,
    tenant_id: props.tenantId,
    _meta: {
      privateAttributes: ['user_email']
    }
  };

  //console.log("ldContext:",ldContext)
  return (
      <div className="App">
      <Routes>
          <Route path="/1" element={<App compName="Tenant Id '1'" userId="user__1" userEmail="bm@gmail.com" tenantId="1"/>} />
          <Route path="/2" element={<App compName="Enable FLag for Specific Users" userId="user__2" userEmail="bm_test@gmail.com" tenantId="2"/>} />
          <Route path="/3" element={<App compName="Disable FLag" userId="user__3" userEmail="bm@gmail.com" tenantId="3"/>} />
      </Routes>
      </div>
  );
}

//export default App;

/**
 * -------------------------------
 * | Subscribing to flag changes |
 * -------------------------------
 * The React SDK automatically subscribes to flag change events after your 
 * app has mounted, which opens a streaming connection. We recommend explicitly 
 * enabling streaming mode. To enable streaming mode, specify a streaming: true 
 * attribute in your options object. When streaming is disabled, no live updates 
 * occur.
 */

/**
 * 1. Regarding ClientSideID, Set clientSideID to your own Client-side ID. 
 * You can find this in your LaunchDarkly portal under Account settings / Projects
 * 
 * 2. For bootstrap please refer https://launchdarkly.github.io/js-client-sdk/interfaces/LDOptions.html#bootstrap
 * 
 * 3. Regarding not using cameCase default reaxct SDK behavior, 
 * Whether the React SDK should transform flag keys into camel-cased format. 
 * Using camel-cased flag keys allow for easier use as prop values, however, 
 * these keys won't directly match the flag keys as known to LaunchDarkly. 
 * Consequently, flag key collisions may be possible and the Code References 
 * feature will not function properly.
 * This is true by default, meaning that keys will automatically be converted to camel-case.
 * please refer https://docs.launchdarkly.com/sdk/client-side/react/react-web#flag-keys
 * 
 * Context Onject
 *  key: The key property should uniquely identify each context. You can use a primary key, an email address, or a hash, as long as the same context always has the same key. We recommend using a hash if possible.
 */
export default withLDProvider({
  clientSideID: process.env.REACT_APP_LAUNCHDARKLY_CLIENT_ID,
  //context: ldContext,
  options: {
    bootstrap: "localStorage",
    privateAttributes: ['user_email']
  },
  reactOptions: {
    useCamelCaseFlagKeys: false
  }
})(StartApp);