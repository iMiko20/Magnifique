import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Footer } from '../components/Footer';

const faqs = [
  {
    question: '¿Cómo funciona el proceso de renta?',
    answer: 'El proceso de renta es simple: elige tu vestido, selecciona las fechas de renta, realiza el pago y recoge tu vestido. Después del evento, devuelves el vestido en las mismas condiciones.',
  },
  {
    question: '¿Qué pasa si el vestido no me queda?',
    answer: 'Recomendamos programar una prueba antes del evento. Si el vestido no te queda, puedes cambiarlo por otro disponible del mismo precio.',
  },
  {
    question: '¿Cuál es el período máximo de renta?',
    answer: 'El período estándar de renta es de 4 días, pero podemos ajustarlo según tus necesidades específicas.',
  },
  {
    question: '¿Cómo debo cuidar el vestido rentado?',
    answer: 'Proporcionamos instrucciones detalladas de cuidado con cada vestido. En general, evita manchas, no laves el vestido y manéjalo con cuidado.',
  },
  {
    question: '¿Qué incluye el precio de la renta?',
    answer: 'El precio incluye el vestido, ajustes básicos si son necesarios, y la limpieza profesional después de la devolución.',
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Preguntas Frecuentes
          </h1>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-pink-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-pink-600" />
                  )}
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
}