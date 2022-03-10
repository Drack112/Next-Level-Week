import React from "react";
import { Link } from "react-router-dom";

import backIcon from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

import "./styles.css";

import PageHeader from "components/PageHeader";

const TeacherList = () => {
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader
				title={"Esses são os proffys disponíveis."}
				description="Basta selecionar um deles para ter sua aula."
			>
				<form id="search-teachers">
					<div className="input-block">
						<label htmlFor="subject">Matéria</label>
						<input type="text" id="subject" />
					</div>

					<div className="input-block">
						<label htmlFor="week_day">Dia Da Semana</label>
						<input type="text" id="week_day" />
					</div>

					<div className="input-block">
						<label htmlFor="time">Hora</label>
						<input type="text" id="time" />
					</div>
				</form>
			</PageHeader>
		</div>
	);
};

export default TeacherList;
