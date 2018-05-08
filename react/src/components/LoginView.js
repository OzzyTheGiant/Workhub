import React from 'react';

const LoginView = () => {
	return (
		<div id="LoginView">
			<form action="/login" method="post">
				<img src="https://placehold.it/50x50/00638E" alt="Logo"/>
				<h1>Log in to your account</h1>
				<input type="text" name="username" placeholder="Username"/>
				<input type="password" name="password" placeholder="Password"/>
				<input type="submit" className="button button-ok" value="Log In"/>
			</form>
		</div>
	);
};

export default LoginView;