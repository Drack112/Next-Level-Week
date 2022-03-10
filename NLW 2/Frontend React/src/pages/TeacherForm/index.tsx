import React from "react";

import "./styles.css";

import PageHeader from "components/PageHeader";

const TeacherForm = () => {
	return (
		<div id="page-teacher-form" className="container">
			<PageHeader
				title={"Que incrível que você quer dar aulas!"}
				description="O primeiro passo é preencher esse formulário de inscrição"
			/>
		</div>
	);
};

export default TeacherForm;
