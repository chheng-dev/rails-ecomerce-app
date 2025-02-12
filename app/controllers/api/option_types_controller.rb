class Api::OptionTypesController < Api::BaseController
  skip_before_action :verify_authenticity_token
  before_action :set_option_type, only: [:show, :update, :destroy]

  def index 
    option_types = OptionType.includes(:option_values).all

    render json: {
      success: true,
      option_types: option_types.map do |option_type|
        {
          id: option_type.id,
          name: option_type.name,
          presentation: option_type.presentation,
          filterable: option_type.filterable,
          attributes: {
            type: option_type.name.downcase,
            option_values: option_type.option_values.map do |option_value|
              {
                id: option_value.id,
                name: option_value.name,
                presentation: option_value.presentation,
              }
            end
          }
        }
      end
    }
  end

  def create 
    option_type = OptionType.new(option_type_params)
    if option_type.save 
      render json: {
        success: true,
        message: 'Option type created successfully',
        option_type: option_type,
      }, status: :created
      
    else
      render json: {
        success: false,
        errors: option_type.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def show
    render json: {
      success: true,
      option_type: {
        id: @option_type.id,
        name: @option_type.name,
        presentation: @option_type.presentation,
        filterable: @option_type.filterable,
        option_values: @option_type.option_values.map do |value|
          {
            id: value.id,
            name: value.name,
            presentation: value.presentation
          }
        end
      }
    }
  end

  def update
    if @option_type.update!(option_type_params)
      render json: {
        success: true,
        message: 'Option type updated successfully',
        option_type: @option_type.as_json(include: :option_values) 
      }, status: :ok
    else
      render json: {
        success: false,
        errors: @option_type.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end  

  def destroy 
    if @option_type.destroy
      render json: {
        success: true,
        message: 'Option type has been deleted!'
      }, status: :ok
    else
      render json: {
        success: false,
        errors: 'Failed to delete option type'
      }, status: :unprocessable_entity
    end
  end

  private
  
  def set_option_type
    @option_type = OptionType.find_by!(id: params[:id])
  end

  def option_type_params
    params.require(:option_type).permit(
      :name, 
      :presentation, 
      :filterable, 
      option_values_attributes: [:id, :name, :presentation, :_destroy]
    )
  end
end
