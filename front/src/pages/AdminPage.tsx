import React from 'react';
import { KanbanBoard } from '../components/admin/KanbanBoard';
import { ContractsSection } from '../components/admin/ContractsSection';
import { EmployeesSection } from '../components/admin/EmployeesSection';
import { ArticlesSection } from '../components/admin/ArticlesSection';
import { PaymentsSection } from '../components/admin/PaymentsSection';
import type { KanbanItem } from '../types';

export function AdminPage() {
  const [items, setItems] = React.useState<KanbanItem[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Magnifique
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <KanbanBoard />
        <ContractsSection rentals={items} />
        <EmployeesSection />
        <ArticlesSection />
        <PaymentsSection />
      </main>
    </div>
  );
}