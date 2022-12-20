

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

let usuario = null;
let socket  = null;

// Referencias HTML
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');



// Validar el token del localstorage
const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB );
    user = userDB;
    document.title = user.name

    await conectarSocket();
    
}

const conectarSocket = async() => {
    
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () =>{
        console.log('Sockets online')
    });

    socket.on('disconnect', () =>{
        console.log('Sockets offline')
    });

    socket.on('recive-msg', showMSG );
 
    socket.on('users-online', showUsers );

    socket.on('private-msg', ( payload ) => {
        console.log('Privado:', payload )
    });


}
const showUsers = ( users = []) => {
    
    let usersHtml = '';

    console.log(users);

    users.forEach( ({ name, uid }) => {
       
        const {_id}=uid
        
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success"> ${ name } </h5>
                    <span class="fs-6 text-muted">${ _id }</span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHtml;
    
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {                 // keyup leer cada tecla  
    
    const msg = txtMensaje.value;
    const uid     = txtUid.value;

    if( keyCode !== 13 ){ return; }                                    // keycode de enter es 13                 
    if( msg.length === 0 ){ return; }

    socket.emit('send-msg', { msg, uid });

    txtMensaje.value = '';

})

const showMSG = ( message = []) => {
    
    let mensajesHTML = '';
    message.forEach( ({ name,  message }) => {

        console.log(name, message);
        mensajesHTML += `
            <li>
                <p>
                    <span class="text-primary">${ name }: </span>
                    <span>${ message }</span>
                    </p>
                    </li>
        `;
    });

    ulMensajes.innerHTML = mensajesHTML;
    
}


/* 


btnSalir.addEventListener('click', ()=> {

    localStorage.removeItem('token');

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => {
        console.log('User signed out.');
        window.location = 'index.html';
    });
});
 */
const main = async() => {
    // Validar JWT
    await validarJWT();
}


 main();

