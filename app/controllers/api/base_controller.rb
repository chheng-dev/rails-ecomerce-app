module Api
  class BaseController < Api::ApplicationController
    before_action :authenticate_user!, except: [:create, :destroy]

    protect_from_forgery with: :exception
        
    # def authenticate_user!
    #   token = request.headers['Authorization']&.split(' ')&.last
    #   Rails.logger.debug("Authorization Token: #{token}")
    
    #   if token.blank?
    #     render json: { success: false, message: "Token is required" }, status: :unauthorized
    #     return
    #   end
    
    #   begin
    #     decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base)
    #     user_id = decoded_token[0]["user_id"]
    #     @current_user = User.find_by(id: user_id)
    
    #     if @current_user.nil?
    #       render json: { success: false, message: "User not found" }, status: :unauthorized
    #     end
    #   rescue JWT::DecodeError => e
    #     Rails.logger.debug("JWT Decode Error: #{e.message}")
    #     render json: { success: false, message: "Invalid token" }, status: :unauthorized
    #   end
    # end
    def authenticate_user!
      token = request.headers['Authorization']&.split(' ')&.last
      Rails.logger.debug("Authorization Token: #{token}")

      if token.blank?
        render json: { success: false, message: "Token is required" }, status: :unauthorized
        return
      end

      begin
        decoded_token = JWT.decode(token, Rails.application.credentials.secret_key_base)
        user_id = decoded_token[0]["user_id"]
        exp = decoded_token[0]["exp"]
        
        if Time.at(exp) < Time.now
          render json: { success: false, message: "Token has expired" }, status: :unauthorized
          return
        end
        
        @current_user = User.find_by(id: user_id)

        if @current_user.nil?
          render json: { success: false, message: "User not found" }, status: :unauthorized
        end
      rescue JWT::DecodeError => e
        Rails.logger.debug("JWT Decode Error: #{e.message}")
        render json: { success: false, message: "Invalid token" }, status: :unauthorized
      end
    end
    
    def current_user
      @current_user
    end
  end
end