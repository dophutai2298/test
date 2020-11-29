import Axios from "axios";
export function getBookingRequest(maLichChieu) {
  // hàm chịu trách nhiệm xử lý các tác vụ bất đồng bộ
  return async (dispatch) => {
    // call api
    try {
      // request
      //   await là đợi các tác vụ bất đồng bộ thực hiện xong
      const res = await Axios.get(
        `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
      );
      console.log("res : ", res);
      // success
      if (res.status === 200 || res.status === 201) {
        //   dispatch lên reducer
        dispatch(getBookingSuccess(res.data));
      }
    } catch (error) {
      // failed
      console.log(error);
      //   dispatch lên reducer
      dispatch(getBookingFailed(error));
    }
  };
}

function getBookingSuccess(booking) {
  return {
    type: "GET_BOOKING_SUCCESS",
    payload: booking,
  };
}

function getBookingFailed(error) {
  return {
    type: "GET_BOOKING_FAILED",
    payload: error,
  };
}

export function postBookingRequest(maLichChieu, danhSachVe) {
  return async function (dispatch) {
    try {
      // getlocal
      const user = JSON.parse(localStorage.getItem("user"));
      // call api
      const res = await Axios({
        method: "POST",
        url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        data: {
          maLichChieu,
          danhSachVe,
          taiKhoanNguoiDung: user.taiKhoan,
        },
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert("Thành công");
      }
    } catch (error) {}
  };
}
