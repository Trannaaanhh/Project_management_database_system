// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const cors = require('cors');
const dbConfig = require('./dbconfig');

const app = express();
const port = 3000;

// Sử dụng body-parser để phân tích JSON
app.use(bodyParser.json());
// Cho phép truy cập API từ nguồn khác
app.use(cors());

// Kết nối đến SQL Server khi server khởi động
sql.connect(dbConfig, err => {
  if (err) {
    console.error('Không thể kết nối đến SQL Server:', err);
  } else {
    console.log('Kết nối đến SQL Server thành công!');
  }
});

// ------------------ API cho bảng NSX ------------------

// 1. Lấy toàn bộ dữ liệu NSX
app.get('/api/nsx', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM NSX');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 2. Thêm NSX mới
app.post('/api/nsx', async (req, res) => {
  const { MaNSX, TenNSX, DiaChi } = req.body;
  try {
    const query = `
      INSERT INTO NSX (MaNSX, TenNSX, DiaChi)
      VALUES (@MaNSX, @TenNSX, @DiaChi)
    `;
    const request = new sql.Request();
    request.input('MaNSX', sql.VarChar(50), MaNSX);
    request.input('TenNSX', sql.VarChar(100), TenNSX);
    request.input('DiaChi', sql.VarChar(200), DiaChi);
    await request.query(query);
    res.send('Thêm NSX thành công!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 3. Cập nhật NSX
app.put('/api/nsx/:MaNSX', async (req, res) => {
  const { MaNSX } = req.params;
  const { TenNSX, DiaChi } = req.body;
  try {
    const query = `
      UPDATE NSX SET TenNSX = @TenNSX, DiaChi = @DiaChi
      WHERE MaNSX = @MaNSX
    `;
    const request = new sql.Request();
    request.input('MaNSX', sql.VarChar(50), MaNSX);
    request.input('TenNSX', sql.VarChar(100), TenNSX);
    request.input('DiaChi', sql.VarChar(200), DiaChi);
    await request.query(query);
    res.send('Cập nhật NSX thành công!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 4. Xóa NSX
app.delete('/api/nsx/:MaNSX', async (req, res) => {
  const { MaNSX } = req.params;
  try {
    const query = `DELETE FROM NSX WHERE MaNSX = @MaNSX`;
    const request = new sql.Request();
    request.input('MaNSX', sql.VarChar(50), MaNSX);
    await request.query(query);
    res.send('Xóa NSX thành công!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// 5. Tìm kiếm NSX theo mã hoặc tên
app.get('/api/nsx/search/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const query = `
      SELECT * FROM NSX 
      WHERE MaNSX LIKE '%' + @key + '%' OR TenNSX LIKE '%' + @key + '%'
    `;
    const request = new sql.Request();
    request.input('key', sql.VarChar(50), key);
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server chạy trên cổng ${port}`);
});
