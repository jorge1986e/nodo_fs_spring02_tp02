// 1. Solución de DNS (Arriba de todo)
const dns = require('node:dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require('mongoose');

// 2. Conexión
mongoose.connect('mongodb+srv://grupo-06:grupo-06@cluster0.blryo.mongodb.net/NodeMod3Cohorte5')
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
        ejecutarOperaciones(); // Llamamos a las funciones una vez conectados
    })
    .catch(error => console.error('Error al conectar a MongoDB:', error));

// 3. Definición del Modelo (Igual que el tuyo)
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String
}, { collection: 'Grupo-06' });

const SuperHero = mongoose.model('SuperHero', superheroSchema);

// 4. Función controladora para ejecutar todo en orden
async function ejecutarOperaciones() {
    try {
        // INSERTAR
        const hero = new SuperHero({
            nombreSuperHeroe: 'Spiderman',
            nombreReal: 'Peter Parker',
            edad: 25,
            planetaOrigen: 'Tierra',
            creador: 'Martin'
        });
        await hero.save();
        console.log('1. Superhéroe insertado');

        // BUSCAR
        const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
        console.log('2. Superhéroes en la Tierra:', heroes.length);

        // ACTUALIZAR
        await SuperHero.updateOne(
            { nombreSuperHeroe: 'Spiderman' }, 
            { $set: { edad: 26 } });
        console.log('3. Edad actualizada');

        // ELIMINAR (Opcional, si lo borras rápido no lo verás en Compass)
        // await SuperHero.deleteOne({ nombreSuperHeroe: 'Spiderman' });
        // console.log('4. Superhéroe eliminado');

    } catch (error) {
        console.error('Error en la lógica:', error);
    }
}