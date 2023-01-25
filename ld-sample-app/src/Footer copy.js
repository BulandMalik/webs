/**
 * withLDConsumer is a function which accepts an optional options object and 
 * returns a function which accepts your React component. This function returns
 * a HOC with flags and the ldClient instance injected via props.
 * 
 * https://launchdarkly.github.io/react-client-sdk/index.html#withLDConsumer
 */
 import { withLDConsumer } from "launchdarkly-react-client-sdk";

 import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
 
 import logo from './logo.svg';
 import ldLogo from './ld_logo.png'
 
 
 // Pass the flags prop and return an element based on the state of the feature flag key
 const Footer = ({ flags, ldClient }) => {
     console.log("flags:",flags);
     console.log("ldClient:",ldClient);
     const {"PN_ERX-1023_MULTI_TENANCY_ENABLED" : PN_ERX1023_MULTI_TENANCY_ENABLED} = flags;
     console.log("PN_ERX-1023_MULTI_TENANCY_ENABLED:",PN_ERX1023_MULTI_TENANCY_ENABLED);
     //console.log("show_me:",flags.show_me);
     return (
       <>
         <footer className="App-footer">
             {
             PN_ERX1023_MULTI_TENANCY_ENABLED ? 
             (<>
                <p>
                    <b style={{ color: 'green' }}> With Launch Darkly</b>
                </p>
             </>) :
             (<>
                <p>
                    <b style={{ color: 'red' }}>Without Launch Darkly</b>
                </p>
             </>)
             }

         </footer>
       </>
     );
   };
   
 //A HOC with flags and the ldClient instance injected via props
 export default withLDConsumer()(Footer);