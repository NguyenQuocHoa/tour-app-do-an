import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { getTourById } from "../services/tour";
import { createOrder } from "../services/order";
import { API_ENDPOINT } from "../services";
import { formatRealNumber } from "../services/util";
import LogoOrderSuccess from "../assets/images/order/icon_success.jpg";

const TourDetailCustom = props => {
	const [tour, setTour] = useState({});
	let { id } = useParams();
	const [modalShow, setModalShow] = useState(false);

	// get information detail tour
	const getInfoDetail = async () => {
		try {
			const responseDetail = await getTourById(id);
			if (responseDetail.status === 200) {
				// set form data
				const { data } = responseDetail;
				console.log("data", data?.data);
				setTour(data?.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getInfoDetail();
	}, []);

	console.log("id", id);
	return (
		<div class="container py-5 mt-5">
			<div class="row">
				<div class="col-md-7">
					<img
						src={`${API_ENDPOINT}/api/v1/FileUpload/files/${tour.image}`}
						alt="image_tour"
						style={{ width: "100%", height: "auto" }}
					/>
				</div>
				<div class="col-md-5">
					<div class="row justify-content-center">
						<div class="col-md-12">
							<Record label="Mã tour" value={tour.code} />
							<Record
								label="Giá người lớn"
								value={tour.priceAdult}
								isNumber
							/>
							<Record
								label="Giá trẻ em"
								value={tour.priceChild}
								isNumber
							/>
							<Record label="Địa điểm" value={tour.location} />
							<Record label="Thời gian" value={tour.time} />
						</div>
						<div class="mt-3">
							<Button
								style={{
									width: 200,
									height: 50,
									fontSize: "1.2rem",
									background: "#f15d30",
									border: "1px solid #f15d30"
								}}
								onClick={() => setModalShow(true)}
							>
								Đặt tour
							</Button>
						</div>
					</div>
				</div>
				<div class="col-md-12 mt-4">
					<h4>Mô tả</h4>
					<p>{tour.note}</p>
				</div>
			</div>
			<ModalOrder
				show={modalShow}
				onHide={() => setModalShow(false)}
				tour={tour}
			/>
		</div>
	);
};

export default TourDetailCustom;

const Record = ({ label, value, isNumber }) => {
	return (
		<div class="row mt-5">
			<div class="col-md-5">{label}:</div>
			{!isNumber ? (
				<div class="col-md-7">{value}</div>
			) : (
				<div class="col-md-7">{formatRealNumber(value)}</div>
			)}
			<div
				class="col-md-12"
				style={{ border: "1px solid gray", height: 1 }}
			></div>
		</div>
	);
};

const RecordInput = ({ label, value, setValue, field, isNumber = true }) => {
	return (
		<div class="row mt-5">
			<div class="col-md-5">{label}:</div>
			<input
				type={isNumber ? "number" : "text"}
				value={value[field]}
				onChange={e => {
					console.log("input change");
					let obj = { ...value };
					obj[field] = isNumber ? +e.target.value : e.target.value;
					setValue(obj);
				}}
			/>
			<div
				class="col-md-12 mt-2"
				style={{ border: "1px solid gray", height: 1 }}
			></div>
		</div>
	);
};

const ModalOrder = props => {
	const history = useHistory();
	const { tour } = props;
	const [createSuccess, setCreateSuccess] = useState(false);
	const [order, setOrder] = useState({
		code: "OD_" + new Date().toISOString(),
		numberAdult: 0,
		numberChild: 0,
		totalAmount: 0,
		note: "",
		isPayOnline: false,
		isSuccess: false,
		customer: { id: +101 }, // get from local store
		orderDetails: [
			{
				tour: { id: tour.id },
				amount: 0,
				note: ""
			}
		]
	});

	// Create new order
	const createOrderInfo = async payload => {
		// process create
		const responseCreate = await createOrder(payload);
		if (
			responseCreate.status === 200 &&
			responseCreate?.data?.status !== "failed"
		) {
			// reload table and close modal
			setCreateSuccess(true);
		}
	};

	const submit = () => {
		order.orderDetails[0].tour = { id: tour.id };
		createOrderInfo(order);
	};

	useEffect(() => {
		const totalAmount =
			order.numberAdult * tour.priceAdult +
			order.numberChild * tour.priceChild;
		setOrder({ ...order, totalAmount });
	}, [order.numberAdult, order.numberChild]);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Chi tiết đặt tour
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{createSuccess ? (
					<>
						<Record label="Mã tour" value={tour.code} />
						<RecordInput
							label="Số người lớn"
							value={order}
							setValue={setOrder}
							field="numberAdult"
						/>
						<RecordInput
							label="Số trẻ em"
							value={order}
							setValue={setOrder}
							field="numberChild"
						/>
						<Record
							label="Tổng tiền"
							value={formatRealNumber(order.totalAmount)}
						/>
						<RecordInput
							label="Ghi chú"
							value={order}
							setValue={setOrder}
							field="note"
							isNumber={false}
						/>
						<div class="row mt-3 justify-content-center">
							<Button
								style={{
									width: 200,
									height: 50,
									fontSize: "1.2rem",
									background: "#f15d30",
									border: "1px solid #f15d30"
								}}
								onClick={submit}
							>
								Xác nhận đặt tour
							</Button>
						</div>
					</>
				) : (
					<>
						<div class="row justify-content-center">
							<img
								src={LogoOrderSuccess}
								alt="image_order_success"
								style={{ width: 300, height: "auto " }}
							/>
						</div>
						<div class="row justify-content-center">
							<h4>Đặt hàng thành công!</h4>
						</div>
						<div class="row justify-content-center">
							<div>Mã đơn hàng: {order.code}</div>
						</div>
						<div class="row mt-3 mb-5 justify-content-center">
							<Button
								style={{
									width: 300,
									height: 50,
									fontSize: "1.2rem"
								}}
								onClick={() => history.push("/order_list")}
							>
								Xem danh sách đơn hàng
							</Button>
						</div>
					</>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};
