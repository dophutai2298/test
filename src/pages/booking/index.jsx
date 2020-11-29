import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getBookingRequest,
  postBookingRequest,
} from "../../redux/actions/booking.actions";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
const Booking = () => {
  // Hook
  const { maLichChieu } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const danhSachGhe = useSelector((state) => state.booking.danhSachGhe);
  console.log("danhSachGhe : ", danhSachGhe);

  function trangThaiGhe(daDat, dangChon) {
    if (daDat) {
      // đã đặt
      return classes.daDat;
    } else {
      // chửa đặt
      if (dangChon) {
        // dang chon
        return classes.dangChon;
      } else {
        // chưa chọn
        return classes.chuaDat;
      }
    }
  }

  function renderGhe() {
    return danhSachGhe.map((ghe, index) => {
      return (
        <>
          <Button
            key={index}
            className={trangThaiGhe(ghe.daDat, ghe.dangChon)}
            onClick={() => {
              dispatch({
                type: "CHON_GHE",
                payload: ghe,
              });
            }}
          >
            {ghe.stt}
          </Button>
        </>
      );
    });
  }

  // chỉ chạy một lần duy nhất khi component được gọi
  useEffect(function () {
    // dispatch action để tương tác với api
    dispatch(getBookingRequest(maLichChieu));
  }, []);

  function handleBooking() {
    let danhSachVe = danhSachGhe.filter((ghe) => ghe.dangChon);
    danhSachVe = danhSachVe.map((ghe) => ({
      maGhe: ghe.maGhe,
      giaVe: ghe.giaVe,
    }));
    dispatch(postBookingRequest(maLichChieu, danhSachVe));
  }

  return (
    <div>
      <h1>Booking</h1>
      <div>{renderGhe()}</div>
      <div>
        <Button
          variant="contained"
          style={{ marginTop: "5px" }}
          color="secondary"
          onClick={handleBooking}
        >
          Đặt Vé
        </Button>
      </div>
    </div>
  );
};

export default Booking;
