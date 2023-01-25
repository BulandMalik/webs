import logo from './logo.svg';
import ldLogo from './ld_logo.png'
import './App.css';
import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';

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

function App(props) {
  const {"PN_ERX-1023_MULTI_TENANCY_ENABLED" : PN_ERX1023_MULTI_TENANCY_ENABLED} = useFlags();
  console.log("PN_ERX-PN_ERX_1023_MULTI_TENANCY_ENABLED:",PN_ERX1023_MULTI_TENANCY_ENABLED);
  console.log("userId:",props.userId);
  console.log("userEmail:",props.userEmail);
  console.log("tenantId:",props.tenantId);

  ldContext = {
    kind: 'user',
    key: props.userId,
    name: 'Grace Hopper',
    user_email: props.userEmail,
    tenant_id: props.tenantId,
    _meta: {
      privateAttributes: ['user_email']
    }
  };

  console.log("ldContext:",ldContext)
  return (
    <div className="App">
      <header className="App-header">
        {
          PN_ERX1023_MULTI_TENANCY_ENABLED ? 
          (<img src={ldLogo} className="App-logo" alt="logo" />) :
          (<img src={logo} className="App-logo" alt="logo" />)
        }

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
  clientSideID: '63ac9dcd4f2a0710f209e5ae',
  context: ldContext,
  options: {
    bootstrap: "localStorage",
    privateAttributes: ['user_email']
  },
  reactOptions: {
    useCamelCaseFlagKeys: false
  }
})(App);