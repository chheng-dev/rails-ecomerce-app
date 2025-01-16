class Admin::OptionTypesController < Admin::ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    option_type_service = OptionTypeService.new(option_type_params)

    if option_type_service.create
      redirect_to new_admin_settings_option_type_option_value_path(
        option_type_id: option_type_service.option_type.id, 
        option_type: option_type_service), 
      notice: 'Option type created successfully. Now create option values.'
    else
      render json: {
        success: false,
        errors: option_type_service.errors
      }, status: :unprocessable_entity
    end

  end

  private 

  def option_type_params
    params.require(:option_type).permit(:name, :presentation, :filterable)
  end
end
