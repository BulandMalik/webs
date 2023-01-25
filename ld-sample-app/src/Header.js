/**
 * withLDConsumer is a function which accepts an optional options object and 
 * returns a function which accepts your React component. This function returns
 * a HOC with flags and the ldClient instance injected via props.
 * 
 * https://launchdarkly.github.io/react-client-sdk/index.html#withLDConsumer
 */
import { withLDConsumer } from "launchdarkly-react-client-sdk";

//import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';

import logo from './logo.svg';
import ldLogo from './ld_logo.png'


// Pass the flags prop and return an element based on the state of the feature flag key
/**
 * 
 * Notice how my component takes in flags as a prop. It automatically gets this 
 * when wrapped with the withLDConsumer HOC! Your flag that you made earlier can 
 * now be used in your component.
 * 
 * A HOC with flags and the ldClient instance injected via props.
 * 
 * @param {*} param0 
 * @returns 
 */
const Header = ( props: hocProps ) => {
    console.log("___________________ inside Header.js");
    //console.log("flags:",flags);
    const {"PN_ERX-1023_MULTI_TENANCY_ENABLED" : PN_ERX1023_MULTI_TENANCY_ENABLED} = props.flags;
    //console.log("PN_ERX-1023_MULTI_TENANCY_ENABLED:",PN_ERX1023_MULTI_TENANCY_ENABLED);
    //console.log("show_me:",flags.show_me);
    return (
      <>
        <header className="App-header">
            {
            PN_ERX1023_MULTI_TENANCY_ENABLED ? 
            (<img src={ldLogo} className="App-logo" alt="logo" />) :
            (<img src={logo} className="App-logo" alt="logo" />)
            }

            <h1>
                {props.ldUserCtx.compName}
            </h1>
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
      </>
    );
  };
  
//A HOC with flags and the ldClient instance injected via props
export default withLDConsumer()(Header);