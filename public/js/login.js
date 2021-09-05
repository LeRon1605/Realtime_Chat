const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const registerForm = document.getElementById('register-form');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

registerForm.onsubmit = async (e) => {
	e.preventDefault();
	const name = document.getElementById('name-register');
	const email = document.getElementById('email-register');
	const password = document.getElementById('password-register');
	const toast = document.getElementById('toast');
	try{
		const res = await fetch('https://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				email: email.value,
				password: password.value
			})
		})
		const data = await res.json();
		const messageToast = document.getElementById('message');
		messageToast.innerText = data.message;
		if (data.success == true){
			if (toast.classList.contains('bg-danger')){
				toast.classList.remove('bg-danger');
				toast.classList.add('bg-success');
			}	
			name.value = '';
			email.value = '';
			password.value = '';
			signIn.click();
		}else{
			if (toast.classList.contains('bg-success')){
				toast.classList.remove('bg-success');
				toast.classList.add('bg-danger');
			}
		}
		new bootstrap.Toast(toast).show();
	}catch(err){
		console.log(err);
	}
}