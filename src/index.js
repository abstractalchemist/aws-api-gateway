import Amplify, { API } from 'aws-amplify'


function initialize_amplify() {
   console.log("initializing aws-amplify");
   Amplify.configure({
      Auth: {
         identityPoolId:"us-west-2:38229d49-5228-4cd3-ac87-516f5cd9f782",
         userPoolId:"us-west-2_KmcWAEKvq",
         userPoolWebClientId:"4ntv255u2naoch9l1djdlb6dh0",
         region:"us-west-2"
      },
      API: {
         endpoints: [
            {
               name:"PanaceaTesting",
               endpoint:"https://l6lae8gpmj.execute-api.us-west-2.amazonaws.com/panacea-testing"
            }
         ]
      }
   })
   console.log("initialization finished")
}

initialize_amplify();

document.addEventListener('DOMContentLoaded', function() {
   
})
