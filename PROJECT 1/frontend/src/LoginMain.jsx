import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";  // Ensure useNavigate is imported here

function LoginPage() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log("Sending login data:", data);

            // Send login request
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Response from server:", result);

            // Check if login was successful
            if (response.ok) {
                alert("Login successful!");
                navigate("/"); // Redirect to homepage on success
            } else {
                alert(result.message || "Login failed.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-div-back">
            <div className="login-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>

                    <div className="input-box" id="Username">
                        <input
                            placeholder="Username"
                            {...register("Username", { required: true })}
                            id="Username"
                        />
                        {errors.Username && <p className="error">Username is required.</p>}
                        <i className="fas fa-user" aria-hidden="true"></i>
                    </div>

                    <div className="input-box" id="Pass">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("Password", { required: true })}
                            id="Password"
                        />
                        {errors.Password && <p className="error">Password is required.</p>}
                        <i className="fas fa-eye" aria-hidden="true"></i>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password</a> 
                    </div>

                    <input type="submit" className="btn" id="submit-button" value="Login" />

                    <div className="register-link">
                        <p><Link to="/Sign-up">Create an account?</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
