import React from "react";
import PropTypes from "prop-types";
import IconLink from "components/IconLink";

function extractDetails(list, id, type) {
	switch(type) {
	case "clients":
		return {id:list[id].id};
	case "projects":
		return {category:list[id].category.description};
	case "documents":
		return {category:list[id].category.description, year:list[id].year};
	default: return null;
	}
}

const IconLinkList = props => {
	let list = props.list;
	if (!props.list) return null;
	let listIDs = Object.keys(list || {});
	return (
		<ul className={"frame " + props.displayType}>
			{list && listIDs.length > 0 ? (
				listIDs.map(id => {
					let selected = false;
					if (props.clickSelection === id) selected = true;
					return (
						<IconLink 
						key={id}
						id={id} // this id will be passed via event dataset to event handler
						name={list[id][props.nameLabel]}
						details={extractDetails(list, id, props.type)}
						selected={selected}
						dblClickHandler={props.iconDoubleClickHandler}
						iconClickHandler={props.iconClickHandler}
						fileType={list[id].fileType || null}
						view={props.displayType}/>
					);
				}).sort((a, b) => {
					if (a.props.name < b.props.name) return -1;
					if (b.props.name < a.props.name) return 1;
					return 0;
				})
			) : (
				<li className="empty">No files or folders found!</li>
			)}
		</ul>
	);
};

IconLinkList.propTypes = {
	list:PropTypes.any,
	type:PropTypes.string.isRequired,
	nameLabel:PropTypes.any.isRequired,
	displayType:PropTypes.string.isRequired,
	clickSelection:PropTypes.any,
	iconClickHandler:PropTypes.func.isRequired,
	iconDoubleClickHandler:PropTypes.func.isRequired,
};

export default IconLinkList;