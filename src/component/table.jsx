/* eslint-disable react/prop-types */
import "./table.css";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react';


const Table = ({ data, pageChange, startIndex, lastIndex, page, totalPage, setData, setFilteredData }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  const handleEdit = (item) => {
    setEditingRow(item.id);
    setEditedRow({ ...item });
  };

  const handleSave = () => {
    const updatedData = data.map(item => 
      item.id === editedRow.id ? editedRow : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setEditingRow(null);
  };

  const handleDelete = (id) => {
    const remainingData = data.filter(item => item.id !== id);
    setData(remainingData);
    setFilteredData(remainingData);
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    const visibleIds = data.slice(startIndex, lastIndex).map(item => item.id);
    if (selectedRows.length === visibleIds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(visibleIds);
    }
  };

  const handleDeleteSelected = () => {
    const remainingData = data.filter(item => !selectedRows.includes(item.id));
    setData(remainingData);
    setFilteredData(remainingData);
    setSelectedRows([]);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === data.slice(startIndex, lastIndex).length} /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, lastIndex).map((item) => (
            <tr key={item.id} className={selectedRows.includes(item.id) ? "selected" : ""}>
              <td><input type="checkbox" checked={selectedRows.includes(item.id)} onChange={() => handleSelectRow(item.id)} /></td>
              <td>
                {editingRow === item.id ? (
                  <input 
                    type="text" 
                    value={editedRow.name} 
                    onChange={(e) => setEditedRow({ ...editedRow, name: e.target.value })}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input 
                    type="text" 
                    value={editedRow.email} 
                    onChange={(e) => setEditedRow({ ...editedRow, email: e.target.value })}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <input 
                    type="text" 
                    value={editedRow.role} 
                    onChange={(e) => setEditedRow({ ...editedRow, role: e.target.value })}
                  />
                ) : (
                  item.role
                )}
              </td>
              <td>
                {editingRow === item.id ? (
                  <button className="save" onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(item)}><FaRegEdit /></button>
                    <button className="delete" onClick={() => handleDelete(item.id)}><MdDelete /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="delete-selected" onClick={handleDeleteSelected}>Delete selected</button>
      <div className="page">
        <button className="first-page" onClick={() => pageChange("first page")}>&laquo;</button>
        <button className="previous-page" onClick={() => pageChange("previous page")}>&lt;</button>
        {[...Array(totalPage)].map((_, index) => (
          <button
            key={index + 1}
            className={page === index + 1 ? "active" : ""}
            onClick={() => pageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className="next-page" onClick={() => pageChange("next page")}>&gt;</button>
        <button className="last-page" onClick={() => pageChange("last page")}>&raquo;</button>
      </div>
    </div>
  );
};

export default Table;


