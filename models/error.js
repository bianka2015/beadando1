
module.exports = {
    identity: 'error',
    connection: 'default',
    attributes: {
        nev: {
            type: 'string',
            //defaultsTo: function () { return new Date(); },
            required: true,
        },
        kod: {
            type: 'string',
           // enum: ['new', 'assigned', 'success', 'rejected', 'pending'],
            required: true,
        },
        kredit: {
            type: 'string',
            required: true,
        },
        leiras: {
            type: 'string',
            required: false,
        },
        
        i: {
            type: 'string',
            required: false,
        },

        user: {
            model: 'user',
        },
    }
}

