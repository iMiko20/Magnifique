import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { AddItemModal } from './AddItemModal';
import type { KanbanItem } from '../../types';

const BOARD_SECTIONS = [
  {
    id: 'rentas',
    title: 'Rentas',
    color: 'bg-pink-50 border-pink-200',
    headerColor: 'bg-pink-300',
  },
  {
    id: 'ventas',
    title: 'Ventas',
    color: 'bg-pink-100 border-pink-300',
    headerColor: 'bg-pink-400',
  },
  {
    id: 'completados',
    title: 'Completados',
    color: 'bg-pink-200 border-pink-400',
    headerColor: 'bg-pink-500',
  },
];

export function KanbanBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [items, setItems] = useState<KanbanItem[]>([]);
  const [editingItem, setEditingItem] = useState<KanbanItem | null>(null);

  const handleAddItem = (sectionId: string) => {
    setSelectedSection(sectionId);
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: KanbanItem) => {
    setSelectedSection(item.section);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleSubmitItem = (item: KanbanItem) => {
    setItems((prevItems) => {
      if (editingItem) {
        return prevItems.map((prevItem) =>
          prevItem.id === editingItem.id ? item : prevItem
        );
      }
      return [...prevItems, item];
    });
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-x-auto pb-4">
          {BOARD_SECTIONS.map((section) => (
            <KanbanColumn
              key={section.id}
              title={section.title}
              color={section.color}
              headerColor={section.headerColor}
              onAdd={() => handleAddItem(section.id)}
              items={items.filter((item) => item.section === section.id)}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmitItem}
        section={selectedSection}
        editingItem={editingItem}
      />
    </>
  );
}