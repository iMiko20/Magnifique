import React from 'react';
import { Plus } from 'lucide-react';
import { KanbanItem as KanbanItemComponent } from './KanbanItem';
import type { KanbanItem } from '../../types';

interface KanbanColumnProps {
  title: string;
  color: string;
  headerColor: string;
  onAdd: () => void;
  items: KanbanItem[];
  onEdit: (item: KanbanItem) => void;
  onDelete: (itemId: number) => void;
}

export function KanbanColumn({ 
  title, 
  color, 
  headerColor, 
  onAdd, 
  items,
  onEdit,
  onDelete
}: KanbanColumnProps) {
  return (
    <div className={`flex-shrink-0 w-80 bg-white rounded-lg shadow ${color} border`}>
      {/* Header */}
      <div className={`px-4 py-3 ${headerColor} rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <button
            onClick={onAdd}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Items Container */}
      <div className="p-4 space-y-4 h-[calc(100vh-12rem)] overflow-y-auto">
        {items.map((item) => (
          <KanbanItemComponent
            key={item.id}
            {...item}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
}