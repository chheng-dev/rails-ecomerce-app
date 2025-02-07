class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    # self.resource = warden.authenticate!(auth_options)

    # if resource.persisted?
    #   sign_in(resource_name, resource)
    #   render json: {
    #     success: true,
    #     message: "Logged in",
    #     user: {
    #       id: resource.id,
    #       email: resource.email,
    #       authentication_token: resource.authentication_token
    #     },
    #     status: 'ok'
    #   }
    # else
    #   render json: { success: false, message: 'Invalid credentials', status: 'error' }, status: :unauthorized
    # end
    super
  end
end
