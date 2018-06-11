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
	let listIDs = Object.keys(props.list || {});
	return (
		<ul className={"frame " + props.displayType}>
			{props.list && listIDs.length > 0 ? (
				listIDs.map(id => {
					let selected = false;
					if (props.selection === id) selected = true;
					return (
						<IconLink 
							key={id}
							id={id} // this id will be passed via event dataset to event handler
							name={props.list[id][props.nameLabel]}
							details={extractDetails(props.list, id, props.type)}
							selected={selected}
							dblClickHandler={props.dblClickHandler}
							iconClickHandler={props.iconClickHandler}
							fileType={props.list[id].fileType || null}
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
	list:PropTypes.object,
	type:PropTypes.string.isRequired,
	nameLabel:PropTypes.any.isRequired,
	displayType:PropTypes.string.isRequired,
	dblClickHandler:PropTypes.func.isRequired,
	iconClickHandler:PropTypes.func.isRequired,
	selection:PropTypes.any
};

export default IconLinkList;