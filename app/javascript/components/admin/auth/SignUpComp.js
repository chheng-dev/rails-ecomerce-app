import React, { Fragment } from "react";
import signImage from "../../../../assets/images/sign_image.jpg"
import { LucideFacebook, MailIcon } from "lucide-react";
import TextFieldComp from "../sd/form/TextFieldComp";
import { toast } from "react-toastify";

class SignUpComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmitForm(e) {
    e.preventDefault();

    const { username, email, password, password_confirmation } = this.state;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        },
        body: JSON.stringify({
          user: {
            email,
            username,
            password,
            password_confirmation
          }
        })
      });

      const data = response.json();

      if (response.ok && data.success && data.user && data.user.token) {
        localStorage.setItem('authToken', data.user.token);
        window.location.href = '/admin';
        toast.success("Registered successfully!");
      }

    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Login error:', error);
    }

  }

  render() {
    return (
      <div className="bg-[#F8F7F6]">
        <div className="min-h-screen flex fle-col items-center justify-center p-6">
          <div className="grid lg:grid-cols-2 items-center gap-6 max-w-7xl max-lg:max-w-xl w-full">
            <div className="h-full max-lg:mt-12 rounded-lg p-8">
              <img src={signImage} className="w-full h-full object-contain" alt="Dining Experience" />
            </div>
            <form className="lg:max-w-md w-full mx-auto" onSubmit={this.handleSubmitForm}>
              <h3 className="text-gray-800 text-3xl font-extrabold mb-1">Sign Up</h3>
              <p className="text-gray-400 text-sm pb-6">New to our platform? Sign up now! It only takes a minute</p>
              <div className="space-y-6">
                <div>
                  <TextFieldComp
                    type="text"
                    label="Username"
                    name="username"
                    id="username"
                    required={true}
                    value={this.state.username}
                    placeholder="Enter your username"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <TextFieldComp
                    type="email"
                    label="Email"
                    name="email"
                    id="email"
                    required={true}
                    value={this.state.email}
                    placeholder="Enter your email"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <TextFieldComp
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                    required={true}
                    value={this.state.password}
                    placeholder="Enter your password"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <TextFieldComp
                    type="password"
                    label="Password Confirmation"
                    name="password_confirmation"
                    id="password_confirmation"
                    required={true}
                    value={this.state.password_confirmation}
                    placeholder="Enter your confirm password"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 checked:text-primary focus:ring-0 rounded" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-400">
                    I accept the Terms and Conditions
                  </label>
                </div>
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  className="text-primary bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 w-full hover:bg-primary hover:text-white hover:transition hover:duration-700 hover:ease-in-out"
                >
                  Sign up
                </button>
              </div>

              <div class="flex items-center my-4">
                <hr class="flex-grow border-t border-gray-300" />
                <span class="mx-4 text-sm text-gray-400">OR sign with</span>
                <hr class="flex-grow border-t border-gray-300" />
              </div>

              <div className="my-4">
                <button
                  type="submit"
                  className="text-gray-600 bg-[#EEF2F6] font-medium rounded-lg text-sm px-5 py-2.5 w-full hover:bg-gray-500 hover:text-white hover:transition hover:duration-700 hover:ease-in-out my-1"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <MailIcon className="w-4 h-4" />
                    <span>Sign Up with Google</span>
                  </div>
                </button>

                <button
                  type="submit"
                  className="text-primary bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 w-full mx-auto hover:bg-primary hover:text-white hover:transition hover:duration-700 hover:ease-in-out my-1"
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <LucideFacebook className="w-4 h-4" />
                    <span>Sing Up with Facebook</span>
                  </div>
                </button>
              </div>

              <p className="text-sm text-red-500 mt-6 text-center">Already have an account? <a href="/users/sign_in" className="text-primary font-semibold hover:underline ml-1">Login here</a></p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpComp;
