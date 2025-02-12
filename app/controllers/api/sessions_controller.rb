module Api 
  class SessionsController < Api::ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create, :destroy] 
    protect_from_forgery with: :null_session, if: -> { request.format.json? }

      def refresh_token
        refresh_token = params[:refresh_token]

        return render json: { success: false, message: 'Refresh token is required' }, status: :unprocessable_entity if refresh_token.blank?

        begin
          decoded = JWT.decode(refresh_token, Rails.application.credentials.secret_key_base, true, algorithm: "HS256")
          user_id = decoded[0]["user_id"]
          @user = User.find_by(id: user_id)

          return render json: { success: false, message: 'User not found.' }, status: :unauthorized if @user.nil?

          access_token = @user.generate_jwt_token

          render json: { success: true, token: access_token }, status: :ok
        rescue JWT::DecodeError => e
          render json: { success: false, message: 'Invalid refresh token' }, status: :unauthorized
        end
      end


    def create
      user = User.find_for_database_authentication(email: params[:email])

      if user && user&.valid_password?(params[:password])
        sign_in(user)

        access_token = user.generate_jwt_token
        refresh_token = user.generate_refresh_token

        user.update!(refresh_token: refresh_token)

        render json: {
          success: true,
          message: 'Logged in',
          user: {
            id: user.id,
            email: user.email,
            token: access_token,
            refresh_token: refresh_token
          }, status: :ok
        }
      else
        render json: {
          success: false,
          error: 'Incorrect email or password!'  
        }, status: :unauthorized
      end
    end

    def destroy
      sign_out(current_user) if current_user
      render json: { success: true, message: 'Logged out successfully' }, status: :ok
    end
  end
end