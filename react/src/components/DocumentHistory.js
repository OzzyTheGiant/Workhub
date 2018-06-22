import React from "react";
import PropTypes from "prop-types";
import datetimeFormatter from "utilities/datetime-formatter";

const DocumentHistory = props => {
	return (
		<ol id="DocumentHistory" className="frame">
			<li>
				<ul className="header-row">
					<li className="action-type">Action</li>
					<li className="employee">Employee</li>
					<li className="action-date">Date &amp; Time</li>
				</ul>
			</li>
			{props.historyList.map(action => {
				let date = datetimeFormatter(action.actionDate);
				return (
					<li key={action.id}>
						<ul>
							<li className="action-type">{action.actionType}</li>
							<li className="employee">{action.employee.firstName + " " + action.employee.lastName}</li>
							<li className="action-date">{date}</li>
						</ul>
					</li>
				);
			})}
		</ol>
	);
};

DocumentHistory.propTypes = {
	historyList:PropTypes.array.isRequired
};

export default DocumentHistory;