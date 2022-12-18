
const miFormulario = document.querySelector('form');

console.log( window.location.hostname.includes('localhost'));


const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

console.log(url);

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements ) {
        if ( el.name.length > 0 ) 
            formData[el.name] = el.value
    }
    console.log(formData);
 
    fetch( url + 'login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ msg, token ,user  }) => {
            if( msg ){
                return console.error( msg );
            }
            console.log("Server: "+ user);
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( err => {
        console.log(err)
    })

   
});
    

function handleCredentialResponse(response) {
   
   const id_token= response.credential
   var userMail=''
  
   fetch( url + 'signin', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify( {id_token} )
   })
   .then( resp => resp.json() )
   .then( ({ user , token }) => {
     console.log(user);
     userMail=user.mail
       localStorage.setItem('token',token);
       window.location = 'chat.html';
   })
   .catch( console.log );
   

   const button = document.getElementById("signout_button");
   button.onclick = () => {

    google.accounts.id.revoke(userMail, done => {
     
        localStorage.removeItem("token")
        console.log('consent revoked');
 })
   }
 }
            
