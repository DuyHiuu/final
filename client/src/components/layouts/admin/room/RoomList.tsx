import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Thêm icon
import useFetchRooms from "../../../../api/useFetchRooms";

const RoomList = () => {
  const { room, loading, error } = useFetchRooms(); // Giả định useFetchRooms cũng có trạng thái loading và error
  const [sizeFilter, setSizeFilter] = useState(""); // Trạng thái cho bộ lọc kích thước

  // Nếu đang tải, hiển thị thông báo
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
      </div>
    );

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error)
    return <div className="text-center text-red-600 mt-5">{error}</div>;

  // Hàm xử lý thay đổi bộ lọc kích thước
  const handleSizeChange = (e) => {
    setSizeFilter(e.target.value);
  };

  // Hàm xóa phòng
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa phòng này?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/rooms/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Phòng đã được xóa thành công");
        window.location.reload(); // Tải lại trang sau khi xóa thành công
      } else {
        const errorData = await response.json(); // Lấy dữ liệu lỗi từ phản hồi
        message.error(`Xóa Phòng thất bại: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      message.error("Đã xảy ra lỗi khi xóa Phòng");
    }
  };

  // Lọc danh sách phòng dựa trên kích thước
  const filteredRooms = sizeFilter
    ? room.filter((r) => r.size_name.toLowerCase().includes(sizeFilter.toLowerCase()))
    : room;

  // Cấu hình cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "img_thumbnail",
      key: "img_thumbnail",
      render: (text) => (
        <img src={text} alt="Room Thumbnail" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: "8px" }} />
      ),
    },
    {
      title: "Size Phòng",
      dataIndex: "size_name",
      key: "size_name",
    },
    {
      title: "Giá (VND)",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString("vi-VN")} VND`,
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Trạng Thái",
      dataIndex: "statusroom",
      key: "statusroom",
      render: (text) => (
        <span
          className={`px-2 py-1 rounded text-sm ${text === "Còn phòng" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Link
            to={`/admin/rooms/edit/${record.id}`}
            className="text-yellow-500 hover:text-yellow-600"
          >
            <EditOutlined style={{ fontSize: 18 }} />
          </Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button danger type="text" icon={<DeleteOutlined style={{ fontSize: 18 }} />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Danh Sách Phòng</h1>
        <Link
          to="/admin/rooms/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Thêm Phòng
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-4">
        <Input
          placeholder="Tìm theo kích thước phòng..."
          value={sizeFilter}
          onChange={handleSizeChange}
          className="w-64"
        />
      </div>

      {/* Bảng phòng */}
      <Table
        columns={columns}
        dataSource={filteredRooms}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default RoomList;
