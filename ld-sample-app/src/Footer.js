/**
 * withLDConsumer is a function which accepts an optional options object and 
 * returns a function which accepts your React component. This function returns
 * a HOC with flags and the ldClient instance injected via props.
 * 
 * https://launchdarkly.github.io/react-client-sdk/index.html#withLDConsumer
 */
import { withLDConsumer } from "launchdarkly-react-client-sdk";

// import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
 
 // Pass the flags prop and return an element based on the state of the feature flag key
 const Footer = ( props: HocProps  ) => {
    console.log("___________________ inside Fotter.js");
     console.log("props:",props);
     //console.log("props.flags:",props.flags);
     //console.log("props.ldClient:",props.ldClient);
     const {"PN_ERX-1023_MULTI_TENANCY_ENABLED" : PN_ERX1023_MULTI_TENANCY_ENABLED} = props.flags;
     console.log("PN_ERX-1023_MULTI_TENANCY_ENABLED:",PN_ERX1023_MULTI_TENANCY_ENABLED);
     //console.log("show_me:",flags.show_me);
     console.log("userId:",props.ldUserCtx.userId);
     console.log("userEmail:",props.ldUserCtx.userEmail);
     console.log("tenantId:",props.ldUserCtx.tenantId);
     let ldContext = {
        kind: 'user',
        key: props.ldUserCtx.userId,
        name: 'Buland Malik',
        user_email: props.ldUserCtx.userEmail,
        tenant_id: props.ldUserCtx.tenantId,
        _meta: {
          privateAttributes: ['user_email']
        }
      };         

     {props.ldClient ? 
            props.ldClient.identify(ldContext) : 
            console.log('Negative, no ldClient')
    };
    
     //console.log("props.flags:",props.flags);
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