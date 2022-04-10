import React, { useState, useEffect } from "react";
import { getOrderList } from "../services/order";
import { formatRealNumber } from "../services/util";

const OrderList = props => {
	const [params, setParams] = useState({
		pageSize: 1000,
		pageIndex: 1,
		sortColumn: "id",
		sortOrder: "1"
	});
	const [data, setData] = useState([
		{
			column: "customer",
			keySearch: "2",
			expression: "="
		}
	]);
	const [dataSource, setDataSource] = useState([]);
	const getOrderListAction = () => {
		getOrderList(params, data)
			.then(({ data }) => {
				setTimeout(() => {
					setDataSource(data?.data);
					console.log("data", data?.data);
				}, 300);
			})
			.catch(err => console.log(err));
	};

	useEffect(() => {
		getOrderListAction();
	}, []);

	return (
		<div class="container py-5 mt-5">
			<div class="row justify-content-center">
				<h2>Danh sách đơn hàng </h2>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-12">
					{dataSource.length > 0 ? (
						<div class="row mt-5">
							<div class="col-md-4">
								<strong>Mã đơn hàng</strong>
							</div>
							<div class="col-md-2">
								<strong>Số người lớn</strong>
							</div>
							<div class="col-md-2">
								<strong>Số trẻ em</strong>
							</div>
							<div class="col-md-4">
								<strong>Tổng tiền</strong>
							</div>
							<div
								class="col-md-12"
								style={{
									border: "1px solid #f15d30",
									height: 1
								}}
							></div>
						</div>
					) : (
						<div>Chưa có dữ liệu</div>
					)}
					{dataSource.length > 0 &&
						dataSource.map(order => <OrderRecord order={order} />)}
				</div>
			</div>
		</div>
	);
};

export default OrderList;

const OrderRecord = ({ order }) => {
	return (
		<div class="row mt-5">
			<div class="col-md-4">{order.code}</div>
			<div class="col-md-2">{order.numberAdult}</div>
			<div class="col-md-2">{order.numberChild}</div>
			<div class="col-md-4">{formatRealNumber(order.totalAmount)}</div>
			<div
				class="col-md-12"
				style={{ border: "1px solid #f15d30", height: 1 }}
			></div>
		</div>
	);
};
