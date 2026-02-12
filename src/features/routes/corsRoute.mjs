import cors from 'cors'

const allowedDomain = ['http://localhost:3000', 'http://http://calonmantu.sbs/', 'https://calonmantu.sbs/']

const Options = {
    origin: function (origin, callback) {
    console.log('Origin:', origin);
    
        // allow requests origin (mobile apps, curl, etc)
        if (!origin) return callback(null, true);
        
        // Block null origin dari direct browser access
        if (origin === 'null' || origin === null) {
        return callback(new Error('Direct browser access not allowed'), false)
        }
        
        if (allowedDomain.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

export default cors(Options)