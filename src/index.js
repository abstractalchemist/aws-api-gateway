import Amplify, { Hub, API, Auth } from 'aws-amplify'
import { from, Observable } from 'rxjs'
import { map, tap, mergeMap } from 'rxjs/operators'

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
               endpoint:"https://l6lae8gpmj.execute-api.us-west-2.amazonaws.com/panacea-testing",
               region:"us-west-1"
            }
         ]
      }
   })
   console.log("initialization finished")
}

initialize_amplify();

Hub.listen('auth', {
   onHubCapsule: capsule => {
      console.log(capsule)
      from(Auth.currentAuthenticatedUser())
         .pipe
         .subscribe(
            user => {

               console.log(user)
               from(API.post("PanaceaTesting", "/ml", { body: {} }))
                  .pipe(
                     tap( _ => {
                        console.log("processing requets")
                     })
                  )
                  .subscribe(
                     ({ status, data}) => {
                        console.log(data)
                     },
                     ({ response: { status, data } }) => {
                        console.log(status)
                     })
         

            },
            error => {
               console.error(error)
            })
   }
})

document.addEventListener('DOMContentLoaded', function() {

//    from(Auth.signIn('abstractalchemist@gmail.com', '1qaz@WSX'))
//      .pipe(
//         tap(user => {
//            console.log(user)
//         }),
////         mergeMap(Auth.currentAuthenticatedUser),
//         tap(_ => {
//            console.log("trying to change password")
//         }),
//         mergeMap(user => {
//            return Auth.completeNewPassword(user, '2wsx#EDC', { preferred_username:'abstractalchemist@gmail.com'  })
//         })
//      )
//      .subscribe(
//         data => {
//            console.log(data)
//         },
//         error => {
//            console.log(error)
//         })
        
   from(Auth.signIn('abstractalchemist@gmail.com', '2wsx#EDC'))
      .subscribe(
         data => {
            console.log("signin successful")
            console.log(data)
         },
         error => {
            console.log("a sign in error occurred");
            console.log(error)
         })


   from(API.post('PanaceaTesting', "/panacea", { body: {}  }))
      .subscribe(
         data => {
         },
         error => {
            console.log(error)
         })
})
