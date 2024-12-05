const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Contrato = require('../models/contratoModel.js');
const Renta = require('../models/rentaModel.js');
const Vestido = require('../models/vestidoModel.js')

exports.crearContrato = async (req, res) => {
    try {
        const { idRenta, idCliente, idVestido } = req.body;

        const renta = await Renta.findById(idRenta);
        const cliente = await Cliente.findById(idCliente);
        const vestido = await Vestido.findById(idVestido);

        if (!renta || !cliente || !vestido) {
            return res.status(404).json({ message: 'Renta, Cliente o Vestido no encontrado' });
        }

        const contrato = new Contrato({
            id_renta: renta._id,
            nombre_cliente: cliente.nombre,
            numero_identificacion: cliente.numero_identificacion,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            fecha_renta: renta.fecha_renta,
            fecha_devolucion_programada: renta.fecha_devolucion_programada,
            precio_renta: vestido.precio_renta,
            modelo: vestido.modelo,
            talla: vestido.talla,
            color: vestido.color,
            estado: vestido.estado,
            costo_reposicion: vestido.costo_reposicion
        });

        await contrato.save();

        res.status(201).json({ message: 'Contrato creado exitosamente', contrato });
    } catch (error) {
        console.error('Error al crear el contrato:', error);
        res.status(500).json({ message: 'Error al crear el contrato', error });
    }
};

exports.generarContrato = async (req, res) => {
    try {
        const contratoId = req.params.id;
        const contrato = await Contrato.findById(contratoId);
        if (!contrato) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }
        console.log('Contrato creandose');

        const doc = new PDFDocument();
        const filePath = path.join(__dirname, `../pdfs/Contrato_${contratoId}.pdf`);
        doc.pipe(fs.createWriteStream(filePath));

        // Encabezado del contrato
        doc.fontSize(16).text('CONTRATO DE RENTA DE VESTIDOS', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Entre:\nNombre del negocio: Magnifique Boutique`);
        doc.text(`Dirección: C. Zarco 302 sur, Zona Centro, Durango, Durango, C.P. 34100`);
        doc.text(`Teléfonos: 6188047416, 6188035385`);

        // Información del cliente
        doc.moveDown().text(`Y el cliente:\nNombre completo: ${contrato.nombre_cliente}`);
        doc.text(`Identificación: ${contrato.numero_identificacion}`);
        doc.text(`Teléfono: ${contrato.telefono}`);
        doc.text(`Domicilio: ${contrato.direccion}`);

        // Objetivo del contrato
        doc.moveDown().text('OBJETO DEL CONTRATO:', { underline: true });
        doc.text('El presente contrato tiene como objetivo la renta del(los) vestido(s) descrito(s) a continuación, bajo los términos y condiciones que se detallan:');

        // Descripción del vestido
        doc.moveDown().text('1. Descripción del vestido:', { underline: true });
        doc.text(`Modelo: ${contrato.modelo}`);
        doc.text(`Talla: ${contrato.talla}`);
        doc.text(`Color: ${contrato.color}`);
        doc.text(`Estado: ${contrato.estado}`);
        doc.text(`Fecha de entrega: ${new Date(contrato.fecha_renta).toLocaleDateString()}`);
        doc.text(`Fecha de devolución: ${new Date(contrato.fecha_devolucion_programada).toLocaleDateString()}`);

        // Monto de la renta
        doc.moveDown().text('2. Monto de la renta:', { underline: true });
        doc.text(`Total: $${contrato.precio_renta}`);

        // Condiciones
        doc.moveDown().text('3. Condiciones:', { underline: true });
        doc.text('1. El cliente se compromete a devolver el vestido en las mismas condiciones en las que fue entregado.');
        doc.text(`2. En caso de daño o pérdida, el cliente deberá cubrir el costo de reparación o reposición, estimado en $${contrato.costo_reposicion}.`);
        doc.text('3. El vestido debe devolverse en la fecha y hora acordadas. En caso de retraso, se aplicará un cargo adicional de $100 pesos por cada día de demora.');
        doc.text('4. El cliente no podrá realizar alteraciones permanentes al vestido.');

        // Clausulas adicionales
        doc.moveDown().text('4. Cancelaciones:', { underline: true });
        doc.text('Una vez realizado el apartado del vestido, no se aceptan cancelaciones debido a los ajustes que puede conllevar y el tiempo destinado al cliente en el proceso de renta.');

        doc.moveDown().text('5. Jurisdicción:', { underline: true });
        doc.text('Este contrato se rige por las leyes locales y ambas partes aceptan someterse a los tribunales competentes en Durango, Durango.');

        // Firma
        doc.moveDown().text('6. Firma de las partes:', { underline: true });
        doc.text(`El cliente: ${contrato.nombre_cliente}`);
        doc.text('Firma: ________________________________');
        doc.moveDown().text('Magnifique Boutique:');
        doc.text('Sello: ________________________________');
        doc.text(`Fecha: ${new Date(contrato.fecha_renta).toLocaleDateString()}`);

        // Finalizar el documento
        doc.end();

        doc.on('finish', () => {
            res.download(filePath, `Contrato_${contratoId}.pdf`, (err) => {
                if (err) {
                    console.error('Error al descargar el PDF:', err);
                    res.status(500).json({ message: 'Error al descargar el PDF' });
                }
            });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ message: 'Error al generar el PDF', error });
    }
};
