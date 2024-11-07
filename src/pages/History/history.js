import React from "react";
import "./History.css"; // import CSS file
import { NavLink} from "react-router-dom";
const History = () => {
  return(
  <div className="history-container">
    <h1 className="history-text-title">Lịch sử Đơn hàng</h1>
        <label className="payment-page-form-label">
          <input
            type="hoten"
            className="payment-page-form-input"
            placeholder="Tìm kiếm theo mã đơn hàng, tên khách hàng, SĐT khách hàng"
          />
        <button type="submit" className="payment-page-cart-button">
          tìm kiếm
        </button>
        </label>
        <table>
            <thead>
                <tr>
                    <th className="history-checked-title">
                        <label class="history-checked-container">
                        <input type="checkbox"/>
                        <span class="history-checkmark"></span>
                        </label>
                    </th>
                    <th>Mã Đơn Hàng</th>
                    <th>Khách Hàng</th>
                    <th>Số điện thoại</th>
                    <th>Trạng Thái</th>
                    <th>Tổng giá trị</th>
                    <th>Ngày Tạo Đơn</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <label class="history-checked-container">
                        <input type="checkbox"/>
                        <span class="history-checkmark"></span>
                        </label>
                    </td>
                    <td><NavLink
              to="#"
              className="text-blue-400"
              >
              #123456
            </NavLink></td>
                    <th>Hiên</th>
                    <th>0312345678</th>
                    <td><span class="status">Đã giao</span></td>
                    <td>
                        1.200.000 đ
                    </td>
                    <td>15/10/2024</td>
                </tr>
                <tr>
                    <td>
                        <label class="history-checked-container">
                        <input type="checkbox"/>
                        <span class="history-checkmark"></span>
                        </label>
                    </td>
                    <td><NavLink
              to="#"
              className="text-blue-400"
              >
              #123457
            </NavLink></td>
                    <th>Thi</th>
                    <th>0311133322</th>
                    <td><span class="status">Đang xử lý</span></td>
                    <td>
                        500.000 đ
                    </td>
                    <td>16/10/2024</td>
                </tr>
                <tr>
                    <td>
                        <label class="history-checked-container">
                        <input type="checkbox"/>
                        <span class="history-checkmark"></span>
                        </label>
                    </td>
                    <td><NavLink
              to="#"
              className="text-blue-400"
              >
              #123458
            </NavLink></td>
                    <th>Thiện</th>
                    <th>0399922239</th>
                    <td><span class="status">Đã hủy</span></td>
                    <td>
                        700.000 đ
                    </td>
                    <td>17/10/2024</td>
                </tr>
            </tbody>
        </table>
  </div>
  );
}
export default History;
