import React from 'react';
import { Calendar, User, Clock, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface KanbanItemProps {
  id: number;
  title: string;
  client: string;
  date: string;
  status: string;
  returnDate?: string;
  startTime?: string;
  endTime?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function KanbanItem({ 
  title, 
  client, 
  date, 
  status,
  returnDate,
  startTime,
  endTime,
  onEdit,
  onDelete
}: KanbanItemProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-pink-500 rounded-full hover:bg-pink-50 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          {client}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(date)}
          {startTime && (
            <>
              <Clock className="w-4 h-4 ml-2 mr-1" />
              {startTime}
            </>
          )}
        </div>

        {returnDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(returnDate)}
            {endTime && (
              <>
                <Clock className="w-4 h-4 ml-2 mr-1" />
                {endTime}
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}