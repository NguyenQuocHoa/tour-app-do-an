import NavBar from "./NavBar";
import $ from "jquery";

const Layout = () => {
	window.onload = () => {
		$(".intro").hide();
		$(".footer-tour").hide();
		$("#header-top").hide();
	};

	return (
		<>
			<NavBar />
			<div className="py-5"></div>
		</>
	);
};

export default Layout;
