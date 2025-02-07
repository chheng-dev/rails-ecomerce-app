module Api  
  class RegistrationsController < Api::ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create, :destroy] 
    respond_to :json

    def create
      user = User.new(sign_up_params)

      if user.save
        render json: {
          success: true,
          message: "Registration successful!",
          user: {
            id: user.id,
            email: user.email,
            token: user.generate_jwt_token
          }
        }, status: :created
      else
        render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end


    private

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation, :username)
    end
  end
end