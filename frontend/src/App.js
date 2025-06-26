// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import file CSS đã tạo

function App() {
  const [nsxList, setNsxList] = useState([]);
  const [form, setForm] = useState({ MaNSX: '', TenNSX: '', DiaChi: '' });
  const [searchKey, setSearchKey] = useState('');

  const API_URL = 'http://localhost:3001/api/nsx';

  // Hàm tải dữ liệu NSX từ API
  const fetchNsx = async () => {
    try {
      const res = await axios.get(API_URL);
      setNsxList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Load dữ liệu khi component mount
  useEffect(() => {
    fetchNsx();
  }, []);

  // Xử lý thay đổi giá trị trong các input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Thêm NSX mới
  const handleAdd = async () => {
    try {
      await axios.post(API_URL, form);
      fetchNsx();
      setForm({ MaNSX: '', TenNSX: '', DiaChi: '' });
    } catch (err) {
      console.error(err);
    }
  };

  // Cập nhật NSX
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${form.MaNSX}`, {
        TenNSX: form.TenNSX,
        DiaChi: form.DiaChi,
      });
      fetchNsx();
      setForm({ MaNSX: '', TenNSX: '', DiaChi: '' });
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa NSX
  const handleDelete = async (MaNSX) => {
    try {
      await axios.delete(`${API_URL}/${MaNSX}`);
      fetchNsx();
    } catch (err) {
      console.error(err);
    }
  };

  // Tìm kiếm NSX
  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API_URL}/search/${searchKey}`);
      setNsxList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Chọn một dòng dữ liệu để hiển thị lên form (để sửa dữ liệu)
  const handleSelect = (item) => {
    setForm(item);
  };

  return (
    <div className="container">
      <h1>Quản lý NSX</h1>
      <div className="form-group">
        <input
          type="text"
          name="MaNSX"
          placeholder="Mã NSX"
          value={form.MaNSX}
          onChange={handleChange}
        />
        <input
          type="text"
          name="TenNSX"
          placeholder="Tên NSX"
          value={form.TenNSX}
          onChange={handleChange}
        />
        <input
          type="text"
          name="DiaChi"
          placeholder="Địa chỉ"
          value={form.DiaChi}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Thêm</button>
        <button onClick={handleUpdate}>Sửa</button>
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã NSX</th>
            <th>Tên NSX</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {nsxList.map((item) => (
            <tr key={item.MaNSX}>
              <td>{item.MaNSX}</td>
              <td>{item.TenNSX}</td>
              <td>{item.DiaChi}</td>
              <td>
                <button onClick={() => handleSelect(item)}>Chọn</button>
                <button onClick={() => handleDelete(item.MaNSX)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
