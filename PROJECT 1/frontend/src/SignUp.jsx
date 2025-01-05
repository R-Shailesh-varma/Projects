import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function MainBody() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate(); // Initialize navigate

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                navigate("/"); // Redirect to home page on success
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="div-back">
            <div className="login-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Sign-up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("username", { required: "Username is required" })}
                        />
                        <i className="fa-solid fa-user"></i>
                        {errors.username && <p className="error">{errors.username.message}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="E-mail"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        <i className="fa-regular fa-envelope"></i>
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="number"
                            placeholder="Enter mobile number"
                            {...register("mobile", {
                                required: "Mobile number is required",
                                minLength: {
                                    value: 10,
                                    message: "Mobile number must be at least 10 digits",
                                },
                            })}
                        />
                        <i className="fa-solid fa-phone"></i>
                        {errors.mobile && <p className="error">{errors.mobile.message}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                        />
                        <i className="fa-regular fa-eye-slash"></i>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Re-enter Password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value, { password }) =>
                                    value === password || "Passwords do not match",
                            })}
                        />
                        <i className="fa-regular fa-eye-slash"></i>
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" className="btn">SUBMIT</button>
                </form>
            </div>
        </div>
    );
}

export default MainBody;
