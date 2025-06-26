// dbconfig.js
const config = {
    user: "Trananhthuchanh1",           // Thay bằng tên người dùng của SQL Server
    password: "01022004",       // Thay bằng mật khẩu
    server: "ROGSTRIXG15\\TRANANHSERVER",        // Địa chỉ server, có thể là IP hoặc hostname
    database: "Thực hành hệ Cơ sở dữ liệu n1",        // Tên database bạn muốn kết nối
    options: {
      encrypt: true,            // Bật nếu bạn dùng Azure hoặc nếu server yêu cầu mã hóa
      trustServerCertificate: true // Cho môi trường phát triển
    }
  };
    
  module.exports = config;
  