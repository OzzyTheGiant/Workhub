import ajax from 'api/ajax-manager';
import qs from 'qs';

const services = {
	login:(data) => ajax.post("login", qs.stringify(data), {withCredentials:false})
};

export {services};

