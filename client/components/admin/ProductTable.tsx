import React from "react";
import { Product } from "../../types/product";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto bg-white border rounded">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Nome</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Preço</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Categoria</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2 text-sm text-gray-700">{p.id}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{p.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">R$ {p.price.toFixed(2)}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{p.category}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button
                  onClick={() => onEdit(p)}
                  className="mr-2 px-3 py-1 bg-blue-600 text-white rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
