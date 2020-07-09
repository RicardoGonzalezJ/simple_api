const url = require('url');

let contacts = [
    {
        id: 1,
        name: "Ricardo González",
        email: "ragj@mail.com"
    },
    {
        id: 2,
        name: "Pedro Pan",
        email: "ppan@mail.com"
    },
    {
        id: 3,
        name: "Logan Mendoza",
        email: "lm@mymail.com"
    }
]

exports.post = (req, res) => {
    let contact = '';

    req.setEncoding('utf8');
    req.on('data', (data) => {
        try {
            console.log('Grabando Datos...')
            contact += data; 
        } catch (error) {
            res.statusCode = 400;
            res.end(error);
        }
    });

    req.on('end', () => {
        try {
            contacts.push(JSON.parse(contact));
            console.log('Datos Grabados exitosamente!');
            res.end();
        } catch (error) {
            res.statusCode = 400;
            res.write('Bad request: la entrada debe ser en formato JSON\n')
            res.end();
        }       
    });
}

exports.get = (res) => {
    res.statusCode = 200;
    let body = JSON.stringify(contacts) + '\n';
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.setHeader('Content-Type', 'application/json');
    res.end(`${body}`);
}

exports.deleteMe = (req, res) => {
    const path = url.parse(req.url).pathname;
    const id = parseInt(path.slice(1), 10);

    const index = contacts.findIndex( c => c.id === id);

    if (isNaN(id)) {
        res.statusCode = 400;
        res.end('el Id debe ser un número\n');
    }
    if (index === -1) {
        res.statusCode = 400;
        res.end('id no encontrado\n');
    } else {
        res.statusCode = 200;
        contacts.splice(index, 1);
        res.end('Elemento borrado\n');
    } 
}

exports.putMe = (req, res) => {
    
    const path = url.parse(req.url).pathname;
    const id = parseInt(path.slice(1), 10);

    const index = contacts.findIndex( c => c.id === id);
    
    if (isNaN(id)) {
        res.statusCode = 400;
        res.end('El ID debe ser un número\n');
    }
    if (index === -1) {
        res.statusCode = 400;
        res.end('ID no encontrado\n');
    } else {
        let contact = '';
        let newContacts;
        res.statusCode = 200;
        req.setEncoding('utf8');

        req.on('data', (data) => {
            try {
                contact += data;
            } catch (error) {
                res.statusCode = 400;
                res.end(error);
            }
        });

        req.on('end', () => {
            try {
                newContacts = JSON.parse(contact);
                contacts[index].name = newContacts.name;
                contacts[index].email = newContacts.email;

                res.end('Registro actualizado correctamente\n');
            } catch (error) {
                res.statusCode = 400;
                res.write('Bad request: la entrada debe ser en formato JSON\n')
                res.end();
            }
            
        });
    }
}
