document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Crear contenedor principal
    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'flex';
    chatContainer.style.justifyContent = 'space-between';
    chatContainer.style.width = '100%';
    chatContainer.style.height = '100vh'; // Ajustar a la altura de la ventana
    chatContainer.style.borderRadius = '20px';

    // Crear contenedor de lista de chats
    const chatListContainer = document.createElement('div');
    chatListContainer.style.width = '30%';
    chatListContainer.style.backgroundColor = 'rgb(233, 236, 239)';
    chatListContainer.style.borderRadius = '20px';
    chatListContainer.style.overflow = 'auto';
    

    // Función para agregar chats a la lista
    function agregarChatALaLista(nombre, imagenUrl) {
        const chatCard = document.createElement('div');
        chatCard.style.display = 'flex';
        chatCard.style.alignItems = 'center';
        chatCard.style.padding = '10px';
        chatCard.style.borderBottom = '1px solid #ccc';
        chatCard.style.cursor = 'pointer';

        const img = document.createElement('img');
        img.src = imagenUrl;
        img.style.width = '50px'; 
        img.style.height = '50px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        img.style.marginRight = '10px';

        const chatName = document.createElement('span');
        chatName.innerText = nombre;
        //chatName.style.fontWeight = 'bold';

        chatCard.appendChild(img);
        chatCard.appendChild(chatName);

        chatListContainer.appendChild(chatCard);

        // Evento de clic para la tarjeta del chat
        chatCard.addEventListener('click', function() {
            chatHeaderTitle.innerText = nombre; // Solo actualiza el título, no todo el encabezado
        });
    }

    // Datos de ejemplo para los chats
    const listaChats = [
        { nombre: " ", imagenUrl: "img.jpeg" },
    ];

    // Añadir los chats a la lista
    listaChats.forEach(chat => {
        agregarChatALaLista(chat.nombre, chat.imagenUrl);
    });

    // Función para obtener la lista de usuarios del chat
    function obtenerUsuariosDelChat() {
        fetch('http://uwu-guate.site:3000/messages')
            .then(response => response.json())
            .then(data => {
                // Crear un conjunto para almacenar nombres de usuario únicos
                const usuariosUnicos = new Set();
            
             // Asumiendo que cada mensaje tiene una estructura como [id, username, message, create_date]
                data.forEach(mensaje => {
                    usuariosUnicos.add(mensaje[1]); // Añadir el username al conjunto
                });

            // Convertir el conjunto a un arreglo para su manejo
                const usuariosDelChat = Array.from(usuariosUnicos).map(username => {
                    return { nombre: username, imagenUrl: "img.jpeg" }; // Usar una imagen genérica para todos
                });

            // Limpiar la lista de chats antes de añadir los nuevos
                chatListContainer.innerHTML = '';

            // Añadir los chats a la lista
                usuariosDelChat.forEach(chat => {
                    agregarChatALaLista(chat.nombre, chat.imagenUrl);
                });
            })
            .catch(error => console.error('Error al obtener usuarios del chat:', error));
    }
    obtenerUsuariosDelChat(); // Obtener los usuarios al cargar la página


    // Crear contenedor del chat actual
    const currentChatContainer = document.createElement('div');
    currentChatContainer.style.width = '70%';
    currentChatContainer.style.display = 'flex';
    currentChatContainer.style.flexDirection = 'column';

    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = 'rgb(108, 117, 125)';
    chatHeader.style.padding = '20px';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.style.fontSize = '20px';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.borderRadius = '20px 20px 0 0';

    // Crear un elemento para el título del chat
    const chatHeaderTitle = document.createElement('span');
    chatHeaderTitle.innerText = 'Chat Server'; // Placeholder para el título
    chatHeader.appendChild(chatHeaderTitle);

    // Botón para cambiar el modo
    const modeToggleButton = document.createElement('button');
    modeToggleButton.innerText = 'Modo Oscuro';
    modeToggleButton.style.padding = '10px';
    modeToggleButton.style.borderRadius = '10px';
    chatHeader.appendChild(modeToggleButton); // Añadir el botón al encabezado del chat

    // Crear área del chat
    const chatArea = document.createElement('div');
    chatArea.style.flexGrow = '1';
    chatArea.style.backgroundColor = 'rgb(248, 249, 250)';
    chatArea.style.overflow = 'auto';
  

    // Crear área de entrada para mensajes
    const messageInputArea = document.createElement('div');
    messageInputArea.style.display = 'flex';
    messageInputArea.style.padding = '30px';
    messageInputArea.style.backgroundColor = 'rgb(108, 117, 125)';
    messageInputArea.style.borderRadius = '0 0 20px 20px';

    const messageInput = document.createElement('textarea');
    messageInput.placeholder = 'Escribe un mensaje';
    messageInput.style.flexGrow = '1';
    messageInput.style.marginRight = '10px';
    messageInput.style.resize = 'none';
    messageInput.style.padding = '10px';
    messageInput.style.border = '1px solid #ccc';
    messageInput.style.borderRadius = '10px';
    messageInput.style.height = '30px';
    messageInput.maxLength = 140;

     // Evento para enviar mensaje con Enter
     messageInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // Evitar el salto de línea
            enviarMensaje(); // Envía el mensaje
        }
    });

    const sendButton = document.createElement('button');
    sendButton.innerText = 'Enviar';
    sendButton.style.borderRadius= '10px';
    sendButton.onclick = function() {
        console.log('Mensaje enviado:', messageInput.value);
        messageInput.value = ''; // Limpiar el campo después de enviar
    };

    obtenerMensajes(); // Llamar a la función para cargar mensajes al cargar la página
    

    // Función para enviar mensajes
    function enviarMensaje() {
    if (messageInput.value.trim() !== '') {
        const mensajeParaEnviar = {
            username: "JorgeLopez", // username 
            message: messageInput.value
        };

        // Enviar el mensaje al servidor
        fetch('http://uwu-guate.site:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeParaEnviar)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mensaje enviado:', data);
            obtenerMensajes(); // Obtener los mensajes actualizados después de enviar uno nuevo
        })
        .catch(error => console.error('Error al enviar mensaje:', error));

        // Agregar visualmente el mensaje al chat
        const mensaje = document.createElement('div');
        mensaje.innerText = messageInput.value;
        mensaje.className = 'mensaje';
        mensaje.style.padding = '10px';
        mensaje.style.margin = '5px 0';
        mensaje.style.borderRadius = '10px';
        mensaje.style.backgroundColor = 'rgb(202, 240, 248)';
        mensaje.style.textAlign = 'right';
        mensaje.style.marginLeft = '10px';
        mensaje.style.marginRight = '10px';
        chatArea.appendChild(mensaje);
        chatArea.scrollTop = chatArea.scrollHeight;

        // Limpiar el campo de entrada
        messageInput.value = '';
        }
    }


    function obtenerMensajes() {
        const usuarios = new Set(); // Para almacenar usuarios únicos
        fetch('http://uwu-guate.site:3000/messages')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de red: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Limpiar el área de chat antes de mostrar los mensajes nuevos
                chatArea.innerHTML = '';
    
                const mensajesEnOrdenAscendente = data.reverse();
    
                mensajesEnOrdenAscendente.forEach(mensaje => {
                    const mensajeDiv = document.createElement('div');
                    mensajeDiv.className = 'mensaje';
                    mensajeDiv.style.padding = '10px';
                    mensajeDiv.style.margin = '5px 0';
                    mensajeDiv.style.borderRadius = '10px';
                    mensajeDiv.style.marginLeft = '10px';
                    mensajeDiv.style.marginRight = '10px';
                    mensajeDiv.style.wordWrap = 'break-word';
    
                    const username = mensaje[1];
                    const message = mensaje[2];
    
                    // Distinguir si el mensaje es del usuario actual o de otro
                    if (username === "JorgeLopez") {
                        mensajeDiv.style.backgroundColor = 'rgb(202, 240, 248)';
                        mensajeDiv.style.textAlign = 'right';
                    } else {
                        mensajeDiv.style.backgroundColor = 'rgb(183, 239, 197)';
                        mensajeDiv.style.textAlign = 'left';
                    }
    
                    // Comprobar si el mensaje es un enlace a una imagen
                    if (isImageLink(message)) {
                        const imageElement = document.createElement('img');
                        imageElement.src = message;
                        imageElement.style.maxWidth = '100%';
                        imageElement.style.height = 'auto';
                        mensajeDiv.appendChild(imageElement);
                    } else {
                        mensajeDiv.innerHTML = `<strong>${username}:</strong> ${message}`;
                    }
    
                    chatArea.appendChild(mensajeDiv);
                });
    
                chatArea.scrollTop = chatArea.scrollHeight; // Desplazar al final del área de chat
            })
            .catch(error => console.error('Error al obtener mensajes:', error));
    }
    
    function isImageLink(text) {
        return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(text);
    }
    
    // Llamar a obtenerMensajes al cargar la página o según tu lógica de aplicación
    obtenerMensajes();

    // Función para mostrar la lista de usuarios
    function mostrarUsuarios(listaDeUsuarios) {
        const listaUsuariosContainer = document.createElement('div');
        listaUsuariosContainer.style.padding = '10px';
        listaUsuariosContainer.style.backgroundColor = 'rgb(255, 255, 255)';
        listaUsuariosContainer.style.borderRadius = '20px';
        listaUsuariosContainer.style.marginTop = '20px';
        listaUsuariosContainer.innerHTML = '<strong>Usuarios en el chat:</strong>';

        listaDeUsuarios.forEach(usuario => {
            const usuarioDiv = document.createElement('div');
            usuarioDiv.innerText = usuario;
            usuarioDiv.style.padding = '5px 0';
            listaUsuariosContainer.appendChild(usuarioDiv);
        });

        currentChatContainer.appendChild(listaUsuariosContainer);
}

    // Eventos para enviar mensaje
    sendButton.onclick = enviarMensaje;
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            enviarMensaje();
        }
    });

    // Añadir el campo de texto y el botón al área de entrada
    messageInputArea.appendChild(messageInput);
    messageInputArea.appendChild(sendButton);

    // Estructurar los contenedores
    currentChatContainer.appendChild(chatHeader);
    currentChatContainer.appendChild(chatArea);
    currentChatContainer.appendChild(messageInputArea); 
    chatContainer.appendChild(chatListContainer);
    chatContainer.appendChild(currentChatContainer);

    // Añadir al body
    body.appendChild(chatContainer);

    // Estilos para modo oscuro
    const darkModeStyles = {
        backgroundColor: 'rgb(25, 25, 25)', // Fondo oscuro para el contenedor principal
        color: 'white', // Texto blanco
        chatListContainer: 'rgb(73, 80, 87)', // Fondo más oscuro para la lista de chats
        chatHeader: 'rgb(52, 58, 64)', // Fondo oscuro para el encabezado
        chatArea: 'rgb(33, 37, 41)', // Fondo oscuro para el área del chat
        messageInputArea: 'rgb(52, 58, 64)', // Fondo oscuro para el área de entrada
        mensaje: {
            backgroundColor: 'rgb(2, 62, 138)', // Un fondo más oscuro para los mensajes
            color: 'rgb(200, 200, 200)', // Texto más claro para los mensajes
        }
    };

    // Función para cambiar el modo
    let isDarkMode = false; // Estado inicial del modo
    function toggleMode() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            chatContainer.style.backgroundColor = darkModeStyles.backgroundColor;
            chatContainer.style.color = darkModeStyles.color;
            chatListContainer.style.backgroundColor = darkModeStyles.chatListContainer;
            chatHeader.style.backgroundColor = darkModeStyles.chatHeader;
            chatArea.style.backgroundColor = darkModeStyles.chatArea;
            messageInputArea.style.backgroundColor = darkModeStyles.messageInputArea;
            modeToggleButton.innerText = 'Modo Claro';
            document.querySelectorAll('.mensaje').forEach(mensaje => {
                mensaje.style.backgroundColor = darkModeStyles.mensaje.backgroundColor;
                mensaje.style.color = darkModeStyles.mensaje.color;
            });
        } else {
            chatContainer.style.backgroundColor = '';
            chatContainer.style.color = '';
            chatListContainer.style.backgroundColor = 'rgb(233, 236, 239)';
            chatHeader.style.backgroundColor = 'rgb(108, 117, 125)';
            chatArea.style.backgroundColor = 'rgb(248, 249, 250)';
            messageInputArea.style.backgroundColor = 'rgb(108, 117, 125)';
            modeToggleButton.innerText = 'Modo Oscuro';
            document.querySelectorAll('.mensaje').forEach(mensaje => {
                mensaje.style.backgroundColor = 'rgb(202, 240, 248)'; // Revertir al estilo original
                mensaje.style.color = ''; // Revertir al estilo original
            });
        }
    }

    // Evento de clic para el botón de cambio de modo
    modeToggleButton.addEventListener('click', toggleMode);
});

