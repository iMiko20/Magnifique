import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/Footer';

export function AboutPage() {
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
          className="prose prose-pink mx-auto"
        >
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Sobre Magnifique
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">
                Nuestra Historia
              </h2>
              <p className="text-gray-600">
                Fundada en 2020, Magnifique nació con la visión de transformar la manera
                en que las personas acceden a vestidos de alta calidad para sus ocasiones
                especiales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">
                Nuestra Misión
              </h2>
              <p className="text-gray-600">
                Proporcionar acceso a vestidos excepcionales que hagan que cada momento
                especial sea inolvidable, combinando calidad, estilo y accesibilidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">
                Nuestros Valores
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Calidad sin compromisos</li>
                <li>Atención personalizada</li>
                <li>Innovación constante</li>
                <li>Responsabilidad social</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">
                Nuestro Compromiso
              </h2>
              <p className="text-gray-600">
                Nos comprometemos a ofrecer una experiencia excepcional, desde la
                selección hasta el servicio post-venta, garantizando la satisfacción
                total de nuestros clientes.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </motion.div>
  );
}